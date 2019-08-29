import jwt from "jsonwebtoken"

const generateToken = id => {
  return jwt.sign({ userId: id }, 'somesecret', { expiresIn: "7 days" })
}

export default generateToken