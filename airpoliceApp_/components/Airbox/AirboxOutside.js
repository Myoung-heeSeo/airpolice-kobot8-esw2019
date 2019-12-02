import React, { Component } from 'react';
// import {render} from 'react-dom';
import './Airbox.module.css';
// import { FaRegDizzy, FaRegFrown ,FaRegSmile, FaRegGrinHearts } from 'react-icons/fa';
// import { MdSentimentVeryDissatisfied, MdSentimentDissatisfied, MdSentimentNeutral, MdSentimentVerySatisfied, MdFormatAlignCenter, MdCenterFocusStrong } from 'react-icons/md';
import { WiThermometer, WiHumidity } from 'react-icons/wi';
import { Row, Col } from 'reactstrap';
import { geolocated } from 'react-geolocated';
import Spinner from '@enact/moonstone/Spinner';
import * as firebase from 'firebase';
import LS2Request from '@enact/webos/LS2Request';
import crazy from '../crazy.png';
import bad from '../bad.png';
import normal from '../normal.png';
import good from '../good.png';

class AirboxOutside extends Component {
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

  componentDidMount() {
    const rootRef = firebase.database().ref().child('outside/info');
    const humidRef = rootRef.child('humid');
    const nowRef = rootRef.child('now_location');
    const tempRef = rootRef.child('temp');
    const miseRef = rootRef.child('pm10Value');
    const ultraRef = rootRef.child('pm25Value');

    miseRef.on('value', snap => {
      this.setState({
        mise: snap.val()
      });
    });

    ultraRef.on('value', snap => {
      this.setState({
        ultra: snap.val()
      });
    });

    humidRef.on('value', snap => {
      this.setState({
        humid: snap.val()
      });
    });

    nowRef.on('value', snap => {
      this.setState({
        now_location: snap.val()
      });
    });

    tempRef.on('value', snap => {
      this.setState({
        temp: snap.val()
      });
      console.log(this.state.temp);
    });
  }


  render() {
    this.props.coords ?
      (firebase.database().ref('outside/area/').set({ 'latitude': this.props.coords.latitude, 'longitude': this.props.coords.longitude }),
        console.log(this.props.coords.latitude, this.props.coords.longitude))
      : console.log('Getting the location data')

    const boxstyle = {
      // height: '10%',
      width: '21em',
      height: '7em',
      // border: '2px solid  rgb(166, 230, 255)',
      padding: '5% 5% 5% 5%',
      marginRight: '2em',
      border: '3px solid rgb(221, 241, 253)'
      // backgroundColor: ' rgb(208, 228, 236)'
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
      marginTop: "0.7em"
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
    else if( this.state.mise) condition = "좋음";

    console.log(condition);

    return (
      <div>
        <h6>실외 air - {this.state.now_location}</h6>
        <div className="airbox" style={boxstyle}>
            {(this.state.mise&&this.state.humid&&this.state.temp)? <Row>
            {/* {this.state.mise}, {this.state.ultra} */}
            {condition == '매우나쁨' && <Col style={FIconStyle}><img src={crazy} width="50%" /> <h6 style={hStyle}>{condition}</h6></Col>}
            {condition == '나쁨' && <Col style={FIconStyle}><img src={bad} width="50%"/> <h6 style={hStyle}>{condition}</h6></Col>}
            {condition == '보통' && <Col style={FIconStyle}><img src={normal} width="50%" /> <h6 style={hStyle}>{condition}</h6></Col>}
            {condition == '좋음' && <Col style={FIconStyle}><img src={good} width="50%"/> <h6 style={hStyle}>{condition}</h6></Col>}

            <Col style={IconStyle}><WiThermometer size="70%" color="rgba(136, 233, 141, 0.829)" /><h6 style={{color: 'rgb(168, 164, 164)'}}>{this.state.temp}</h6></Col>
            <Col style={IconStyle}><WiHumidity size="70%" color="skyblue" /><h6 style={{color: 'rgb(168, 164, 164)'}}>{this.state.humid} </h6></Col>
            </Row> : <Row style={{height: '80%', width:'80%', textAlign:'center'}}><Col xs={{offset: 5}}><Spinner>Loading...</Spinner></Col></Row>
            }


        </div>
      </div>

    );
  }
}


export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(AirboxOutside);


// https://npm.runkit.com/react-toggle-switch?t=1563451058230
