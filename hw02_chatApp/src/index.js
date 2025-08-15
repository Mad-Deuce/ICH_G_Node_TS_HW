import { emitter, sendMessage } from "./chat_app.js";

sendMessage({ userName: "someUserName", message: "someMessage", eventEmitter: emitter })
sendMessage({ userName: "someUserName", message: "someMessage2", eventEmitter: emitter })
sendMessage({ userName: "someUserName2", message: "someMessage1", eventEmitter: emitter })