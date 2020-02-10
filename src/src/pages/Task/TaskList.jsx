import React, { useState } from 'react';
import {
    Grid,
    Table,
    TableHeaderRow,
} from "@devexpress/dx-react-grid-bootstrap4";
import {
    Row,
    Col,
    Card,
    CardBody,
    Button
} from 'reactstrap';
import firebase from '../../firebase/firebase';

const noDataMessage = {
    nodata: "Sem tarefas cadastradas"
}

export default function TaskList(props) {

    const [columns] = useState([
        { name: 'title', title: 'Tarefa',getCellValue: row => (row.title) },
        { name: 'text', title: 'Descrição', getCellValue: row => (row.text) },
        { name: 'status', title: 'Status', getCellValue: row => (row.status===1 ? 'Ativa' : `Finalizada em ${new Date(row.finished).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`) },
        { name: "", title: "", getCellValue: row => actions(row) },
      ]);


    const finishTask = key => {
        const timestamp = new Date().getTime();
        firebase.database().ref(`tasks/${key}`).update({status: 0, finished: timestamp}).then(error => {
			if(error) {
				alert("Erro ao concluir tarefa");
			}else{
                props.history.push('/home');
			}
		});
    }

    const actions = row => {
        return (
            <div>
                {
                    row.status===1 &&
                    <Button
                        color="primary"
                        onClick={() =>  finishTask(row.key)}
                        style={{ fontSize: '0.8rem' }}
                    >
                        Concluir
                    </Button>
                }
            </div>
        )
    }
    console.log("pROPS -  ",props);
    return (
        <Row className="mx-auto my-4">
            
            <Col xs={12} md={10} lg={12} className="mx-auto">
                <Card>

                    <CardBody>
                        <Grid
                            rows={props.taskList}
                            columns={columns}>
                            
                            <Table messages={noDataMessage}/>
                            <TableHeaderRow />
                            
                        </Grid>
                    </CardBody>
                </Card>
            </Col>
        </Row>        
        
    );
}
