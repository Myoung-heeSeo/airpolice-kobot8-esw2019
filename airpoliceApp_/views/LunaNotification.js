import LS2Request from '@enact/webos/LS2Request';
import React from 'react';
import ToggleButton from '@enact/moonstone/ToggleButton';
import Notification from '@enact/moonstone/Notification';


class LunaNotification extends React.Component {
	constructor () {
		super();
		this.state = {
			CO: 40,
			gasDetected: 0,
			notifi: false
		};

		console.log("luna in");
		// var subscriptionStatus = true;
		// new LS2Request().send({
		// 	service: "com.webos.notification",
		// 	method:"createAlert",
		// 	parameters:{
		// 		// title: 'Gas Notification',
		// 		message: 'DangerDanger!!!'
		// 		// modal: true,
		// 		// type: 'warning'
		// 	},
		// 	onSuccess: function(args) {
		// 		console.log("hoho")
		// 	},
		// 	onFailure : function(args){
		// 		console.log("ddd")
		// 	},
		// 	subscribe: subscriptionStatus
		// });

			// if (window.PalmServiceBridge) {
			// 		new LS2Request().send({
			// 			service: 'com.webos.notification/',
			// 			method: 'createAlert',
			// 			parameters: {
			// 				title: 'Gas Notification',
			// 				message: 'hihihiDangerDanger!!!',
			// 				modal: true,
			// 				type: 'warning'
			// 			},
			// 			onSuccess: () => {
			// 				this.setState({
			// 					notifi: true
			// 				})
			// 			},
			// 			onFailure: () => {
			// 				this.setState({
			// 					notifi: false
			// 				})
			// 			},
			// 			subscribe: true
						
			// 			// onSuccess: (res) => {
			// 			// 	this.setState({
			// 			// 		standByLight: res.settings.standByLight === 'on'
			// 			// 	});
			// 			// }
			// 		});
			// 	}
	}

	detectCO(){
		if (this.state.CO>100) this.setState({
			gasDetected: 3
		}) 
		else if (this.state.CO>50) this.setState({gasDetected: 2})
		else if (this.state.CO>30) this.setState({gasDetected: 1})
	}
	
	async componentWillMount() {
		this.detectCO();
	}

	render = () => {
		console.log("luna render")
		var subscriptionStatus = true;
	
	// 	new LS2Request().send({
	// 		service: "luna://com.webos.notification",
	// 		method:"createAlert",
	// 		parameters:{
	// 			title: "Gas Notification",
	// 			message: "DangerDanger!!!",
	// 			modal: true
	// 			// type:"warning"
	// 		},
	// 		onSuccess: function(args) {
	// 			console.log("hoho")
	// 		},
	// 		onFailure : function(args){
	// 			console.log("fail lunanotification")
	// 			console.log(args.errorText)
	// 		},
	// 		subscribe: subscriptionStatus
	// 	})
	// }

		if(this.state.gasDetected==3){
			new LS2Request().send({
				service: "luna://com.webos.notification",
				method:"createToast",
				parameters:{
					sourceId: "com.kobot.mm",
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
					sourceId: "com.kobot.mm",
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
					sourceId: "com.kobot.mm",
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
