import React, {Component } from 'react';
import '../views/all.css';
import '../views/Main.module.css'
import * as firebase from 'firebase';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import IconButton from '../components/IconButton/IconButton';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';



class MainBox extends Component {
    constructor(){
        super();
        this.state={
            room: 0,
            pm10Value: 'none',
            pm25Value: 'none',
            temp: 'none',
            humid: 'none',
            co: 'none'
        }

    }

    update_data=(num) =>{
      const RoomName=["kitchen", "livingroom", "room"];
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
      const timeRef = firebase.database().ref().child('inside').child(RoomName[num]).child(String(month)+String(date)).child(String(hour) + ':' + String(min));
      const pm10Ref = timeRef.child('pm10Value');
      const pm25Ref = timeRef.child('pm25Value');
      const tempRef = timeRef.child('temp');
      const humidRef = timeRef.child('humid');
      const coRef = timeRef.child('coValue');

      var newroom=0;
      if(num==1) {

          newroom = (this.state.room+2)%3
      }
      else if (num==2){
          newroom = (this.state.room+1)%3
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

      coRef.on('value', snap => {
        this.setState({
          co : snap.val().toFixed(1)
        });
        console.log(this.state.co);
      })

      if(num==0){

      }
        // if(this.state.room==0){
        //     this.setState({pm10Value: 29.5})
        //     this.setState({pm25Value: 8.6})
        //     this.setState({temp: 16.})
        //     this.setState({humid: 45.6})
        // }
        // else if(this.state.room==1){
        //     this.setState({pm10Value: 29.4})
        //     this.setState({pm25Value: 9.8})
        //     this.setState({temp: 16.4})
        //     this.setState({humid: 45.8})
        // }
        // else{
        //     this.setState({pm10Value: 28.7})
        //     this.setState({pm25Value: 9.6})
        //     this.setState({temp: 17.6})
        //     this.setState({humid: 45.7})
        // }
        this.setState({room: (newroom)})
        this.render()
    }


      componentWillMount() {
        this.update_data(0);
      }


    render(){


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
        return(

            <Toast style={{width: "17em"}} class="slide">
                                <ToastHeader style={{ background: 'rgba(252, 253, 190, 0.829)', width: "17em", height: "3em", textAlign: "center"}}>
                                <IconButton iconComponent={FaChevronLeft} onClick={() => this.update_data(1)} style={leftbtnStyle}></IconButton>
                                {this.state.room==0?"주방의 air":this.state.room==1?"거실의 air":"방 1의 air"}
                                <IconButton iconComponent={FaChevronRight} onClick={() => this.update_data(2)} style={rightbtnStyle}></IconButton>
                                </ToastHeader>
                                <ToastBody style={{ background: 'rgba(252, 253, 190, 0.829)', width: "17em", height: "16em", textAlign: "center"}}>
                                    <p>pm25(미세먼지) : {this.state.pm25Value}㎍/m³</p>
                                    <p>pm10(초미세먼지): {this.state.pm10Value}㎍/m³</p>
                                    <p>온도: {this.state.temp}°C</p>
                                    <p>습도: {this.state.humid}%</p>
                                    {this.state.room==0&&<p>일산화탄소: {this.state.co}ppm</p>}
                                </ToastBody>
                                </Toast>
        )
    }
}

export default MainBox;
