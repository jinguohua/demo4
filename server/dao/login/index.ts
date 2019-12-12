const db = require('../../../config/middleware/database');

const loginCheck = (param, next) => {
    let sql = 'select username, userid from users where username= ? and password = ?',
        value = [param.username, param.password];
    return db.query(sql, value);
}
module.exports = {
    loginCheck
}