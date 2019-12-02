import React, {Component } from 'react';
import './all.css';
import './Main.module.css'
import {Container, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../components/Icon/logo.svg';
import placeholder from '../components/Icon/placeholder.svg';
// import {SwitchItem as SwitchItemBase} from '@enact/moonstone/SwitchItem';
import Toggleable from '@enact/ui/Toggleable';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import Headname from '../components/Headname';
import MySwitch from '../components/Switch/CookingSwitch';
import LunaNotification from '../views/LunaNotification';
import * as firebase from 'firebase';
import IconButton from '../components/IconButton/IconButton';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import MainBox from '../components/MainBox';

class Main extends Component {
    constructor() {
        super();
        this.state = {
          room: 0,
          pm10Value: 'none',
          pm25Value: 'none',
          temp: 'none',
          humid: 'none',
          location: 'none'

        };
      }

    componentDidMount(){
      const locationRef = firebase.database().ref().child('outside').child('info').child('now_location');

      locationRef.on('value', snap =>{
        console.log(snap.val());
        this.setState({
          location: snap.val()
        })
      })
    }
    render() {
        console.log("main render");

        // const SwitchItem = Toggleable({prop: 'selected'}, SwitchItemBase);

        // const SwitchStyle = {
        //     color: 'rgb(107, 165, 201)',
        //     fontSize: '1em',
        //     size: '3em'
        // }
        const leftbtnStyle={
          border: 'none',
          boxShadow: 'none',
          marginLeft: '0.5em',
          marginRight: '2em'
        }
        const rightbtnStyle={
          border: 'none',
          boxShadow: 'none',
          marginLeft: '2em'
        }

        return (

            <div className="all">
                {/* <div className="Header">
                    <Headname/>
                </div> */}
                {/* <LunaNotification/> */}
                <div className="Container">
                    <Row>
                    {/* <Col xs={{size: 2, offset: 9}}><SwitchItem style={SwitchStyle}>요리모드</SwitchItem></Col> */}
                    <Col xs={{size: 4, offset: 8}}><MySwitch/></Col>
                    </Row>
                    <Row className="Main-status" style={{paddingTop: "1em"}}>
                        {/* <Col xs={{size: 4, offset: 2}} className="center">
                            <h5>서울시 성북구 정릉동</h5><br/> <img src={placeholder} className="Icon-location"/>
                        </Col> */}
                        <Col xs={{size: 4, offset: 1}} className="center" style={{paddingTop:"1em"}}>
                            <h6 style={{color: 'black'}}>{this.state.location}</h6><br/> <img src={placeholder} className="Icon-location"/>
                        </Col>
                        <Col xs={{size: 4, offset: 0}} style={{paddingLeft:"2em"}}>
                            <div className="p-3 my-2 rounded">
                                <MainBox/>
                                {/* <Toast style={{width: "17em"}} class="slide">
                                <ToastHeader style={{ background: 'rgba(252, 253, 190, 0.829)', width: "17em", height: "3em", textAlign: "center"}}>
                                <IconButton iconComponent={FaChevronLeft} onClick={() => this.update_data(1)} style={leftbtnStyle}></IconButton>
                                {this.state.room==0?"주방의 air":this.state.room==1?"거실의 air":"방 1의 air"}
                                <IconButton iconComponent={FaChevronRight} onClick={() => this.update_data(2)} style={rightbtnStyle}></IconButton>
                                </ToastHeader>
                                <ToastBody style={{ background: 'rgba(252, 253, 190, 0.829)', width: "17em", height: "14em", textAlign: "center"}}>
                                    <p>pm25(미세먼지) : {this.state.pm25Value}</p>
                                    <p>pm10(초미세먼지): {this.state.pm10Value} </p>
                                    <p>온도: {this.state.temp} </p>
                                    <p>습도: {this.state.humid} </p>
                                </ToastBody>
                                </Toast> */}
                            </div>
                        </Col>
                    </Row>

                </div>

            </div>
        );
    }
}




export default Main;
