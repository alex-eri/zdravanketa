import { Sequelize, Model, DataTypes } from "sequelize";

export const sequelize = new Sequelize("sqlite:database.sqlite");

export default async(_nitroApp: any) => {

  console.log('db plugin');
  const config = useRuntimeConfig();
  await sequelize.sync();
}