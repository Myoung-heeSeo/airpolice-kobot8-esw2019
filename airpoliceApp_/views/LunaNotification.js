import LS2Request from '@enact/webos/LS2Request';
import React from 'react';
import ToggleButton from '@enact/moonstone/ToggleButton';
import Notification from '@enact/moonstone/Notification';


class LunaNotification extends React.Component {
	constructor () {
		super();
		this.state = {
			co: 'none',
			gasDetected: 0,
			notifi: false
		};

		console.log("luna in");

	}

	load_co(){
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

		const timeRef = firebase.database().ref().child('inside').child('kitchen').child(String(month)+String(date)).child(String(hour) + ':' + String(min));
		const coRef = timeRef.child('coValue');

		coRef.on('value', snap => {
			this.setState({
				co : snap.val().toFixed(1)
			});
			console.log(this.state.co);
		})
	}

	detectCO(){
		if (this.state.co>100) this.setState({
			gasDetected: 3
		})
		else if (this.state.co>50) this.setState({gasDetected: 2})
		else if (this.state.co>30) this.setState({gasDetected: 1})
	}

	async componentWillMount() {
		this.detectCO();
	}

	render = () => {
		console.log("luna render")
		var subscriptionStatus = true;



		if(this.state.gasDetected==3){
			new LS2Request().send({
				service: "luna://com.webos.notification",
				method:"createToast",
				parameters:{
					sourceId: "com.kobot.airpolice",
					message: "**위험**\n일산화탄소 가스 수치가 위험 수준입니다. 119에 신고 후 빠르게 대피하세요.",
					// type: 'warning',
					stale: false
				},
				onSuccess: function(args) {
					console.log("toast success")
				},
				onFailure : function(args){
					console.log("fail toast")
					console.log(args.errorText)
				},
				subscribe: subscriptionStatus
			});
			console.log("gas Detected 3")
		}

		else if(this.state.gasDetected==2){
			new LS2Request().send({
				service: "luna://com.webos.notification",
				method:"createToast",
				parameters:{
					sourceId: "com.kobot.airpolice",
					message: "**경고**\n일산화탄소 가스 수치가 경고 수준입니다. 119에 신고 후 빠르게 대피하세요.",
					// type: 'warning',
					stale: false
				},
				onSuccess: function(args) {
					console.log("toast success")
				},
				onFailure : function(args){
					console.log("fail toast")
					console.log(args.errorText)
				},
				subscribe: subscriptionStatus
			});
			console.log("gas Detected 2")
		}
		else if(this.state.gasDetected==1){
			new LS2Request().send({
				service: "luna://com.webos.notification",
				method:"createToast",
				parameters:{
					sourceId: "com.kobot.airpolice",
					message: "**주의**\n일산화탄소 가스 수치가 주의 수준입니다. 가스 누출을 확인한 후 조치를 취하세요.",
					// type: 'warning',
					stale: false
				},
				onSuccess: function(args) {
					console.log("toast success")
				},
				onFailure : function(args){
					console.log("fail toast")
					console.log(args.errorText)
				},
				subscribe: subscriptionStatus
			});
			console.log("gas Detected 1")
		}


		return (
			true

		);
	}
}

export default LunaNotification;
