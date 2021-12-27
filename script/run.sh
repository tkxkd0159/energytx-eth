#!/bin/bash

ipfs daemon &
cd ./bg_worker
npm start &
cd ../frontend
npm start
