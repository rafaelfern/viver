import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import firebase from '../../firebase/firebase';
import { Button, Container, Spinner } from 'reactstrap';
import { withRouter } from 'react-router-dom';
// import { Container } from './styles';

function Task(props) {

    const [ taskList, setTaskList ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(
        () => {
            loadTasks()
        },[]
    )

    const loadTasks = async _ => {
        setLoading(true);
        const taskSnap = await firebase.database().ref('/tasks/').once("value");
        const taskObj = taskSnap.val();
        
        let taskArr = [];
        for(const i in taskObj){
            taskArr = [...taskArr, taskObj[i] ];
            //     [text] taskObj[i].text,  
                 
            // ]
        }
        setTaskList(taskArr);
        setLoading(false)
    }

    const finishTask = key => {
        firebase.database().ref(`tasks/${key}`).update({status: 0}).then(error => {
			if(error) {
				alert("Erro ao concluir tarefa");
			}else{
                props.history.push('tarefas')
			}
		});
    }
   

  return (
    <div style={{paddingTop: "30px"}}>
        <Container>
            <h4 className="title-card">Tarefas</h4>
            <br/>
            <Button color="info" onClick={() => props.history.push('/nova-tarefa')}><i class="fas fa-plus"></i>&nbsp;Adicionar </Button>
            {   
                loading
                ?
                <div className="text-center">
                    <Spinner size="lg" color="primary" />
                </div>
                :
                <TaskList taskList={taskList} finishTask={() => finishTask()} />
            }
        </Container>
    </div>
  );
}

export default withRouter(Task);