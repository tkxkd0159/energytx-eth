#!/bin/bash

ipfs daemon &
cd ./server
npm start &
cd ../client
npm start