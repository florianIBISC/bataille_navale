//----Import
const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = '00000';
module.exports = {
    generateTokenForUser: function (userData) {
    return jwt.sign({
      pseudo: userData.pseudo,
      prenom: userData.prenom,
      id: userData.id,
      email:userData.email,
    },
      JWT_SIGN_SECRET,
      {
        expiresIn: '1h'
      }
    )
  },
    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
      },
      getUserId: function (authorization) {
        let userId = -1;
        let token = module.exports.parseAuthorization(authorization);    
        console.log("Classe jwt.utils - Valeur du token : "+token);
        if (token != null) {
          try {
            let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
    
            if (jwtToken != null)
            console.log(jwtToken)
              userId = {
                pseudo: jwtToken.pseudo,
                prenom: jwtToken.prenom,
                email: jwtToken.email
              }
          } catch (err) {console.log("Classe jwt.utils - erreur le token est invalide ") }
        }
        return userId;
      }
    }