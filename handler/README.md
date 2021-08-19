# ROS for IMU(AMI)

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