import { ConflictException } from "../../common/exeptions/error.exeptions.js"
import { create, findOne } from "../../common/respository/index.js"
import { UserModel } from "../../DB/model/user.model.js"

export const signup = async ({ email, password, username }) => {
    const duplicatedAccount = await findOne({
        model: UserModel,

        filter: { email },
        options: { select: "email" }
    })
    if (duplicatedAccount) throw ConflictException({message : "Email Exist"})
    const account = await create({
        model: UserModel,
        data: { email, password, username }

    })

    return account
}
export const login = async (email, password) => {

    const account = await findOne({
        model: UserModel,

        filter: { email, password },
        options: { select: "-password" }
    })
    if (!account) throw new Error("EMAIL EXIST", { cause: { status: 409 } })
    return account
}