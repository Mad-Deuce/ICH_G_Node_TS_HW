import fs from "node:fs";
import path from "node:path";

const logPath = path.resolve("src", "logs", "logs.txt");

function logMessage(message = "test log") {
    fs.appendFile(logPath, `\n ${new Date().toUTCString()} --- ${message}`, (error) => {
        console.log(error);
    });
}

export default logMessage;