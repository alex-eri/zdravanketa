export const moduleid = 'Социокультурное-управление'

// const json = (async () => {
//     return (await import(`./${moduleid}.json`)).default
// })()

// import { Buffer } from 'buffer';

// if (process.client) {
//     window.Buffer = Buffer
// }



import { Анкеты, Ответы } from "~~/server/models/анкеты"

import { sequelize } from '~~/server/db';

import * as jsonschema from "~~/data/Социокультурное-управление.json"

async function genericabspersent(period, Вопрос) {

    let data = []

    console.log(typeof Вопрос.id)

    const count = await Ответы.count({ where: { Вопрос: sequelize.fn('json', Вопрос.id), '$Анкета.Период$': sequelize.fn('date', new Date(period)) }, include: [{ model: Анкеты }] })

    for (const [k, v] of Object.entries(Вопрос.Варианты)) {

        const countk = await Ответы.count({ where: { Вопрос: sequelize.fn('json', Вопрос.id), Значение: sequelize.fn('json',k), '$Анкета.Период$': sequelize.fn('date', new Date(period)) }, include: [{ model: Анкеты }] })
        let row = [k, v, countk, 100 * countk / count]
        data.push(row)
    }

    data.push(['', "Всего", count, 100])

    return data
}

async function out1(period) {

    const form = jsonschema.default

    //TODO thead,subtitle to json

    const thead = `<tr>
            <th class="text-center">№ п/п</th>
            <th class="text-center">Наличие в организации структуры, отвечающей за вопросы мониторинга, контроля, коррекции, развития организационной культуры, поддержания традиций </th>
            <th class="text-center">Абс.</th>
            <th class="text-center">%</th>
            </tr>
            <tr><th>1</th><th>2</th><th>3</th><th>4</th></tr>`

    const subtitle = `Выходная форма №1 <br/> Оценка подготовленности здравоохранения по критерию: Наличие в организации структуры, отвечающей за вопросы мониторинга, контроля, коррекции, развития организационной культуры, поддержания традиций`

    const ВопросId = 2

    const Вопрос = form.Вопросы.filter((v) => (v.id == ВопросId))[0]

    const data = await genericabspersent(period, Вопрос)

    const res = { thead, subtitle, data }

    console.log(res)

    return res
}



export const handlers = {
    out: { '1': out1 },
    json: jsonschema.default
}

