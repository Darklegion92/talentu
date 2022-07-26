import { User } from "@/interfaces/User";

const usersName = 'users'

export const setUsersLocal = async (users: User[]) => {
    try {
        await localStorage.setItem(usersName, JSON.stringify(users))
        return true
    } catch (e) {
        return e
    }

}

export const getUsersLocal = async () => {
    try {
        const usersJSON = await localStorage.getItem(usersName)

        return JSON.parse(usersJSON || '')
    } catch (e) {
        return e
    }

}