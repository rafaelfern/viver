import React, { useState } from 'react';
import {
    Row,
    Col,
    Card,
    Container,
    CardBody,
    CardHeader,
    CardFooter,
    Input,
    Button
} from 'reactstrap';
import firebase from '../../firebase/firebase';
import { withRouter } from 'react-router-dom';

function NewUser(props) {
    
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ age, setAge ] = useState('');
    const [ isAdmin, setIsAdmin ] = useState(false);
    
    const saveUser = _ => {
        const userKey = firebase.database().ref('/users/').push().key;
        let user = {
            name: name,
            email: email,
            age: age,
            isAdmin: false,
        }
        firebase.database().ref(`users/${userKey}`).set(user).then(error => {
            if(error){
                alert("Erro ao salvar Usuário");
            }else{
                props.history.push('/usuarios');
            }
        })
    }

    return (
    
        <Container className="marg_top_60">
        
        <Row className="mx-auto my-4">
        
            <Col xs={12} md={10} lg={8} className="mx-auto">
                <Card>
                    <CardHeader><span className="card-title-label">Novo Usuário</span></CardHeader>
                    <CardBody>
                        
                        <Row className="mt-4">
                            <Col sm={3}>
                                <p className="col-form-label text-label-form">Nome</p>
                            </Col>
                            <Col sm={9}>
                                <Input
                                    type="text"
                                    class="form-control"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Col>
                        </Row>
                        
                        <Row className="mt-4">
                            <Col sm={3}>
                                <p className="col-form-label text-label-form">E-mail</p>
                            </Col>
                            <Col sm={9}>
                                <Input
                                    type="email"
                                    class="form-control"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col sm={3}>
                                <p className="col-form-label text-label-form">Idade</p>
                            </Col>
                            <Col sm={9}>
                                <Input
                                    type="text"
                                    class="form-control"
                                    value={age}
                                    name="age"
                                    onChange={(e) => setAge(e.target.value) }
                                />
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Row className="text-right">
                            <Col>
                                <Button color="danger" className="mr-2" onClick={() => props.history.goBack()}>Voltar</Button>
                                <Button color="success" onClick={() => saveUser()}>Salvar</Button>
                            </Col>
                        </Row>
                    </CardFooter>
                    
                </Card>
            </Col>
        </Row>
        </Container>
    );
}
export default withRouter(NewUser);