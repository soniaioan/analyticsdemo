const joi = require('joi')
const clfSchema = {
    remote_addr: joi.string(),
    remote_user: joi.string().allow('', null),
    time_local: joi.date(),
    http_referer: joi.string().allow('', null),
    path: joi.string(),
    request: joi.string(),
    protocol: joi.string(),
    method: joi.string(),
    http_method: joi.string(),
    http_user_agent: joi.string().allow('', null),
    status: joi.number(),
    body_bytes_sent: joi.number().allow('', null),
}

module.exports = {
    isValid : function(obj){
        let result = joi.validate(obj, clfSchema)
        if (result.error != null) {
            return false
        }
        return true
    }
}