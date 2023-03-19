const jwt = require ('jsonwebtoken')

const generateToken = (id) => {
    console.log('token')
    const SECRET='shifhhfjkzwudhiihoh1234'
    return jwt.sign({id}, SECRET,{
        expiresIn:'60s'
    })
}
module.exports =  {
    generateToken
} 
