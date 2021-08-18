const fs = require("fs");

var file_name = "EnergyAsset.json"
let abi = JSON.parse(fs.readFileSync(`./build/contracts/${file_name}`).toString()).abi;
fs.writeFileSync(`./build/abi/${file_name}`, JSON.stringify(abi))