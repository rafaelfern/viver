import React, { useState } from 'react';
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
import imgLogo from '../../assets/logo.png';
import './Header.css';


function Header(props) {

    const [ isOpen, setIsOpen ] = useState(false);

    const toggleNavbar = _ => setIsOpen(!isOpen);
    
    return (
    <div className="fixed-top">
        <Navbar className="pt-3 pb-3" color="white" light expand="md">
            {/* <Container> */}
                <NavbarBrand 
                    onClick={() => { props.history.push('/') }} 
                    style={{ cursor: 'pointer' }}>
                    <h3><img src={imgLogo} width="100"/></h3>
                </NavbarBrand>
                
                <NavbarToggler onClick={toggleNavbar} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
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
                            
                        </NavItem>
                    
                    </Nav>
                </Collapse>
            {/* </Container> */}
        </Navbar>
    </div>
  );
}
export default withRouter(Header);