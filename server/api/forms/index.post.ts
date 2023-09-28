import { Model } from "sequelize";
import { Анкеты } from "~~/server/models/анкеты"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    body.createdAt = undefined;
    body.updatedAt = undefined;
    const [анкета, created] = (await Анкеты.upsert(body));
    return анкета;
})