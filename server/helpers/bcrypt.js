const bcrypt = require('bcrypt');
const saltRound = 5;

const encryptPwd = data => {
    return bcrypt.hashSync(data, saltRound)
}

const decryptPwd = (data, hashPwd) => {
    return bcrypt.compareSync(data, hashPwd)
}

module.exports = {
    encryptPwd, 
    decryptPwd
}