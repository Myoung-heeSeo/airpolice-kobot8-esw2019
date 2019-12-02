import React, { Component } from 'react';
// import {render} from 'react-dom';
import './Airbox.module.css';
import { FaRegDizzy, FaRegFrown ,FaRegSmile, FaRegGrinHearts } from 'react-icons/fa';
// import { MdSentimentVeryDissatisfied, MdSentimentDissatisfied, MdSentimentNeutral, MdSentimentVerySatisfied, MdFormatAlignCenter, MdCenterFocusStrong } from 'react-icons/md';
import { WiThermometer, WiHumidity } from 'react-icons/wi';
import { Row, Col } from 'reactstrap';
// import { geolocated } from 'react-geolocated';
import * as firebase from 'firebase';
import crazy from '../crazy.png';
import bad from '../bad.png';
import normal from '../normal.png';
import good from '../good.png';
import Spinner from '@enact/moonstone/Spinner';

class AirboxInside extends Component {
  constructor() {
    super();
    this.state = {
        mise: null,
        ultra: null,
        humid: null,
        temp: null
    };
  }

  update_data(){
    const timeInfo = new Date;
    const month = timeInfo.getMonth()+1;
    var date = timeInfo.getDate();

    if (date < 10){
      date = '0' + date.toString();
      console.log(typeof(date));
    }

    const hour = timeInfo.getHours();
    var min = timeInfo.getMinutes();
    const minute = min % 5;
    min = min - minute;
    console.log(month, date, hour, min);

    
    const timeRef = firebase.database().ref().child('inside').child('livingroom').child(String(month)+String(date)).child(String(hour) + ':' + String(min));
    const pm10Ref = timeRef.child('pm10Value');
    const pm25Ref = timeRef.child('pm25Value');
    const tempRef = timeRef.child('temp');
    const humidRef = timeRef.child('humid');

    pm10Ref.on('value', snap => {
      this.setState({
        mise : snap.val()
      });
      console.log(this.state.mise);
    })

    pm25Ref.on('value', snap => {
      this.setState({
        ultra : snap.val()
      });
      console.log(this.state.ultra);
    })

    humidRef.on('value', snap => {
      this.setState({
        humid : snap.val().toFixed(1)
      });
      console.log(this.state.humid);
    })

    tempRef.on('value', snap => {
      this.setState({
        temp : snap.val().toFixed(1)
      });
      console.log(this.state.temp);
    })
  }

  componentDidMount(){
    this.update_data();
  }

  render() {
    const boxstyle = {
      // height: '10%',
      width: '21em',
      height: '7em',
      // border: '2px solid  rgb(166, 230, 255)',
      padding: '5% 5% 5% 5%',
      marginRight: '50px',
      border: '3px solid rgb(221, 241, 253)'
      // backgroundColor: ' rgb(212, 233, 253)'
    }


    const FIconStyle = {
      textAlign: 'center',
      top: '0.3em'
    }

    const IconStyle = {
      textAlign: 'center',
      // top: '1em'
    }

    const hStyle={
      // fontWeight: "bold",
      color: "rgb(168, 164, 164)",
      marginTop: "0.5em"
    }

    let condition = '';
    if (this.state.mise >= 101 || this.state.ultra >=51){
      condition = '매우나쁨';
    }
    else if (this.state.mise >= 51 || this.state.ultra >= 26){
      condition = "나쁨";
    }
    else if (this.state.mise >= 31 || this.state.ultra >= 16){
      condition = '보통';
    }
    else condition = "좋음";


    return (
        <div>
            <h6>우리집 air</h6>
            <div className="airbox" style={boxstyle}>
                {/* { if문  && 실행할 것 } */}

                {(this.state.mise&&this.state.humid&&this.state.temp)?<Row>

                {/* {this.state.mise}, {this.state.ultra} */}
                {condition == '매우나쁨' && <Col style={FIconStyle}><img src={crazy} width="50%" color="red"/> <h6 style={hStyle}>{condition}</h6></Col>}
                {condition == '나쁨' && <Col style={FIconStyle}><img src={bad} width="50%" color="red"/> <h6 style={hStyle}>{condition}</h6></Col>}
                {condition == '보통' && <Col style={FIconStyle}><img src={normal} width="50%" color="red"/> <h6 style={hStyle}>{condition}</h6></Col>}
                {condition == '좋음' && <Col style={FIconStyle}><img src={good} width="50%" color="red"/> <h6 style={hStyle}>{condition}</h6></Col>}

                <Col style={IconStyle}><WiThermometer size="70%" color="rgba(136, 233, 141, 0.829)" /><h6 style={{color: 'rgb(168, 164, 164)'}}>{this.state.temp}</h6></Col>
                <Col style={IconStyle}><WiHumidity size="70%" color="skyblue" /><h6 style={{color: 'rgb(168, 164, 164)'}}>{this.state.humid}</h6></Col>
                </Row> : <Row style={{height: '80%', width:'80%', textAlign:'center'}}><Col xs={{offset: 5}}><Spinner>Loading...</Spinner></Col></Row>
                }

            </div>
        </div>

    );
  }
}

export default AirboxInside;


// https://npm.runkit.com/react-toggle-switch?t=1563451058230
