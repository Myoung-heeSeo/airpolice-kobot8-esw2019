import {Header, Panel} from '@enact/moonstone/Panels';
import PropTypes from 'prop-types';
import React from 'react';

const View = ({isAriaHidden = false, isHeader = true, title, view: ComponentView}) => {
    let header;
    
    const HStyle={
        borderTopColor: "white",
        borderBottom: "5px solid rgb(221, 241, 253)",
        height: "4em"
    }
	// rgb(221, 241, 253)
	if (isHeader) {
		header = <Header aria-hidden={isAriaHidden} title={title} type="compact" style={HStyle} />;
	}

	return (
		<Panel aria-owns="floatLayer" style={{padding: 0}}>
			{header}
			<ComponentView />
		</Panel>
	);
};

View.propTypes = {
	isAriaHidden: PropTypes.bool,
	isHeader: PropTypes.bool,
	title: PropTypes.string,
	view: PropTypes.func
};

export default View;
