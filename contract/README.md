# Settings

```
npm uninstall -g truffle
npm install -g truffle

npm i

truffle init

```

## Deploy contract
```bash
truffle compile
truffle migrate [--reset] --network goerli  # compile + deploy
```

# ERC1155

mint되는 각 토큰은 고유하고 수량을 정할 수 있음. 토큰의 정보는 외부 메타데이터를 통해 받아옴.  
The `uri` can include the string `{id}` which clients must replace with the actual token ID, in lowercase hexadecimal (with no 0x prefix) and leading zero padded to **64 hex** characters.  
16^64개의 NFT metadata 생성 가능