import { emitLog } from "../logger/logger.js";


const errorHandler = async (error, req, res, next) => {
    const { status = 500, message = "Server error" } = error;
    emitLog(`Error: ${status} ${message}`)
    res.status(status).json({ message });
};

export default errorHandler;