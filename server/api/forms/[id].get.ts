import { Ответы } from "~~/server/models/анкеты"

export default defineEventHandler(async (event) => {
    
    const АнкетаId = event.context.params.id

    return await Ответы.findAll({where:{АнкетаId}})
    
})