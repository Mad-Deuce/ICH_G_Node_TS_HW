import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
} from "sequelize-typescript";

@Table({ timestamps: true, paranoid: true })
class Book extends Model {
  @Column(DataType.TEXT)
  @AllowNull(false)
  title: string;

  @Column(DataType.TEXT)
  @AllowNull(false)
  author: Date;

  @Column(DataType.INTEGER)
  @AllowNull(false)
  year: Date;
}
