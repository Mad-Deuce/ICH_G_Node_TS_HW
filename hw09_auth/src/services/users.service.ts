import User from "../db/models/User";
import Role from "../db/models/Role";
import Session from "../db/models/Session";

export const getAllUsers = async () => {
  return await User.findAll({
    include: [
      { model: Role, as: "role" },
      { model: Session, as: "session" },
    ],
  });
};
