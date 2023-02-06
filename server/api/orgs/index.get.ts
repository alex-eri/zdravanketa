import {Организации} from "~~/server/models/оргинизации"

export default defineEventHandler((event) => {
  return Организации.findAll();
})