import { ConflictException, NotFoundException } from "../../common/exeptions/index.js"
import { create, findOne } from "../../common/respository/index.js"
import { compare, decryption, encryption, hash } from '../../common/security/index.js'
import { UserModel } from "../../DB/model/user.model.js"
export const signup = async ({ email, password, username, phone }) => {
    const duplicatedAccount = await findOne({
        model: UserModel,

        filter: { email },
        options: { select: "email" }
    })
    if (duplicatedAccount) throw ConflictException({ message: "Email Exist" })
    // const saltRoundSignature = await hash(SALT , 'a')

    const account = await create({
        model: UserModel,
        data: {
            username,
            email,
            password: await hash({
                plaintext: password
            }),
            phone: await encryption(phone)
        }

    })

    return account
}
export const login = async (email, password) => {

    const account = await findOne({
        model: UserModel,

        filter: { email, },
    })
    if (!account) {
        throw NotFoundException({ message: "Invalid Email or Password" })
    }
    const match = await compare(password, account.password)
    console.log({ FE_Password: password, hash: account.password, match });

    if (!match) throw NotFoundException({ message: "NOT EXIST" })
    account.phone = await decryption(account.phone)
    return account
}