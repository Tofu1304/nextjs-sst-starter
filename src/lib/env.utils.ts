export const getRuntimeEnv = () => {
  return process.env.NODE_ENV;
};

export const isRuntimeEnv = (env: typeof process.env.NODE_ENV) => {
  return env === process.env.NODE_ENV;
};

export const getDeploymentEnv = () => {
  return process.env.DEPLOYMENT_ENV ?? "dev";
};

export const isDeploymentEnv = (env: typeof process.env.DEPLOYMENT_ENV) => {
  return env === process.env.DEPLOYMENT_ENV;
};
