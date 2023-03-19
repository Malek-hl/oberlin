const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    console.log('token')
    const SECRET = 'shifhhfjkzwudhiihoh1234'
    return jwt.sign({
        data: user._id
    }, SECRET, { expiresIn: 60 * 60 })
}
const verifyToken = (token) => {
   return  jwt.verify(token, 'secret')
     }
module.exports = {
    generateToken,
    verifyToken
} 
