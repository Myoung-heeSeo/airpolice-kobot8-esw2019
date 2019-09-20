#!/usr/bin/env python
# -*- coding: utf-8 -*-
import rospy
from std_msgs.msg import Float32
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from kobot.msg import Msg

# global x1, y1, x2, y2, x3, y3
global sector_num, s1_pm100, s2_pm100, s3_pm100
global sector_manual, cooking_mode

# Firebase Realtime DB 연동
# Firebase Realtime DB json파일 경로
cred = credentials.Certificate('/home/kmucs/Downloads/ebsw.json')

# Firebase Realtime DB링크
firebase_admin.initialize_app(cred,{
    'databaseURL' : 'https://ebsw-283e9.firebaseio.com/'
})

# 어디로 이동해야하는지 확인하는 함수
def sector_chk():
    # 80보다 클때만 실행
    global s1_pm100, s2_pm100, s3_pm100, sector_num
    sector_num = 0
    arr = [s1_pm100, s2_pm100, s3_pm100]
    max_num = max(arr)
    if(max_num>80):
        idx = arr.index(max_num)
        sector_num = idx + 1

# DB에서 값을 불러오는 함수
# 불러오는 값으로는 각 위치별 좌표와 위치별 미세먼지값
# 그리고 요리모드유무와 수동으로 이동좌표를 받아온다.
def db_chk():
    # global x1, y1, x2, y2, x3, y3
    global sector_num, s1_pm100, s2_pm100, s3_pm100
    global sector_manual, cooking_mode

    # 미세먼지 변수
    pm1 = db.reference('u_data/pm/s1')
    pm2 = db.reference('u_data/pm/s2')
    pm3 = db.reference('u_data/pm/s3')

    s1_pm25, s1_pm100 = map(float, pm1.get().split())
    s2_pm25, s2_pm100 = map(float, pm2.get().split())
    s3_pm25, s3_pm100 = map(float, pm3.get().split())

    # 수동이동 여부와 요리의 유무


def pose_msg():
    global x1, y1, x2, y2, x3, y3, sector_num

    # 퍼블리셔 및 메시지 생성
    pub_pose = rospy.Publisher("pose", Msg, queue_size=1000)
    msg = Msg()

    # 노드 초기화
    rospy.init_node('pose_msg', anonymous = True)

    # 1초에 10번씩 수행
    rate = rospy.Rate(10)
    while not rospy.is_shutdown():
        # db값 체크
        db_chk()
        sector_chk()
        msg.x1 = x1
        msg.y1 = y1
        msg.x2 = x2
        msg.y2 = y2
        msg.x3 = x3
        msg.y3 = y3
        msg.sector_number = sector_num
        
        # 값 확인
        # rospy.loginfo(msg.x1)
        # rospy.loginfo(msg.y1)
        # rospy.loginfo(msg.x2)
        # rospy.loginfo(msg.y2)
        # rospy.loginfo(msg.x3)
        # rospy.loginfo(msg.y3)
        rospy.loginfo("sengind")

        # 값 퍼블리셔
        pub_pose.publish(msg)

        rate.sleep()

if __name__ == '__main__':
    try:
        rospy.loginfo("pose_msg")
        pose_msg()
    except rospy.ROSInterruptException:
        pass