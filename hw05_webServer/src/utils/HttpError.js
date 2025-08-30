const messageList = {
    401: "Unauthorized"
}

const HttpError = (status, message = messageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

export default HttpError;