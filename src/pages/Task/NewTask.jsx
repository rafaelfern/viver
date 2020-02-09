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
    Spinner,
    Button
} from 'reactstrap';
import firebase from '../../firebase/firebase';
import { withRouter } from 'react-router-dom';
// import { Container } from './styles';

function NewTask(props) {
    
    const [ title, setTitle ] = useState('');
    const [ text, setText ] = useState('');
    const [ status, setStatus ] = useState(1);

    const saveTask = (text, title) => {

        let taskRefKey = firebase.database().ref('/events/').push().key;
        let task = {
            text: text,
            title: title,
            status: 1
        }

        firebase.database().ref(`tasks/${taskRefKey}`).set(task).then(error => {
            if(error){
                alert("Erro ao salvar Tarefa");
            }else{
                props.history.push('/tarefas');
            }
        })

        // firebase.database().ref(`/tasks/${user.user.uid}`).set(userData).then(error => {
        //     this.setState({ loading: false });
        //     if (error) {
        //         console.log(error)
        //         alert('Erro ao salvar dados. Tente novamente.')
        //     } else {
        //         this.notify("tc");
        //         this.setState({ backToPage: true });
        //     }
        // })
    }

    return (
        
            <Container className="marg_top_60">
            
            <Row className="mx-auto my-4">
            
                <Col xs={12} md={10} lg={8} className="mx-auto">
                    <Card>
                        <CardHeader><span className="card-title-label">Nova Tarefa</span></CardHeader>
                        <CardBody>
                        
                            <Row className="mt-4">
                                <Col sm={3}>
                                    <p className="col-form-label text-label-form">Título</p>
                                </Col>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        class="form-control"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            
                            <Row className="mt-4">
                                <Col sm={3}>
                                    <p className="col-form-label text-label-form">Descrição</p>
                                </Col>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        class="form-control"
                                        
                                        name="text"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                </Col>
                            </Row>

                            <Row className="mt-4">
                                <Col sm={3}>
                                    <p className="col-form-label text-label-form">Status</p>
                                </Col>
                                <Col sm={9}>
                                    <Input
                                        type="select"
                                        class="form-control"
                                        name="status"
                                        //value={status===1 ? 'Ativo' : 'Concluída' }
                                        onChange={(e) => setStatus(e.target.value) }
                                    >
                                        <option value={1}>Ativo</option>
                                        <option value={0}>Concluída</option>
                                    </Input>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <Row className="mx-auto">
                                <Col className="mx-auto">
                                    <Button color="danger" className="mx-auto btn-block" onClick={() => props.history.goBack()}>Voltar</Button>
                                </Col>
                                <Col className="mx-auto">
                                    <Button color="success" className="mx-auto btn-block" onClick={() => saveTask(text, title)}>Registrar</Button>
                                </Col>
                            </Row>
                        </CardFooter>
                        
                    </Card>
                </Col>
            </Row>
        </Container>
  );
}
export default withRouter(NewTask);