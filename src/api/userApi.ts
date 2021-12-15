import { User } from "../types";

export async function getUsers() {
    const resp = await fetch("http://localhost:3001/users");
    if (!resp.ok) throw resp;
    const users = (await resp.json()) as User[];
    return users;
}
