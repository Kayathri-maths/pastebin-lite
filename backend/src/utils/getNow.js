export function getNow(req) {
  // Used ONLY for expiry logic
  if (process.env.TEST_MODE === "1") {
    const headerTime = req.headers["x-test-now-ms"];
    if (headerTime) {
      return Number(headerTime);
    }
  }
  return Date.now();
}
