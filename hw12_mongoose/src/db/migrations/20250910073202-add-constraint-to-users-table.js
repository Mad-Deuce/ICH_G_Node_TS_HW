export const up = async (queryInterface, Sequelize) => {
  await queryInterface.addConstraint('users', {
    fields: ['roleId'], // The column in 'YourTableName' that will be the foreign key
    type: 'foreign key',
    name: 'FK_Users_Roles', // A descriptive name for your constraint
    references: {
      table: 'roles', // The table being referenced
      field: 'id', // The primary key column in 'ReferenceTableName'
    },
    onDelete: 'SET NULL', // Optional: Define behavior on deletion of the referenced row
    onUpdate: 'CASCADE', // Optional: Define behavior on update of the referenced row
  });
}

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('users');
}

