const jwt = require('jsonwebtoken');
const fs = require('fs');

var privateKey = fs.readFileSync('../jwt_key');
var publicKey = fs.readFileSync('../jwt_key.pub');

async function generateJWT(){
    var token = jwt.sign({ 
        foo: 'bar' 
    }, privateKey, { algorithm: 'RS256' });
    console.log(token)
    return token
}

async function verifyJwt(token){
    jwt.verify(token, privateKey, { algorithms: ['RS256'] }, function(err, decoded) {
        if (err){
            console.log("ERROR: " + err)
        }else{
            console.log("Valid!")
            console.log(decoded)
        }
      });
}

async function main(){
    var token = await generateJWT()
    verifyJwt(token)
}

main();

