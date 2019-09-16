import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import * as firebase from 'firebase';
import { stringLiteral } from '@babel/types';
import { notDeepEqual } from 'assert';

// livingroom
const data = [];
class App extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
  constructor(){
    super();
    this.state = {
      pm10Value: 'none',
      pm25Value: 'none',
      time: 'none'
    };
  }

  componentWillMount() {
    const localRef = firebase.database().ref().child('kitchen').child('910').child('ave');
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

      
      pm25Ref.on('value', snap => {
        this.setState({
          pm25Value : parseFloat(snap.val())
        });
        // console.log(this.state.pm25Value);
        pm25_ave.push(this.state.pm25Value);
      });
    }

    console.log('pm25 ave', pm25_ave);
    console.log('pm10 ave', pm10_ave);
    
    // console.log(pm10_ave[0]);

    for (var j = 0; j < pm10_ave.length; j++){
      console.log(1);
      if(typeof(pm10_ave[j]) != 'undefined' && typeof(pm25_ave[j]) != 'undefined'){
        data.push({
          name: j, pm10: pm10_ave[j], pm25: pm25_ave[j], amt: 2220,
        });
      }
    }
    
    // console.log(data);
    // data.push({name: 10, pm10: 22, pm25: 25, amt: 2220});

  }

  render() { 
    console.log(data);
  
    return (
      <div>
        <LineChart width={500} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pm10" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="pm25" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }
}

export default App;