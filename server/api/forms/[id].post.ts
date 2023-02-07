import { Model } from "sequelize";
import { Ответы } from "~~/server/models/анкеты"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const АнкетаId = event.context.params.id

    for (var element of body) {
        if (element.Значение) {
            element.АнкетаId = АнкетаId
            const [Ответ, created] = (await Ответы.upsert(element));
        }
    };
    return true;
})