import React from 'react';
import './all.css';
import {Row, Col, Button} from 'reactstrap';
import kitchen from '../components/kitchen.png';
import livingroom from '../components/livingroom.png';
import room1 from '../components/room1.png';
import Switch from 'react-toggle-switch'
import "../../node_modules/react-toggle-switch/dist/css/switch.min.css"
import "../components/Switch/Switch.module.css"
import ri from '@enact/ui/resolution';
import Scroller from '@enact/moonstone/Scroller/Scroller';
// import MySwitch from '../components/Switch/ManualSwitch'
import * as firebase from 'firebase';


class Device extends React.Component{
	constructor (props) {
		super(props);
		this.state = {
			switched: false,
			location: livingroom
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



	manual_turtlebot(room_number) {
		firebase.database().ref('mode/manual_area').set(room_number);
		switch (room_number){
			case 0:
				this.setState({
					location: livingroom
				})
				break;
			case 1:
				this.setState({
					location: kitchen
				})
				break;
			case 2:
				this.setState({
					location: room1
				})
				break;


		}
	}


	render(){

		const btnStyle={
			width: '8em',
			height: '2em',
			marginTop: '0.5em'
		}
		const manualStyle={marginTop: "1em", marginLeft: "5em"}

		return(
			<div className="all">

				<div className="Container">
					<Row>
						<Col xs={{size:6}}>
							<img width="100%" class='center' src={this.state.location} style={{paddingLeft: '1em'}}className="house" />
						</Col>
						<Col style={{paddingLeft:"1.5em"}}>
							<Row>
								<span className="Contentname" style={{fontSize: "1em", paddingBottom: "0.5em"}}>Device Info</span>
								<hr/>
							</Row>
							<Row>
								<span style={{fontSize: '0.7em'}}>LG PuriCare Mini AP139MWA</span>
							</Row>
							<Row>
								<span className="Contentname" style={{fontSize: "1em", paddingTop:"1em", paddingBottom: "0.5em"}}>수동 제어</span><i style={manualStyle}><Switch id="manualswitch" onClick={this.toggleSwitch} on={this.state.switched}/></i>
								<hr/>
							</Row>
							<Row>
								<Button onClick={() => this.manual_turtlebot(0)} disabled={!this.state.switched} color="secondary" style={btnStyle}>거실</Button>
							</Row>
							<Row>
								<Button onClick={() => this.manual_turtlebot(1)} disabled={!this.state.switched} color="secondary" style={btnStyle}>주방</Button>
							</Row>
							<Row>
								<Button onClick={() => this.manual_turtlebot(2)} disabled={!this.state.switched} color="secondary" style={btnStyle}>방 1</Button>
							</Row>



						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default Device;
