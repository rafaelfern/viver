import React, { useState, useEffect } from 'react';
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    ButtonDropdown,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import imgLogo from '../../assets/logo.png';
import './Header.css';


function Header(props) {

    const [ isOpen, setIsOpen ] = useState(false);
    const [ isLogged, setIsLogged ] = useState(false);

    useEffect(
        () => {
            verifyLogged()
        },[]
    )

    const logout = _ => {
        firebase.auth().onAuthStateChanged(user => {
            if(user.uid){
                firebase.database().ref(`/users/${user.uid}/`).update({ isLogged: false });
                firebase.auth().signOut();
                console.log("Signing out...");
                props.history.push('/login');
            } 
        });
    }
    
    const verifyLogged = _ => {
        firebase.auth().onAuthStateChanged(user => {
            if(user.uid){
                console.log("TENHO UID");
                let logged = false;
                firebase.database().ref(`/users/${user.uid}`).once('value').then(snap => {
                    const value = snap.val();
                    console.log("Aqui vem = ",value.isLogged)
                    logged=value.isLogged;
                })
                setIsLogged(true);
            }else{
                console.log("Não TENHO UID");

                setIsLogged(false);
            }
        });
    }
    
    const toggleNavbar = _ => setIsOpen(!isOpen);
    
    return (
    <div className="fixed-top">
        
        <Navbar className="pt-3 pb-3" color="white" light expand="md">
            {/* <Container> */}
                <NavbarBrand
                    onClick={() => { props.history.push('/home') }}
                    style={{ cursor: 'pointer' }}>
                    <h3><img src={imgLogo} width="100"/></h3>
                </NavbarBrand>
                
                <NavbarToggler onClick={toggleNavbar} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            {isLogged&&
                            <>
                            <Button
                                className="btn-anchor-header"
                                onClick={() => props.history.push('/usuarios')}
                            >
                                Usuários
                            </Button>
                            
                            <Button 
                                className="btn-anchor-header" 
                                onClick={() => props.history.push('/tarefas')}
                            >
                                Tarefas
                            </Button>
                            </>
                            }
                        </NavItem>
                        <NavItem>
                            {isLogged&&
                            <Button className="btn-anchor-header" onClick={() => logout()}>
                            <i class="fas fa-power-off"></i>&nbsp;Logout
                            </Button>
                            }
                        </NavItem>
                    
                    </Nav>
                </Collapse>
            {/* </Container> */}
        </Navbar>
    </div>
  );
}
export default withRouter(Header);