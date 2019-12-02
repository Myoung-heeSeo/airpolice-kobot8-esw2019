import React, { Component } from 'react';
// import '../all.css';
// import { Button, ButtonGroup } from 'reactstrap';
import {Row, Col, Button} from 'reactstrap';
import IconButton from './IconButton/IconButton';
import { IconContext } from "react-icons";
import {WiCloud, WiHumidity, WiThermometer} from 'react-icons/wi';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import * as firebase from 'firebase';


const data_finedust = [];
const pm25_ave = [];
const pm10_ave = [];
const temp_ave = [];
const humid_ave = [];

const timeInfo = new Date;
const month = timeInfo.getMonth()+1;
var date = timeInfo.getDate();

class Roomgraph extends Component {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  constructor (props) {
    super(props);

    this.state = { cSelected: [] ,
                  pm10Value: [],
                  pm25Value: [],
                  load_data: false,
                  time: 'none',
                  jhdata: []
                };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  load_data(){
    const RoomName=["kitchen", "livingroom", "room"];
    console.log(RoomName[this.props.children], "load_data for Roomgraph");
    // const pm25_ave = [];
    // const pm10_ave = [];
    // const humid_ave = [];
    // const temp_ave = [];
    const timeInfo = new Date;
    const month = timeInfo.getMonth()+1;
    var date = timeInfo.getDate();
    const hour = timeInfo.getHours();
    var min = timeInfo.getMinutes();
    const minute = min % 5;
    min = min - minute;
    const localRef = firebase.database().ref().child('inside').child(RoomName[this.props.children]).child(String(month)+String(date)).child('ave');
    console.log(timeInfo, month, date)
    for (var i = 6; i >0; i--){
      // console.log(String(hour)+':'+String(min));
      // const keyRef = localRef.child('pm10_ave');

      const pm10Ref = localRef.child(String(hour-i)).child('pm10Value');
      const pm25Ref = localRef.child(String(hour-i)).child('pm25Value');
      const tempRef = localRef.child(String(hour-i)).child('temp');
      const humidRef = localRef.child(String(hour-i)).child('humid');

      pm10Ref.on('value', snap => {
        // this.setState({
        //   pm10Value : pm10parseFloat(snap.val())
        // });
        // // console.log(this.state.pm10Value);
        // pm10_ave.push(this.state.pm10Value);
        console.log(snap.val());
        console.log("this is finedust!!!!!!!!!!!!!11");
        pm10_ave.push(parseFloat(snap.val()));
      })
      pm25Ref.on('value', snap => {
        // console.log(1, parseFloat(snap.val()));
        pm25_ave.push( parseFloat(snap.val()));
      })

      tempRef.on('value', snap => {
        temp_ave.push(parseFloat(snap.val()));
      })

      humidRef.on('value', snap => {
        humid_ave.push(parseFloat(snap.val()));
      })


      // await this.push_finedust(pm10_ave, pm25_ave);
    }
  }



  async componentWillMount() {

    await this.load_data();


    console.log("after await!");
    console.log(humid_ave);

  }


  render() {
    console.log(pm25_ave);
    console.log(temp_ave);
    console.log(humid_ave);
    console.log("this is render");

    const d = new Date;
    const hour = d.getHours();
    const data_finedust = []
    const data_temp = [];
    const data_humid = [];
    for(var i=6; i>0; i--){
      data_finedust.push({name:hour-i, pm10: pm10_ave[6-i], pm25: pm25_ave[6-i], amt: 2220})
      data_temp.push({name:hour-i, temp: temp_ave[6-i], amt: 2220})
      data_humid.push({name:hour-i, humid: humid_ave[6-i],amt: 2220})
    }
    console.log(data_finedust)
    console.log(data_temp)
    console.log(data_humid)

    return (
        <div>
            <Row className="Roomgraph">
                <IconContext.Provider value={{ style: { verticalAlign: 'middle' }, size: "6em" }}>
                    <Col className="center">
                        <IconButton iconComponent={WiCloud} onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}></IconButton>
                    </Col>
                    <Col className="center">
                        <IconButton iconComponent={WiThermometer}  onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}></IconButton>
                    </Col>
                    <Col className="center">
                        <IconButton iconComponent={WiHumidity} onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}></IconButton>
                    </Col>


                </IconContext.Provider>
            </Row>
            <Row>

                <Col  className="center chart" xs={{offset: '2'}}>
                  {this.state.rSelected>=1 &&
                    <LineChart width={500} height={300} data={this.state.rSelected==1?data_finedust:this.state.rSelected==2?data_temp:data_humid} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" style={{fontSize:"0.6em"}}/>
                        <YAxis style={{fontSize:"0.6em"}}/>
                        <Tooltip />
                        <Legend/>
                        <Line type="monotone" dataKey={this.state.rSelected==1?"pm10":this.state.rSelected==2?"temp":"humid"} stroke="#8884d8" activeDot={{ r: 8 }} />
                        {this.state.rSelected==1?<Line type="monotone" dataKey="pm25" stroke="#82ca9d" />:" "}
                    </LineChart>
                  }
                </Col>
            {/* } */}

            </Row>

        </div>



        // <p>Selected: {this.state.rSelected}</p>
    );
  }
}

export default Roomgraph;
