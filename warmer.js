const URL_TO_VISIT = "https://yourdomain.com";
const CONCURRENT_VISITS = 100;

async function accessLink(visitNumber) {
  const startTime = Date.now();
  try {
    const response = await fetch(URL_TO_VISIT, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
    });
    const loadTime = Date.now() - startTime;
    console.log(`Visit ${visitNumber}: Loaded in ${loadTime} ms, status: ${response.status}`);
  } catch (error) {
    const loadTime = Date.now() - startTime;
    console.error(`Visit ${visitNumber}: Error - ${error.message}, loaded in ${loadTime} ms`);
  }
}

async function runConcurrentVisits() {
  console.log(`\nStarting ${CONCURRENT_VISITS} concurrent visits at ${new Date().toLocaleTimeString()}\n`);
  const visits = [];
  for (let i = 1; i <= CONCURRENT_VISITS; i++) {
    visits.push(accessLink(i));
  }
  await Promise.all(visits);
  console.log(`\nAll concurrent visits completed at ${new Date().toLocaleTimeString()}\n`);
}

// Run immediately
runConcurrentVisits();

// Repeat every minute
setInterval(runConcurrentVisits, 60 * 1000);
