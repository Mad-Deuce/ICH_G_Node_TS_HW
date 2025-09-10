const messageList: { [key: number]: string } = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

class HttpError extends Error {
  constructor(
    status: number,
    message: string | undefined = messageList[status]
  ) {
    super(message);
  }
}

export default HttpError;
