import React, { useState } from 'react';
import {
    PagingState,
    IntegratedPaging,
    IntegratedSelection,
    SearchState,
    IntegratedFiltering,
    SortingState,
    IntegratedSorting,
    SelectionState,
    
} from '@devexpress/dx-react-grid';

import {
    Grid,
    Table,
    Toolbar,
    TableHeaderRow,
    PagingPanel,
    TableSelection,
    SearchPanel
} from "@devexpress/dx-react-grid-bootstrap4";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Button
} from 'reactstrap';

const noDataMessage = {
    nodata: "Sem tarefas cadastradas"
}

export default function TaskList(props) {

    const [columns] = useState([
        { name: 'title', title: 'Tarefa',getCellValue: row => (row.title) },
        { name: 'text', title: 'Descrição', getCellValue: row => (row.text) },
        { name: 'status', title: 'Status', getCellValue: row => (row.status===1 ? 'ativo' : 'finalizada') },
        { name: "", title: "", getCellValue: row => actions(row) },
      ]);

    const actions = row => {
        return (
            <div>
                <Button
                    id={row.key}
                    color="primary"
                    onClick={() =>  props.finishTask(row.key)}
                    style={{ fontSize: '0.8rem' }}
                >
                    Concluir
            </Button>
            </div>
        )
    }
    
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
