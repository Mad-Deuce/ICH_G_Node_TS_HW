// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt"

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('users', [{
    email: 'super@super.org',
    verified: true,
    password: await bcrypt.hash("super", 10),
    mustChangePassword: false,
    roleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  await queryInterface.bulkInsert('users', [{
    email: 'admin@admin.org',
    verified: true,
    password: await bcrypt.hash("admin", 10),
    mustChangePassword: false,
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('roles', null, {});
}

