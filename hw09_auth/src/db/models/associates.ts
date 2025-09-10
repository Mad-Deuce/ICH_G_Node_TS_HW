import User from "./User";
import Role from "./Role";
import Session from "./Session";

Role.hasMany(User, {
  foreignKey: "roleId",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "id",
  as: "role",
});

// Session.hasOne(User, {
//   foreignKey: "userId",
//   as: "user",
// });

// User.belongsTo(Session, {
//   foreignKey: "id",
//   as: "session",
// });
