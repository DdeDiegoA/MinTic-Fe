import { Role } from "./role";

export interface MeResponse {
    email: string,
    id: string,
    role: Role,
    seudonimo: string
}
