import { Model } from "sequelize";
import { Анкеты } from "~~/server/models/анкеты"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const id = event.context.params.id
    
})