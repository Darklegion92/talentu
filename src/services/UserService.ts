import { ResponseUsers, User } from "@/interfaces/User";
import { getAge } from "@/utils/dates";
import generateUserId from "@/utils/generateUserId";
import { getUsersLocal, setUsersLocal } from "@/utils/localstorage";
import { AxiosResponse } from "axios";
import axios from "./axios";

export const getUsers = async () => {
    const response: AxiosResponse<ResponseUsers> = await axios.get('/users?page=1')
    await setUsersLocal(response.data.data)
}

export const createUser = async (user: User) => {
    const users = await getUsersLocal()

    const userFind = users.find(({ email }: User) => email === user.email)

    if (userFind) {
        throw new Error(`Correo ${user.email} ya se encuentra registrado`)
    }

    const id = await generateUserId()


    users.push({
        ...user,
        age: getAge(user.birthday),
        id
    })

    await setUsersLocal(users)

    return users

}
