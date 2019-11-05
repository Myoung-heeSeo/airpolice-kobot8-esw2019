import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import * as firebase from 'firebase';
import { timer } from 'rxjs';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pm10Value: 'none',
      pm25Value: 'none',
      temp: 'none',
      humid: 'none',
      coValue: 'none',
      num: 0
    };
  }

  update_data(){
    const d = new Date;
    const month = d.getMonth()+1;
    var date = d.getDate();
  
    if (date < 10){
      date = '0' + date.toString();
      console.log(typeof(date));
    }

    // const hour = d.getHours();
    const hour = 15;
    var min = d.getMinutes();
    const minute = min % 5;
    min = min - minute;
    console.log(month, date, hour, min);
    
    const timeRef = firebase.database().ref().child('inside').child('livingroom').child(String(month)+String(date)).child(String(hour) + ':' + String(min));
    const pm10Ref = timeRef.child('pm10Value');
    const pm25Ref = timeRef.child('pm25Value');
    const tempRef = timeRef.child('temp');
    const humidRef = timeRef.child('humid');
    
    if (this.state.num == 0){
      const coRef = timeRef.child('coValue');
      coRef.on('value', snap => {
        this.setState({
          coValue: snap.val()
        });
        console.log(this.state.coValue);
      })
    }

    pm10Ref.on('value', snap => {
      this.setState({
        pm10Value : snap.val()
      });
      console.log(this.state.pm10Value);
    })
      
    pm25Ref.on('value', snap => {
      this.setState({
        pm25Value : snap.val()
      });
      console.log(this.state.pm25Value);
    })

    humidRef.on('value', snap => {
      this.setState({
        humid : snap.val()
      });
      console.log(this.state.humid);
    })

    tempRef.on('value', snap => {
      this.setState({
        temp : snap.val()
      });
      console.log(this.state.temp);
    })

    this.setState({
      num : 2
    });
    console.log(this.state.num);
  }

  componentDidMount() {
    this.update_data();
  }

  render() {

    return (
      <div className="App">
        <button onClick={this.state.update_data}></button>
        <h2>pm25 농도(미세먼지) : {this.state.pm25Value}</h2>
        <h2>pm10 농도(초미세먼지): {this.state.pm10Value}</h2>
        <h2>온도: {this.state.temp} </h2>
        <h2>습도: {this.state.humid} </h2>
        <h2>일산화탄소: {this.state.coValue} </h2>
      </div>
    )
  }
}

export default App;
