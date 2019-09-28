import React from 'react';
import './all.css';
import {Row, Col, Button} from 'reactstrap';
import {MdChevronLeft} from 'react-icons/md';
import IconButton from '../components/IconButton/IconButton';
import Roomgraph from '../components/Roomgraph';


class Room extends React.Component{
    render(){
        const RoomName=["주방", "방1", "방2"];
        const Graphstyle={
            height: '50%',
            width: '85%',
            
        }
        return(
            <div className="Container">
                <Col xs={{size: 10, offset: 1}}> 
                    
                  
                        <Row>
                            <Col>
                            <h4 className="Contentname">{RoomName[this.props.children]}</h4>
                            </Col>
                            
                        </Row>
                        <Roomgraph>{this.props.children}</Roomgraph>

                        
                        <br/>
                
                    
                </Col>
            </div>
        )
    }
}

export default Room;