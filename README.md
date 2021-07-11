# energytx-eth

## Setting
```
npm i

npm i -g truffle
truffle init
```

## Contract
```
truffle compile
truffle migrate --network rpc
```

## Node
```
node -r dotenv/config app.js
```

## ERC1155
mint되는 각 토큰은 고유하고 수량을 정할 수 있음. 토큰의 정보는 외부 메타데이터를 통해 받아옴.  
The `uri` can include the string `{id}` which clients must replace with the actual token ID, in lowercase hexadecimal (with no 0x prefix) and leading zero padded to **64 hex** characters.  
16^64개의 NFT metadata 생성 가능