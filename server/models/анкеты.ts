import { Sequelize, Model, DataTypes } from "sequelize";
import {sequelize} from '~~/server/db';

import {Организации} from './оргинизации';

export const Анкеты = sequelize.define("Анкета", {
    id: {
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    Период: DataTypes.DATEONLY,   
  }, {
    tableName: 'Анкеты',
    name :{plural:"Анкеты", singular:"Анкета"
  }
});

Анкеты.belongsTo(Организации)

Анкеты.sync();
  
export const Ответы = sequelize.define("Ответы", {
  id: {
    type:DataTypes.UUID,
    primaryKey:true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
  },
  Вопрос: DataTypes.JSON,
  Значение: DataTypes.JSON,   
}, {
  tableName: 'Ответы',
  name :{plural:"Ответы", singular:"Ответ"
}
});

Ответы.belongsTo(Анкеты);

Ответы.sync();