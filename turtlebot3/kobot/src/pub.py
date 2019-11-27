#!/usr/bin/env python
# -*- coding: utf-8 -*-

import rospy
from std_msgs.msg import Int8

rospy.init_node('sensor', anonymous=True)
pub = rospy.Publisher('/pose', Int8, queue_size = 5)


def stage_msg():
    rate = rospy.Rate(1)
    stage = 0
    while not rospy.is_shutdown():
        rospy.loginfo(stage)
	if stage < 3:
        	stage += 1
        pub.publish(stage)
        rate.sleep()

if __name__ == '__main__':
    try:
        rospy.loginfo("sending stage")
        stage_msg()
    except rospy.ROSInterruptException:
        pass
