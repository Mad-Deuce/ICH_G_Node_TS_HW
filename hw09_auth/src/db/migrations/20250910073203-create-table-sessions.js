export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('Sessions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    accessToken: {
      type: Sequelize.STRING,
    },
    accessTokenExpired: {
      type: Sequelize.DATE,
    },
    refreshToken: {
      type: Sequelize.STRING,
    },
    refreshTokenExpired: {
      type: Sequelize.DATE,
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
  await queryInterface.dropTable('Sessions');
}

