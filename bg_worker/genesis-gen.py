# SIGNER_LIMIT: Number of consecutive blocks out of which a signer may only sign one
# Must be floor(SIGNER_COUNT / 2) + 1 to enforce majority consensus on a chain.
import json

user1 = "909e35Ad26acAda51609C23774D6267F8aFf6d36"
user2 = "5Ac345fFa4B4eF9634DB94a3Ac493c24E57b5DF5"
user3 = "4d929B0E7e7246Bb540Fb3175b1202Fb6D0B53C2"

genform = {}

# config
genform["config"] = {}
genform["config"]['chainId'] = 3663
genform["config"]['homesteadBlock'] = 0
genform["config"]['eip150Block'] = 0
genform["config"]['eip155Block'] = 0
genform["config"]['eip158Block'] = 0
genform["config"]['byzantiumBlock'] = 0
genform["config"]['constantinopleBlock'] = 0
genform["config"]['petersburgBlock'] = 0

genform["difficulty"] = "1"
genform["gasLimit"] = "8000000"

genform["alloc"] = {}
genform["alloc"][user1] = { "balance": str(1000 * 10 ** 18) }
genform["alloc"][user2] = { "balance": str(33 * 10 ** 18) }
genform["alloc"][user3] = { "balance": str(8 * 10 ** 18) }

# clique for PoA
genform["config"]["clique"] = {}
genform["config"]["clique"]["period"] = 5      # Minimum difference between two consecutive block’s timestamps
genform["config"]["clique"]["epoch"] = 30000   # Number of blocks after which to checkpoint and reset the pending votes

# extra data for PoA
print("If done, type x")
extradata = '0x' + '0' * 64 + user1 + user2 + user3

while True:
    newacc = input("Enter your Auth_account >>> If done, type X \n")
    if newacc == "X":
        extradata += '0' * 130
        genform["extradata"] = extradata
        print(extradata)
        break
    extradata += newacc


with open("genesis.json", 'w') as f:
    json.dump(genform, f)

print("saved as 'genesis.json'")
