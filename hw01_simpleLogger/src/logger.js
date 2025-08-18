import fs from "node:fs/promises";
import path from "node:path";

const logPath = path.resolve("src", "logs", "logs.txt");

async function logMessage(message = "test log") {
    await fs.appendFile(logPath, `\n ${new Date().toLocaleString()} --- ${message}`);
}

export default logMessage;