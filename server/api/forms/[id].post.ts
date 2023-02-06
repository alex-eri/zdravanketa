import { Model } from "sequelize";
import { Анкеты } from "~~/server/models/анкеты"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    if (!body.id || body.id == "new") {
        body.id = undefined;
        const rewrite = await Анкеты.findOne({ where: { ОрганизацияId: body.ОрганизацияId, Период: body.Период } })
        console.log(rewrite)
        if (rewrite) {
            body.id = rewrite.id;
        }
    }
    body.createdAt = undefined;
    body.updatedAt = undefined;
    const [анкета, created] = (await Анкеты.upsert(body));
    return анкета;
})