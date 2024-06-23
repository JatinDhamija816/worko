import bcryptjs from "bcryptjs"

async function hashPassword(password) {
    const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

    if (!passwordRegx.test(password)) {
        return false
    }
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    return hashedPassword
}

export default hashPassword