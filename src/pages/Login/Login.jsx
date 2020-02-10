import React, { Component } from 'react';
import Logo from '../../assets/logo.png';
import { withRouter } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import firebase from "../../firebase/firebase";
import './Login.css';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            buttonName: "ENTRAR",
        };
    }

    componentWillMount() {
        document.title = "Planos Viver";
        //this.isLogged();

        firebase.auth().onAuthStateChanged(user => {
            
            if(user) this.isAdmin(user.uid);
        });
    }

    isLogged = _ => {
        if(firebase.auth().currentUser){
            console.log("2 - Current User ");
            this.isAdmin(firebase.auth().currentUser.uid);
        }
    }

    onFieldChanged = e => this.setState({ [e.target.name]: e.target.value });

    onSubmitLogin = (e) => {
        const { email, password } = this.state;
        this.setState({ buttonName: "Aguarde..." });

        if (!email) {
            alert("Insira um e-mail");
            this.setState({ buttonName: "ENTRAR"});
            return
        }
        if (!password) {
            alert("Insira uma senha");
            this.setState({ buttonName: "ENTRAR"});
            return
        }
        
        firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
            if (error.code === "auth/user-not-found") {
                alert('O Usuário não existe.');
            } else if (error.code === 'auth/wrong-password') {
                alert('Senha incorreta.');
            } else if (error.code === 'auth/invalid-email') {
                alert('Favor inserir um e-mail válido.');
            }
          
        });
    }

    isAdmin = key => {
        firebase.database().ref(`/users/${key}`).once("value").then(snap => {
            if(snap.val()){
                let admin = snap.val();
                if(admin){
                    console.log("Is Admin True");
                    firebase.database().ref(`/users/${key}/`).update({isLogged: true});

                    this.setState({ buttonName: "ENTRAR"}, () => {
                        this.props.history.push('/home');
                    });
                }else{
                    alert("Você não possui credencial de administrador");
                }
            }else{
                alert("Você não possui acesso de administrador");
                this.setState({ buttonName: "ENTRAR" });
            }
        }).catch( error => {
            alert("Erro ao logar");
            console.log("error ",error);
            this.setState({ butonName: "ENTRAR" });
        })
    }

    render() {
        const { buttonName } = this.state;
        
        return (
            <div className="container-login pt-4">
                
                <div className="img-background">
                    <div className="img-logo mt-4">
                        <img src={Logo} className="logo" alt="logo" />
                    </div>
                </div>
                
                <div className="card-login-area mt-4">
                    <div className="login-page">
                        <div className="container">
                            <div className="row">
                                <div className="ml-auto mr-auto col-md-12 col-lg-6">
                                    <Card>
                                        <CardHeader>
                                            <h3 className="header text-center">Acesso - Admin</h3>
                                        </CardHeader>
                                        <CardBody>
                                            <div className="input-group pb-4">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i class="fas fa-user"></i></span>
                                                </div>
                                                <input
                                                    name="email" 
                                                    placeholder="Email" 
                                                    type="email" 
                                                    className="form-control" 
                                                    onChange={(e) => this.onFieldChanged(e)}
                                                    value={this.state.email}
                                                />
                                            </div>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i class="fas fa-unlock-alt"></i></span>
                                                </div>
                                                <input
                                                    name="password" 
                                                    placeholder="Senha" 
                                                    autoComplete="off" 
                                                    type="password" 
                                                    className="form-control" 
                                                    onChange={(e) => this.onFieldChanged(e)}
                                                    value={this.state.password}
                                                />
                                            </div>
                                        </CardBody>
                                        <CardFooter className="footer-btn text-center" onClick={this.onSubmitLogin}>
                                        {/* <div className="card-footer footer-btn text-center" onClick={this.onSubmitLogin}> */}
                                            <span className="">{buttonName}</span>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-content ">
                    <div className="container-fluid text-center">
                        <div className="row">
                            <div className="credits ml-auto pl-2 pr-2 pb-2">
                                <span className="copyright">© Planos Viver Administrativo. Todos os direitos reservados. </span><br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="copyright">© 2020 Feito com <i className="fa fa-heart heart"></i> por Rafael Fernandes</span> 
                            </div>
                        </div>
                        <div className="row mt-4 mb-4">
                            <div className="credits ml-auto pl-2 pr-2 pb-2">
                                <span className="copyright">R. Dona Francisca, 1488 - Saguaçu, Joinville - SC, 89221-007</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);