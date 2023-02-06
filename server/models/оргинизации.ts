import { Sequelize, Model, DataTypes } from "sequelize";
import {sequelize} from '~~/server/db';

export const Организации = sequelize.define("Организация", {
    id: {
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    КодРегиона: {type:DataTypes.STRING(3),allowNull:false},
    ИНН: {type:DataTypes.STRING(12),allowNull:false},
    КПП: DataTypes.STRING(9),
    ОГРН: DataTypes.STRING(15),
    Наименование: DataTypes.STRING(40),
    ПолноеНаименование: DataTypes.TEXT,
  
  }, {
    tableName: 'Организации',
    name :{plural:"Организации", singular:"Организация"
  }
});

Организации.sync();
  
    