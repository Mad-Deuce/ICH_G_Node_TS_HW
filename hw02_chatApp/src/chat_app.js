import EventEmitter from "node:events";

export const emitter = new EventEmitter();

emitter.on("message", ({ userName, message }) => {
    const now = new Date().toLocaleString();
    console.log(`${now} --- ${userName}: ${message}`);
})

export function sendMessage({ userName, message, eventEmitter }) {
    eventEmitter.emit("message", { userName, message })
}
