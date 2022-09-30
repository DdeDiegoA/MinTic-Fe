import { Role } from "../auth/role"

export interface User {
    email: string,
    id: string,
    role: Role,
    seudonimo: string
}
