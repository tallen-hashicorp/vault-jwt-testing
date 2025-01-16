# vault-jwt-testing

## Create keys
```
ssh-keygen -t rsa-sha2-256 -b 2048 -f jwt_key -m pem
openssl rsa -in jwt_key -pubout -outform PEM -out jwt_key.pub
```

## Run Node Script
This will configure vault and run the following steps
* TODO

```bash
export VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_TOKEN=

```

# Manual Vault Config

## Configure Vault
```bash
vault auth enable jwt
vault write auth/jwt/config jwt_validation_pubkeys=@jwt_key.pub
vault write auth/jwt/role/demo-role role_type="jwt" user_claim="sub" bound_subject="vault"
```

## Login to vault
```bash
vault write auth/jwt/login role=demo-role jwt=
```