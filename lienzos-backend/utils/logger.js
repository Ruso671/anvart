function logInfo(msg) {
  console.log(`ℹ️ [INFO] ${msg}`);
}

function logError(msg) {
  console.error(`❌ [ERROR] ${msg}`);
}

module.exports = { logInfo, logError };
