import HttpError from "../utils/HttpError.js";

 const authCheck = (req, _, next) => {
    if (!req.headers.authorization) {
        throw HttpError(401);
    }
    next();
};

export default authCheck;