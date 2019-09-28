import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import Panels from '@enact/moonstone/Panels';
import React from 'react';
import Changeable from '@enact/ui/Changeable';
import Group from '@enact/ui/Group';
import Item from '@enact/moonstone/Item';
import  {Cell} from '@enact/ui/Layout';
import {Row, Col}  from 'reactstrap';
import PropTypes from 'prop-types';
import ScrollerComponent from '@enact/moonstone/Scroller';

import Main from '../views/Main';
import Home from '../views/Home';
import Device from '../views/Device';
import Headname from '../components/Headname';

import css from './App.module.less';
import ViewManager from '@enact/ui/ViewManager/ViewManager';
import AirHome from './AirHome';
import View from './View';
import LunaNotification from '../views/LunaNotification';
import Lunacall from '../views/Lunacall';
import LS2Request from '@enact/webos/LS2Request';

const views = [
	{title: 'Air Police', view: Main},
	{title: 'Home', view: Home},
	{title: 'Send Device', view: Device}
];

const AppStyle = {
	height: "24em",
	width: "100%"
};

const AppBase = kind({
	name: 'App',

	propTypes: {
		index: PropTypes.number,
		onChange: PropTypes.func
	},

	styles: {
		css,
		className: 'app'
	},

	computed: {
		handleChange: ({onChange}) => ({selected}) => {
			onChange({index: selected});
		}
	},

	render: ({handleChange, index, ...rest}) => {
		delete rest.onChange;
		console.log("app.js app.js app.js")
		return (
				<div>
					{/* <LunaNotification/> */}
					<Row style={{backgroundColor: "rgb(221, 241, 253)"}}>
						<Headname/>
					</Row>
					<Row style={AppStyle}>
						<Col xs={{size: 2}}>
							<Cell component={ScrollerComponent} size="30%" style={{borderRight: "0px solid rgb(220, 239, 245)", height: "100%", paddingTop:"2em"}}>
							<Group childComponent={Item} itemProps={{className: css.navItem}} onSelect={handleChange} select={'radio'} selected={index} height="50em">
								{views.map((view) => view.title)}
							</Group>
							</Cell>
						</Col> 
						<Col>
							<Cell component={ViewManager} index={index}>
								{views.map((view, i) => (
									<View {...view} key={i} />
								))}
							</Cell>
						</Col>
					</Row>
				</div>
						
			// 	<Layout {...rest}>
			// 	<Cell component={Headname} size="30%">dddd</Cell>
				
			// 	<Cell component={ScrollerComponent} size="20%">
			// 		<Group childComponent={Item} itemProps={{className: css.navItem}} onSelect={handleChange} select={'radio'} selected={index}>
			// 			{views.map((view) => view.title)}
			// 		</Group>
			// 	</Cell>
			// 	<Cell component={ViewManager} index={index}>
			// 		{views.map((view, i) => (
			// 			<View {...view} key={i} />
			// 		))}
			// 	</Cell>
			// </Layout>
			

		);
	}
});

const App = MoonstoneDecorator(Changeable({prop: 'index', change: 'onChange'}, AppBase));

export default App;
