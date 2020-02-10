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

const noDataMessage = {
    nodata: "Sem Usuários no sistema"
}

export default function UsersList(props) {

    const [columns] = useState([
        { name: 'name', title: 'Nome',getCellValue: row => (row.name) },
        { name: 'email', title: 'E-mail', getCellValue: row => (row.email) },
        { name: 'age', title: 'Idade', getCellValue: row => (row.age) },
        { name: 'isAdmin', title: 'Admin', getCellValue: row => (row.isAdmin ? 'Sim' : 'Não') },
        { name: 'isLogged', title: 'Logado', getCellValue: row => (row.isLogged ? 'Sim' : 'Não') },
        
    ]);
    
    return (
        <Row className="mx-auto my-4">
            <Col xs={12} md={10} lg={12} className="mx-auto">
                <Card>
                    <CardBody>
                        <Grid
                            rows={props.userList}
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
