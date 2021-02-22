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

    function decrypt(text){
        var decipher = crypto.createDecipheriv('aes-256-cbc',
        key, 'elcarvector12341')
        var dec = decipher.update(text, 'hex', 'utf8')
        dec += decipher.final('utf8')
        return dec
      }

    var hw = encrypt(id)
    // outputs hello world
    console.log(decrypt(hw));
}

module.exports = resourceIdEncoder