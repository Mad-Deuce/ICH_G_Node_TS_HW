import fs from "node:fs/promises";
import path from "node:path";
import EventEmitter from "node:events";
import { DateTime } from "luxon";



const emitter = new EventEmitter();

const logFilePath = path.resolve("src", "logs", "serverLogs.txt");

emitter.on("error-log", async (message) => {
    const logMessage = `${DateTime.now().toFormat("yyyy-MM-dd")} - ${message} \n`;
    await fs.appendFile(logFilePath, logMessage);
});

export function emitLog(message) {
    emitter.emit("error-log", message)
};