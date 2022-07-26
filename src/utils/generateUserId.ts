import { User } from "@/interfaces/User"
import { getUsersLocal } from "./localstorage"

export default async () => {
    let id = 1
    const users: User[] = await getUsersLocal()
    do {

        id = id + 1

    } while (users.find(user => user.id === id))
    return id
}