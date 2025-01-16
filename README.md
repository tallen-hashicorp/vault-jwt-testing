

**Vault JWT Testing Guide**

### Table of Contents

1. [Create Keys](#create-keys)
2. [Run Node Script](#run-node-script)
3. [Manual Vault Config](#manual-vault-config)
	* [Configure Vault](#configure-vault)
	* [Login to Vault](#login-to-vault)

### Create Keys

Generate a private key and public key for JWT signing:
```bash
ssh-keygen -t rsa-sha2-256 -b 2048 -f jwt_key -m pem
openssl rsa -in jwt_key -pubout -outform PEM -out jwt_key.pub
```
This will create two files: `jwt_key` (private key) and `jwt_key.pub` (public key).

### Run Node Script

Configure Vault and run the Node script:
```bash
export VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_TOKEN=

cd jwt-generator
npm install
node app.js
```
This will perform the following steps:

* Create JWT Auth Method
* Configure JWT Auth Method using the public key for `jwt_validation_pubkeys`
* Create JWT Role with `user_claim:sub` & `bound_subject: "vault"`
* Create A JWT with `sub: vault` and login to vault with it, providing the vault token for this

### Manual Vault Config

#### Configure Vault

Enable JWT auth and configure the JWT validation public key:
```bash
vault auth enable jwt
vault write auth/jwt/config jwt_validation_pubkeys=@jwt_key.pub
vault write auth/jwt/role/demo-role role_type="jwt" user_claim="sub" bound_subject="vault"
```
This will enable JWT auth, configure the public key for validation, and create a demo role.

#### Login to Vault

Login to Vault using the demo role and a JWT token:
```bash
vault write auth/jwt/login role=demo-role jwt=
```
Replace `<JWT_TOKEN>` with a valid JWT token.

Note: This guide assumes you have Vault installed and running on `http://127.0.0.1:8200`. Make sure to update the `VAULT_ADDR` environment variable accordingly.