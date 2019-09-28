import React from 'react';

import {Row, Col} from 'reactstrap';
import '../views/all.css';
import './Headname.module.css';
import './components.css';
import logo from '../components/logo.png';
import airpolicekr from '../components/airpolice.png';


  
const Headname = () => {
    const HeaderStyle = {
        paddingTop: "1em",
        paddingBottom: "1em",
        width: "13em",
        left: "27em"
    }

    const SwitchStyle = {
        padding: "5% 0 0 0"
    }

    return (
        <Row className="Headname" > 
            <Col style={HeaderStyle}><img width="25%" src={logo} className="App-logo" alt="logo" /><img width="70%" src={airpolicekr} style={{paddingBottom:'0.3em'}}/></Col>
                
            {/* <Route exact path={'/'} render={()=>(
                     <Col xs={{size: 2, offset: 2}} style={SwitchStyle}><MySwitch label="요리모드"/></Col>
            )}/> */}
          
        </Row>
    );
};

export default Headname;