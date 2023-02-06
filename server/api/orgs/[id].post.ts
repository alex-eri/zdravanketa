import { Model } from "sequelize";
import {Организации} from "~~/server/models/оргинизации"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.id || body.id == "new")
    body.id = undefined;
  body.createdAt = undefined;
  body.updatedAt = undefined;
  const [организация, created] = (await Организации.upsert(body));
  return организация;
})