const fs = require('fs');
const FILE_NAME = './logs/log.txt';
const logger = fs.createWriteStream(FILE_NAME, {
  flags: 'a' // 'a' means appending (old data will be preserved)
});

const logRepo = {
  writeToFile: (data) => {
    let log = `Date/Time: ${new Date().toLocaleDateString()} \r\n`;
    log += `Exception info: ${JSON.stringify(data)} \r\n`;
    log += `${"*".repeat(80)} \r\n`;
    logger.write(log);
  }
};

module.exports = logRepo;