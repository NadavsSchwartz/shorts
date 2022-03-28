import axios from 'axios'

export const ValidateRecaptchaToken = async (token) => {
    const secret = process.env.GOOGLE_SECRET_KEY
    const { data } = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
    )
    return data.success
}
