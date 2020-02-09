import React, { useEffect, useState } from 'react';
import {
    Container, Row, Col, Spinner, Table, Button, InputGroup, Input, InputGroupAddon, InputGroupText, Card, CardBody, CardHeader
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import './Content.css';

function Content() {

    const [ userQty, setUserQty ] = useState(0);
    const [ tasksQty, setTasksQty ] = useState(0);
    const [ loading, setLoading ] = useState(false);  

    useEffect(
        () => {
            loadUsers();
            loadTasks();
        },[]
    )

    const loadUsers = _ => {
        
    }

    const loadTasks = async _ => {
        setLoading(true);
        const taskSnap = await firebase.database().ref('/tasks/').once("value");
        const taskObj = taskSnap.val();
        
        setTasksQty(Object.keys(taskObj).length);
        setLoading(false);
    }

  return (
        <>
        <Container>
            <Row className="top-container marg_top_60">
                <Col sm={12} lg={6}>
                    <Card>
                        <CardHeader><span className="card-title-label"> Usuários</span>&nbsp; <i class="fas fa-users"></i></CardHeader>
                        <CardBody>
                            
                            usuários: 
                            {
                                // loading
                                // ?
                                // <Spinner size="sm" color="primary" />
                                // :
                                userQty
                            }
                            <br/>   
                            <Button className="mt-4" size="sm" color="info" onClick={() => {}}>Ver Usuários</Button>
                            
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={12} lg={6} >
                    <Card>
                        <CardHeader><span className="card-title-label">Tarefas</span>&nbsp; <i class="fas fa-tasks"></i></CardHeader>
                        <CardBody>
                            Tarefas:&nbsp;&nbsp;
                            { 
                                loading
                                ?
                                <Spinner size="sm" color="primary" />
                                :
                                <span>{tasksQty}</span>
                            }
                            <br/>   
                            <Button className="mt-4" size="sm" color="info" onClick={() => {}}>Ver Tarefas</Button>  
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>    
        </>
  );
}

export default withRouter(Content);