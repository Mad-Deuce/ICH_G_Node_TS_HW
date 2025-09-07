'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import sequelize from './connection';
export interface Book4Attributes {
  title: string;
}
class Book4 extends Model < Book4Attributes > implements Book4Attributes {
  title!: string;
}
Book4.init({
  title: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Book4',
});
// Associations
// Book4.belongsTo(TargetModel, {
//   as: 'custom_name',
//   foreignKey: {
//     name: 'foreign_key_column_name',
//     allowNull: false,
//   },
//   onDelete: "RESTRICT",
//   foreignKeyConstraint: true,
// });
export default Book4;