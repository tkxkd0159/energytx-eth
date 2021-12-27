#!/bin/bash

options=$(getopt -o '' --long ipfs -- "$@")

cwd=$(pwd)
eval set -- "$options"
while true; do
    case "$1" in
        --ipfs)
        echo " * Start to install IPFS"
        wget https://dist.ipfs.io/go-ipfs/v0.9.0/go-ipfs_v0.9.0_linux-amd64.tar.gz
        tar -xvzf go-ipfs_v0.9.0_linux-amd64.tar.gz
        cd go-ipfs
        sudo bash install.sh
        cd $cwd
        ipfs init
        echo " * Finish IPFS installation"
            shift ;;
        --)
            shift
            break ;;
    esac
done

echo " * Start to install background packages "
cd ./bg_worker && npm i
echo " * Finish installation 1/2 "
echo " * Start to install frontend packages "
cd ../frontend && npm i
npm run build
echo " * Finish installation 2/2 "
