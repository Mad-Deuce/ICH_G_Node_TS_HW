export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    verified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mustChangePassword: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    roleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('Users');
}

