const jwt = require('jsonwebtoken');
const spatial_code = "code.id-reactExercise"

const tokenGenerator = (data) => {
    const {username, email} = data
    return jwt.sign({username, email}, spatial_code)
}

const verifyToken = (data) => {
    return jwt.verify(data, spatial_code)
}
module.exports = {
    tokenGenerator,
    verifyToken
}