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
vault write auth/jwt/login role=demo-role jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2wqcxYXVsdCIsImlhdCI6MTczNzAyNzU1M30.y4H9aNirtIGg6KyUzijl098dTUZwRKitEJ0b6weueOVTqWRwPfiucweIM2-bUbFC9Yt9y_uaxUodXiFvxts4MAxG-KZfxpJSNreKIA6sQqwUHFZE-mAhQOndCKr5GDAygqK6XYFJFgMUOBqenLvWWvZB4Qz5DxJM5jrsQhN_FMjcXqXv8jptNBY1l_CLt98OvQ2DS5HxuQ8cYiQgN88Wsgg3nX2XeTQhZKlCDwXK2xu1PNooVx-NzGt3TGGA_JlYL8Uu746HOzU2vrEK6AKcOOoFg_sSHxmsrNoVVZTgVaxsUCAs2c0fodJR_Wc-WM79hqr5RtnK1M0KQAR5nhepRA
```