import { Анкеты, Ответы } from "~~/server/models/анкеты"
import { useHandlers } from "~~/composables/handlers.server"

export default defineEventHandler(async (event) => {
    
    const outId = event.context.params.id
    const ФормаId = decodeURI(event.context.params.form)
    const q =getQuery(event)

    const h = useHandlers(ФормаId)
    
    console.log(h.out[outId])
    console.log(outId, typeof outId)

    const res = (await h.out[outId](q.period))
    


    return res

})