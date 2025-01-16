const jwt = require('jsonwebtoken');
const fs = require('fs');
const { type } = require('os');

var vaultOptions = {
    apiVersion: 'v1',
    endpoint: process.env.VAULT_ADDR,
    token: process.env.VAULT_TOKEN
};

var vault = require("node-vault")(vaultOptions);

var privateKey = fs.readFileSync('../jwt_key');
var publicKey = fs.readFileSync('../jwt_key.pub');

/*
vault auth enable jwt
vault write auth/jwt/config jwt_validation_pubkeys=@jwt_key.pub
vault write auth/jwt/role/demo-role role_type="jwt" user_claim="sub" bound_subject="vault"
*/
async function configVault(){
    console.log("Enable JWT")
    try {
        await vault.enableAuth({
            mount_point: "jwt",
            type: "jwt"
        });
    }catch(e){
        console.log(" path is already in use at jwt")
    }

    console.log("Config JWT")
    await vault.write('auth/jwt/config', {
        jwt_validation_pubkeys: publicKey.toString()
    })
    
    console.log("Config demo-role")
    await vault.write('auth/jwt/role/demo-role', {
        role_type: "jwt",
        user_claim: "sub",
        bound_subject: "vault"
    })
}

/*
vault write auth/jwt/login role=demo-role jwt=
*/
async function loginVaultJWT(token){
    var login = await vault.write('auth/jwt/login', {
        role: 'demo-role',
        jwt: token
    })
    console.log(login.auth.client_token)
}


async function generateJWT(sub) {
    var token = jwt.sign({
        sub: sub,
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
    }, privateKey, { algorithm: 'RS256' });
    console.log(token)
    return token
}

async function verifyJwt(token) {
    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, function (err, decoded) {
        if (err) {
            console.log("ERROR: " + err)
        } else {
            console.log("Valid!")
            console.log(decoded)
        }
    });
}

async function main() {
    var token = await generateJWT("vault")
    verifyJwt(token)

    await configVault()
    await loginVaultJWT(token)
}

main();

