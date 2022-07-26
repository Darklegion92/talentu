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
    const id = await generateUserId()

    const users = await getUsersLocal()

    users.push({
        ...user,
        age: getAge(user.birthday),
        id
    })

    await setUsersLocal(users)

    return users

}
