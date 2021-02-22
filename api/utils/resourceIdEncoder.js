function resourceIdEncoder(id) {
    var crypto = require('crypto'),
        algorithm = 'aes-256-ctr',
        secret = 'd6F3Efeq';
        let key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);
        val = id.toString()
        return encrypt(id.toString());

    function encrypt(text) {
        var cipher = crypto.createCipheriv('aes-256-cbc',
            key, 'elcarvector12341')
                 
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex')
        return crypted
    }
}

module.exports = resourceIdEncoder