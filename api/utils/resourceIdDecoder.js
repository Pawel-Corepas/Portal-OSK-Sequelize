function resourceIdDecoder(id) {
    var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    secret = 'd6F3Efeq';
    let key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);
    return decrypt(id);

function decrypt(text){
    var decipher = crypto.createDecipheriv('aes-256-cbc',
    key, 'elcarvector12341')
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8')
    return dec
  }

}

module.exports = resourceIdDecoder