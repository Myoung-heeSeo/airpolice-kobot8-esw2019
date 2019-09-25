#!/usr/bin/env python
# -*- coding: utf-8 -*-
import rospy
from std_msgs.msg import Float32
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from kobot.msg import Msg

global sector_num
global auto_area, cooking_mode, manual_area, manual_btn

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
    global sector_num
    global auto_area, cooking_mode, manual_area, manual_btn
    if cooking_mode == 1:
        sector_num = 1
    elif manual_btn == 1:
        sector_num = manual_area
    else:
        sector_num = auto_area

# DB에서 값을 불러오는 함수
# 그리고 요리모드유무와 수동으로 이동좌표를 받아온다.
def db_chk():
    global auto_area, cooking_mode, manual_area, manual_btn

    # 미세먼지 변수
    auto_area_db = db.reference('mode/auto_area')
    cooking_mode_db = db.reference('mode/cooking_mode')
    manual_area_db = db.reference('mode/manual_area')
    manual_btn_db = db.reference('mode/manual_btn')

    auto_area = auto_area_db.get()
    cooking_mode = cooking_mode_db.get()
    manual_area = manual_area_db.get()
    manual_btn = manual_btn_db.get()
    
def pose_msg():
    global sector_num

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
        msg.sector_number = sector_num
        
        # 값 확인
        rospy.loginfo(sector_num)
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