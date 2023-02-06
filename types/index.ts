export { };

declare global {

interface Организация {
    Наименование: string | null,
    ПолноеНаименование: string | null,
    id: string ,
    ИНН: string | null,
    КПП: string | null,
    ОГРН: string | null,
    КодРегиона: string | null,
  }

interface Вопрос {
    id: string ,
    Вопрос: string,
    Варианты : Array<Object>,
    НесколькоВариантов: boolean
}

}