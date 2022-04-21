import { AuthUser } from "../auth";

export interface User extends AuthUser {
    roles: string[];
}
