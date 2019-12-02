import React, { Component } from 'react';
// import '../all.css';
// import { Button, ButtonGroup } from 'reactstrap';
import {Row, Col, Button} from 'reactstrap';
import IconButton from './IconButton/IconButton';
import { IconContext } from "react-icons";
import {WiCloud, WiHumidity, WiThermometer} from 'react-icons/wi';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import * as firebase from 'firebase';

// const data = [[    {
//     "name": "finedust",
//     "uv": 4000,
//     "pv": 2400,
//     "amt": 2400
//   },
//   {
//     "name": "Page B",
//     "uv": 3000,
//     "pv": 1398,
//     "amt": 2210
//   },
//   {
//     "name": "Page C",
//     "uv": 2000,
//     "pv": 9800,
//     "amt": 2290
//   },
//   {
//     "name": "Page D",
//     "uv": 2780,
//     "pv": 3908,
//     "amt": 2000
//   },
//   {
//     "name": "Page E",
//     "uv": 1890,
//     "pv": 4800,
//     "amt": 2181
//   }],[    {
//     "name": "humidity",
//     "uv": 4000,
//     "pv": 2400,
//     "amt": 2400
//   },
//   {
//     "name": "Page B",
//     "uv": 3000,
//     "pv": 1398,
//     "amt": 2210
//   },
//   {
//     "name": "Page C",
//     "uv": 2000,
//     "pv": 9800,
//     "amt": 2290
//   },
//   {
//     "name": "Page D",
//     "uv": 2780,
//     "pv": 3908,
//     "amt": 2000
//   },
//   {
//     "name": "Page E",
//     "uv": 1890,
//     "pv": 4800,
//     "amt": 2181
//   }],
//     [{
//       "name": "what",
//       "uv": 4000,
//       "pv": 2400,
//       "amt": 2400
//     },
//     {
//       "name": "Page B",
//       "uv": 3000,
//       "pv": 1398,
//       "amt": 2210
//     },
//     {
//       "name": "Page C",
//       "uv": 2000,
//       "pv": 9800,
//       "amt": 2290
//     },
//     {
//       "name": "Page D",
//       "uv": 2780,
//       "pv": 3908,
//       "amt": 2000
//     },
//     {
//       "name": "Page E",
//       "uv": 1890,
//       "pv": 4800,
//       "amt": 2181
//     }],
//     [    {
//         "name": "Page hihihi",
//         "uv": 4000,
//         "pv": 2400,
//         "amt": 2400
//       },
//       {
//         "name": "Page B",
//         "uv": 3000,
//         "pv": 1398,
//         "amt": 2210
//       },
//       {
//         "name": "Page C",
//         "uv": 2000,
//         "pv": 9800,
//         "amt": 2290
//       },
//       {
//         "name": "Page D",
//         "uv": 2780,
//         "pv": 3908,
//         "amt": 2000
//       },
//       {
//         "name": "Page E",
//         "uv": 1890,
//         "pv": 4800,
//         "amt": 2181
//       }]]

const data = [];


class Roomgraph extends Component {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  constructor (props) {
    super(props);

    this.state = { cSelected: [] ,
                  pm10Value: 'none',
                  pm25Value: 'none',
                  time: 'none',
                  jhdata: []
                };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  //data

  push_data(pm10_ave, pm25_ave) {
    // console.log(1111, test, pm10_ave.length, pm25_ave);
    console.log(pm10_ave, pm10_ave.length);

    pm10_ave.forEach((idx, element) => {
      console.log(idx, element);
    });

    for (var j = 0; j < pm10_ave.length; j++){
      console.log(1);
      if(typeof(pm10_ave[j]) != 'undefined' && typeof(pm25_ave[j]) != 'undefined'){
        data.push({
          name: j, pm10: pm10_ave[j], pm25: pm25_ave[j], amt: 2220,
        });
      }
    }
  }

  async componentWillMount() {
    const localRef = firebase.database().ref().child('inside').child('kitchen').child('910').child('ave');
    const pm25_ave = [];
    const pm10_ave = [];

    for (var i = 0; i < 6; i++){
      // console.log(String(hour)+':'+String(min));
      // const keyRef = localRef.child('pm10_ave');
      const pm10Ref = localRef.child('pm10_ave').child(String(i));
      const pm25Ref = localRef.child('pm25_ave').child(String(i));

      pm10Ref.on('value', snap => {
        this.setState({
          pm10Value : parseFloat(snap.val())
        });
        // console.log(this.state.pm10Value);
        pm10_ave.push(this.state.pm10Value);

      });

      // pm25Ref.on('value', snap => {
      //   console.log(1, parseFloat(snap.val()));
      //   pm25_ave.push( parseFloat(snap.val()));
      // });


      // await this.push_data(pm10_ave, pm25_ave);
    }

    console.log(pm25_ave);
    // for (let j = 0; j < 6; j++) {
    //   await data.push({name: j, pm10: pm10_ave[j], pm25: pm25_ave[j], amt: 2220});
    // }

    // data.push({name: 10, pm10: 22, pm25: 25, amt: 2220});
  }

  render() {

    const data1 = [
      {name: 9, pm10: 10.2, pm25: 8.9, amt: 2220},
      {name: 10, pm10: 11.1, pm25: 9.4, amt: 2220},
      {name: 11, pm10: 12.3, pm25: 9.6, amt: 2220},
      {name: 12, pm10: 13.1, pm25: 9.6, amt: 2220},
      {name: 13, pm10: 12.4, pm25: 9.8, amt: 2220},
      {name: 14, pm10: 12.5, pm25: 9.8, amt: 2220},
      {name: 15, pm10: 12.9, pm25: 9.8, amt: 2220},
      {name: 16, pm10: 13.5, pm25: 9.9, amt: 2220},
      {name: 17, pm10: 13.8, pm25: 9.9, amt: 2220},
      {name: 18, pm10: 13.8, pm25: 9.9, amt: 2220},
      {name: 19, pm10: 13.4, pm25: 10.0, amt: 2220},
      {name: 20, pm10: 13.3, pm25: 10.0, amt: 2220},
    ];

    const data2 =  [
      {name: 17, temp: 24, amt: 2220},
      {name: 18, temp: 25, amt: 2220},
      {name: 19, temp: 22, amt: 2220},
      {name: 20, temp: 19, amt: 2220},
    ];
    const data3 =  [
      {name: 17, humid: 40, amt: 2220},
      {name: 18, humid: 39, amt: 2220},
      {name: 19, humid: 40, amt: 2220},
      {name: 20, humid: 37, amt: 2220},
    ];


    console.log(data1);

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
                  {this.state.rSelected &&
                    // <LineChart width={500} height={350} data={data[this.state.rSelected-1]}>
                    <LineChart width={500} height={300} data={this.state.rSelected==1?data1:this.state.rSelected==2?data2:data3} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
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
