let fs = require("fs");

class Logger {
  constructor(filename) {
    // make dir if doesn't exist
    try {
      fs.mkdirSync("logs");
    } catch (error) { }

    const timestamp = new Date().getTime();
    const tsFilename = `logs/${timestamp}-${filename}`;
    this.stream = fs.createWriteStream(tsFilename, {flags:"a"});
  }

  log(message) {
    this.stream.write(message + "\n");
  }
}

export { Logger };