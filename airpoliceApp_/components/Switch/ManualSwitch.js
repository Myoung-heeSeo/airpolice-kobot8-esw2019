import React, {Component} from 'react';
import Switch from 'react-toggle-switch'
import "../../../node_modules/react-toggle-switch/dist/css/switch.min.css"
import "./Switch.module.css"
import * as firebase from 'firebase';

class MySwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false, 
    };
  }

  componentDidMount(){
    const cookRef = firebase.database().ref().child('mode').child('manual_btn');
    
    cookRef.on('value', snap => {
      console.log("hihihihhiiiiiiiiiiiiiii")
      if(snap.val() == 1){
        this.setState({
          switched: true
        });
      }
      else{
        this.setState({
          switched: false
        });
      }
      
      console.log(this.state.switched);

    });

  }

  toggleSwitch = () => { 
    this.setState(prevState => {
      return {
        switched: !prevState.switched
      };
    });
    firebase.database().ref('mode/manual_btn').set(this.state.switched?0:1);
    // console.log(this.state.switched?0:1);
    
  };


  render() {
    const manualStyle={marginTop: "1em", marginLeft: "5em"}
    return (
        <i style={manualStyle}>
            {/* Basic Switch */}
            {/* <label for="manualswitch" class="switch-label" style={{verticalAlign: 'middle'}}>
              <h6 class="on" style={{paddingRight: "1em", fontWeight: 'bold'}}></h6>
            </label> */}
            <Switch id="manualswitch" onClick={this.toggleSwitch} on={this.state.switched}/>

        </i>
    );
  }

}

export default MySwitch;



// https://npm.runkit.com/react-toggle-switch?t=1563451058230