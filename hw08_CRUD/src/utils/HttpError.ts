const messageList: { [key: number]: string } = {
  400: "Bad Request",
  401: "Unauthorized",
  402: "Not Found",
};

export class HttpError extends Error {
  constructor(
    status: number,
    message: string | undefined = messageList[status]
  ) {
    super(message);
  }
}


