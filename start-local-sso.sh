#!/bin/bash

# Step 1: Get the current username in a cross-platform way
if [[ "$OSTYPE" == "linux-gnu"* || "$OSTYPE" == "darwin"* ]]; then
  CURRENT_USER=$(whoami)
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
  CURRENT_USER=$(powershell.exe '$env:UserName' | tr -d '\r')
else
  echo "Unsupported OS: $OSTYPE"
  read
  exit 1
fi

# Step 2: Automatically detect an SSO-enabled profile
PROFILE="explicitly_write_your_profile_here_if_it_cannot_be_found"
for profile in $(aws configure list-profiles); do
  SSO_START_URL=$(aws configure get sso_start_url --profile "$profile" 2>/dev/null)
  if [[ -n "$SSO_START_URL" ]]; then
    PROFILE="$profile"
    break
  fi
done

# If no SSO-enabled profile is found, exit with an error
if [[ -z "$PROFILE" ]]; then
  echo "No SSO-enabled AWS profile found. Please set up an SSO profile using 'aws configure sso'."
  read
  exit 1
fi

# Step 3: Extract the region associated with the profile
REGION=$(aws configure get region --profile "$PROFILE")
if [[ -z "$REGION" ]]; then
  echo "No region configured for profile '$PROFILE'. Please configure a region using 'aws configure set region <region> --profile $PROFILE'."
  read
  exit 1
fi

# Step 4: Resolve the cache directory path for the current user
CACHE_DIR="C:/Users/$CURRENT_USER/.aws/sso/cache"

# Step 5: Find the most recent valid cache file with a future `expiresAt`
CACHE_FILE=""
for file in "$CACHE_DIR"/*.json; do
  if jq -e '.accessToken and (.expiresAt | fromdateiso8601 > now)' "$file" >/dev/null 2>&1; then
    CACHE_FILE="$file"
    break
  fi
done

if [[ -z "$CACHE_FILE" ]]; then
  echo "AWS SSO session not found or expired. Running 'aws sso login' to authenticate..."
  aws sso login --profile "$PROFILE" --region "$REGION"
  for file in "$CACHE_DIR"/*.json; do
    if jq -e '.accessToken and (.expiresAt | fromdateiso8601 > now)' "$file" >/dev/null 2>&1; then
      CACHE_FILE="$file"
      break
    fi
  done
  if [[ -z "$CACHE_FILE" ]]; then
    echo "Failed to authenticate. Please check your SSO login setup."
    read
    exit 1
  fi
fi

# Step 6: Extract the access token from the valid cache file
ACCESS_TOKEN=$(jq -r '.accessToken' "$CACHE_FILE")
if [ -z "$ACCESS_TOKEN" ]; then
  echo "Access token is invalid or missing. Running 'aws sso login' to refresh..."
  aws sso login --profile "$PROFILE" --region "$REGION"
  CACHE_FILE=$(find "$CACHE_DIR" -type f | sort | tail -n 1)
  ACCESS_TOKEN=$(jq -r '.accessToken' "$CACHE_FILE")
  if [ -z "$ACCESS_TOKEN" ]; then
    echo "Failed to refresh SSO session. Please check your AWS CLI configuration."
    read
    exit 1
  fi
fi

# Step 7: Retrieve the SSO role and account details
ROLE_NAME=$(aws configure get sso_role_name --profile "$PROFILE")
ACCOUNT_ID=$(aws configure get sso_account_id --profile "$PROFILE")

# Step 8: Fetch credentials using the access token
CREDENTIALS=$(
  aws sso get-role-credentials \
    --role-name "$ROLE_NAME" \
    --account-id "$ACCOUNT_ID" \
    --access-token "$ACCESS_TOKEN" \
    --profile "$PROFILE" \
    --region "$REGION" \
    --output json
)

if [ $? -ne 0 ]; then
  echo "Failed to retrieve SSO credentials. Please check your AWS CLI configuration or re-login."
  read
  exit 1
fi

# Step 9: Export the credentials
export AWS_ACCESS_KEY_ID=$(echo "$CREDENTIALS" | jq -r '.roleCredentials.accessKeyId')
export AWS_SECRET_ACCESS_KEY=$(echo "$CREDENTIALS" | jq -r '.roleCredentials.secretAccessKey')
export AWS_SESSION_TOKEN=$(echo "$CREDENTIALS" | jq -r '.roleCredentials.sessionToken')
export AWS_REGION="$REGION"

echo "AWS SSO credentials exported successfully for profile: $PROFILE"

# Step 10: Start the Next.js server
echo "Starting Next.js development server..."
npm run dev
read
