
import { handlers as socculhandlers } from "./Социокультурное-управление" 

const handlers = {
    'Социокультурное-управление': socculhandlers
}

export const useHandlers = (moduleid:string) => {
    return handlers[moduleid]
}

