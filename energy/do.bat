@echo off
cmd /c "truffle compile"
cmd /c "truffle migrate --network rpc"

ECHO Success!