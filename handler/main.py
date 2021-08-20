import rospy
from sensor_msgs.msg import Imu
import time
import logging

FORMAT = '%(asctime)-15s %(levelname)s: %(message)s'

logging.basicConfig(format=FORMAT, datefmt='%z %y-%m-%d %H:%M:%s', filename='current_date.log', filemode='a', level=logging.DEBUG)

# if not, ros node should be inited
rospy.init_node('IMUReader', anonymous=True)

def callback(data):
    logging.info(str((data.angular_velocity.x, data.angular_velocity.y, data.angular_velocity.z)))

# subscriber
rospy.Subscriber("/mavros/imu/data_raw", Imu, callback)