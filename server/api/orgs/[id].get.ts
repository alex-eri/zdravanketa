import {Организации} from "~~/server/models/оргинизации"

export default defineEventHandler(async (event) => {
  const организация = await Организации.findOne({where:{id:event.context.params.id}});
  console.log(организация);
  return организация;
})