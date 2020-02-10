import React, { useState, useEffect } from 'react';
import UsersList from './UsersList';
import firebase from '../../firebase/firebase';
import { Button, Container, Spinner } from 'reactstrap';
import { withRouter } from 'react-router-dom';

function Users(props) {

  const [ userList, setUserList ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(
    () => {
      loadUsers()
    },[]
  )

  const loadUsers = async _ => {
    setLoading(true);
    const userSnap = await firebase.database().ref('/users/').once("value");
    const userObj = userSnap.val();
    
    let userArr = [];
    for(const i in userObj){
      const values = userObj[i];
      values['key'] = i;
      userArr = [...userArr, values ];
    }
    setUserList(userArr);
    setLoading(false);
  }

  return (
    <div style={{paddingTop: "30px"}}>
      <Container>
        <h4 className="title-card">Usuários</h4>
        <br/>
        <Button color="info" onClick={() => props.history.push('/novo-usuario')}><i class="fas fa-plus"></i>&nbsp;Adicionar </Button>
        {
          loading
          ?
          <div className="text-center">
            <Spinner size="lg" color="primary" />
          </div>
          :
            <UsersList userList={userList} history={props.history} />
        }
      </Container>
    </div>
  );
}

export default withRouter(Users);