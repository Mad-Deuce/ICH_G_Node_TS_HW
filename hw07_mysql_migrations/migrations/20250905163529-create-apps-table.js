export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('Apps', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    size: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('Apps');
};
