![Arweave](https://img.shields.io/badge/Arweave-v2.4.2.0-green)
![Solidity](https://img.shields.io/badge/Solidity-v0.8.6-blue)
![node](https://img.shields.io/badge/Nodejs-v14.17.4-orange)
![ros](https://img.shields.io/badge/ROS-Noetic-orange)

# Setting

```
npm i

npm i -g truffle
truffle init
```

## ROS for IMU(AMI)

```bash
# Set venv
python3 -m venv ./ethros
source ethros/bin/activate  # <-> deactivate
pip freeze > requirements.txt

# Install geographiclib
sudo apt-get install ros-noetic-mavros ros-noetic-mavros-extras
sudo /opt/ros/noetic/lib/mavros/install_geographiclib

# Execute IMU
sudo chmod 777 /dev/ttyACM0
roslaunch mavros px4.launch fcu_url:=/dev/ttyACM0:921600



# Topic
rostopic list
rostopic echo <topic_name>
rostopic info <topic_name>
rostopic + (tab, tab)        # etc
rosrun rqt_graph rqt_graph   # global view of topics
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
