import React from 'react';
import './all.css';
import './Main.module.css';
import Notification from '@enact/moonstone/Notification';
import Room from './Room';
// import Button from '@enact/ui/Button';
import {Row, Col, Button} from 'reactstrap';


import AirboxOutside from '../components/Airbox/AirboxOutside';
import {MdChevronLeft} from 'react-icons/md';
import AirboxInside from '../components/Airbox/AirboxInside';

class Home extends React.Component{
	constructor (props) {
		super(props);
		this.state = {
			open1: false,
			open2: false,
			open3: false
		};

		this.handleOpen1 = this.handleOpen(1);
		this.handleOpen2 = this.handleOpen(2);
		this.handleOpen3 = this.handleOpen(3);

		this.handleClose1 = this.handleClose(1);
		this.handleClose2 = this.handleClose(2);
		this.handleClose3 = this.handleClose(3);
	}

	handleOpen = (expNum) => () => {
		this.setState({
			['open' + expNum]: true
		});
	}

	handleClose = (expNum) => () => {
		this.setState({
			['open' + expNum]: false
		});
	}
	

	render(){
		const {open1, open2, open3} = this.state;

		const Rstyle={
            height: '90%',
            width: '100%', 
            // border: '2px solid  rgb(166, 230, 255)',
            marginRight: '50px',
			backgroundColor: 'rgb(232, 243, 250)',
			// border: '3px solid rgb(221, 241, 253)'
		}
		
		console.log("home render")
		return(
			<div className="all"> 
            
				<div className="Container">
					<Row>
						<Col xs={{size: 5}} style={{paddingLeft: "2em"}}> 
							<Row>
														
								<span className="Contentname" style={{fontSize: "1em", paddingBottom: "0.5em"}}>구역</span>
								
								
							</Row>
							<Row className="Roomlist" style={Rstyle}> 
								<Col xs={{offset: 0}} style={{paddingLeft: "1em", paddingTop: "1em"}}>
								{/* <div> */}
									<Button color="secondary" onClick={this.handleOpen1}>주방</Button> {'  '}
									<Button color="secondary" onClick={this.handleOpen2}>거실</Button> {'  '}
									<Button color="secondary" onClick={this.handleOpen3}>방 #1</Button> {'  '}

								{/* </div> */}
								</Col>
							
							</Row> 
						</Col>
						<Col className="Home-status" xs={{size: 6, offset: 1}}>
							<Row><span className="Contentname"  style={{fontSize: "1em", paddingBottom: "0.5em"}}>대기질 정보 조회</span></Row>
							
							<Row style={{paddingBottom:"0.6em"}}><AirboxInside /></Row>
							
							<Row><AirboxOutside/></Row>
						</Col>   
					</Row>

					<Notification
					open={open1}
					onClose={this.handleClose1}
					style={{borderColor:'rgba(252, 253, 190, 0.829)', width:"42em", height:"18em"}}
					> 
						<button 
						type="button" 
						className="close" 
						data-dismiss="alert" 
						aria-label="Close"
						onClick={this.handleClose1}
						>
						<span aria-hidden="true">&times;</span>
						</button>
						<Room>0</Room>
					</Notification>
					<Notification
						open={open2}
						onClose={this.handleClose2}
						style={{borderColor:'rgba(252, 253, 190, 0.829)', width:"42em", height:"18em"}}
					>
						<button 
						type="button" 
						className="close" 
						data-dismiss="alert" 
						aria-label="Close"
						onClick={this.handleClose2}
						>
						<span aria-hidden="true">&times;</span>
						</button>
						<Room>1</Room>
						
					</Notification>
					<Notification
						open={open3}
						onClose={this.handleClose3}
						style={{borderColor:'rgba(252, 253, 190, 0.829)', width:"42em", height:"18em"}}
					>
						<button 
						type="button" 
						className="close" 
						data-dismiss="alert" 
						aria-label="Close"
						onClick={this.handleClose3}
						>
						<span aria-hidden="true">&times;</span>
						</button>
						<Room>2</Room>
						
					</Notification>
				</div>

		
	</div>
		)
	}
}

export default Home;