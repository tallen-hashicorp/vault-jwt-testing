# vault-jwt-testing

## Create keys
```
ssh-keygen -t rsa-sha2-256 -b 2048 -f jwt_key -m pem
ssh-keygen -f jwt_key -y -m pem > jwt_key.pem.pub
```

## Configure Vault
```bash
vault auth enable jwt
vault write auth/jwt/config jwt_validation_pubkeys=@jwtRS256.key.pub
```