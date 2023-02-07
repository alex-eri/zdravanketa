
import { handlers as socculhandlers } from "./Социокультурное-управление.server" 

const handlers = {
    'Социокультурное-управление': socculhandlers
}

export const useHandlers = (moduleid:string) => {
    return handlers[moduleid]
}

