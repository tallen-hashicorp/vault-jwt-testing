const jwt = require('jsonwebtoken');
const fs = require('fs');

var privateKey = fs.readFileSync('../jwt_key');
var publicKey = fs.readFileSync('../jwt_key.pub');

var token = jwt.sign({ 
    foo: 'bar' 
}, privateKey, { algorithm: 'RS256' });

console.log(token)

jwt.verify(token, privateKey, { algorithms: ['RS256'] }, function(err, decoded) {
    if (err){
        console.log("ERROR: " + err)
    }else{
        console.log("Valid: ")
        console.log(decoded)
    }
  });
