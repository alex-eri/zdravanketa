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


const Форма = jsonschema.default

async function genericabspersent(period, Вопрос) {

    let data = []

    console.log(typeof Вопрос.id)

    const count = await Ответы.count({ where: { Вопрос: sequelize.fn('json', JSON.stringify(Вопрос.id)), '$Анкета.Период$': sequelize.fn('date', new Date(period)) }, include: [{ model: Анкеты }] })

    for (const [k, v] of Object.entries(Вопрос.Варианты)) {

        const countk = await Ответы.count({ where: { Вопрос: sequelize.fn('json', JSON.stringify(Вопрос.id)), Значение: sequelize.fn('json', JSON.stringify(k)), '$Анкета.Период$': sequelize.fn('date', new Date(period)) }, include: [{ model: Анкеты }] })
        let row = [k, v, countk, 100 * countk / count]
        data.push(row)
    }

    const countall = count - data[0][2]

    data.push(['', "Всего", countall, 100 * countall / count])
    data.push(['', "Число оценочных суждений", count, ""])
    data.push(['', "Среднее", countall / count, ""])

    return data
}

function genhandlers(ВопросId) {
    const out1 = async (period) => {
        const Вопрос = Форма.Вопросы.filter((v) => (v.id == ВопросId))[0]
        const data = await genericabspersent(period, Вопрос)
        const res = { data }
        return res
    }
    return out1
}



export const handlers = {
    out: {
        '1': genhandlers('2'),
        '2': genhandlers('3'),
        '3': genhandlers('4'),
        '4': genhandlers('5'),
        '5': genhandlers('6'),
        '6': genhandlers('7'),
        '7': genhandlers('8'),
        '8': genhandlers('9'),
        '9': genhandlers('10'),
        '10': genhandlers('11'),
        '11': genhandlers('12'),
        '12': genhandlers('13'),
        '13': genhandlers('14'),
        '14': genhandlers('15'),
        '15': genhandlers('16'),

        '16': genhandlers('17'),
        '17': genhandlers('18'),
        '18': genhandlers('19'),
        '19': genhandlers('20'),
        '20': genhandlers('21'),
        '21': genhandlers('22'),
        '22': genhandlers('23'),

        '23': genhandlers('24'),
        '24': genhandlers('25'),
        '25': genhandlers('26'),
    },
    json: jsonschema.default
}

