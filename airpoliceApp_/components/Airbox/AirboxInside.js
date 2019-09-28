import React, { Component } from 'react';
// import {render} from 'react-dom';
import './Airbox.module.css';
import { FaRegDizzy, FaRegFrown ,FaRegSmile, FaRegGrinHearts } from 'react-icons/fa';
// import { MdSentimentVeryDissatisfied, MdSentimentDissatisfied, MdSentimentNeutral, MdSentimentVerySatisfied, MdFormatAlignCenter, MdCenterFocusStrong } from 'react-icons/md';
import { WiThermometer, WiHumidity } from 'react-icons/wi';
import { Row, Col } from 'reactstrap';
// import { geolocated } from 'react-geolocated';
// import * as firebase from 'firebase';
import crazy from '../crazy.png';
import bad from '../bad.png';
import normal from '../normal.png';
import good from '../good.png';

class AirboxInside extends Component {
  constructor() {
    super();
    this.state = {
        mise: null,
        ultra: null,
        humid: null,
        now_location: null,
        temp: null
      };
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

    let condition = '좋음';
    // if (this.state.mise >= 101 || this.state.ultra >=51){
    //   condition = '매우나쁨';
    // }
    // else if (this.state.mise >= 51 || this.state.ultra >= 26){
    //   condition = "나쁨";
    // }
    // else if (this.state.mise >= 31 || this.state.ultra >= 16){
    //   condition = '보통';
    // }
    // else condition = "좋음";


    return (
        <div>
            <h6>우리집 air</h6>
            <div className="airbox" style={boxstyle}>
                {/* { if문  && 실행할 것 } */}
                
                <Row>
                    
                {/* {this.state.mise}, {this.state.ultra} */}
                {condition == '매우나쁨' && <Col style={FIconStyle}><img src={crazy} width="50%" color="red"/> <h6 style={hStyle}>{condition}</h6></Col>}
                {condition == '나쁨' && <Col style={FIconStyle}><img src={bad} width="50%" color="red"/> <h6 style={hStyle}>{condition}</h6></Col>}
                {condition == '보통나쁨' && <Col style={FIconStyle}><img src={normal} width="50%" color="red"/> <h6 style={hStyle}>{condition}</h6></Col>}
                {condition == '좋음' && <Col style={FIconStyle}><img src={good} width="50%" color="red"/> <h6 style={hStyle}>{condition}</h6></Col>} 
               
                <Col style={IconStyle}><WiThermometer size="70%" color="rgba(136, 233, 141, 0.829)" /><h6 style={{color: 'rgb(168, 164, 164)'}}>21.2</h6></Col>
                <Col style={IconStyle}><WiHumidity size="70%" color="skyblue" /><h6 style={{color: 'rgb(168, 164, 164)'}}>91</h6></Col>  
                </Row>

            </div>
        </div>

    );
  }
}

export default AirboxInside;


// https://npm.runkit.com/react-toggle-switch?t=1563451058230