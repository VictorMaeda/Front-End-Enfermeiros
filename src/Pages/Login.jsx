import { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import './Login.css'
import { loginService, registerService, } from "../services/UserService";
import { useNavigate } from "react-router";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';

function Login() {
  const [errors, setErrors] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();


  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  function isValidInput(value, pattern) {
    return new RegExp(pattern).test(value);
  }

  function showValidationErrorAlert(message) {
    setAlertMessage(message);
    setShowAlert(true);
  }
  async function login(event) {
    // Captura de valores
    event.preventDefault();
    const emailInput = document.querySelector("#EmailLogin").value;
    const senhaInput = document.querySelector("#SenhaLogin").value;
    try {
      await loginService(emailInput, senhaInput);
      console.log("Usuário logado com sucesso");
      zerarLogin();
      navigate("/Plantoes");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        showValidationErrorAlert("Email e/ou senha inválido");
        return;
      }
    }
  }

  async function cadastrarTeste(event) {
    setShowAlert(false);
    event.preventDefault();
    const nomeInput = document.querySelector("#NomeCadastro").value;
    const emailInput = document.querySelector("#EmailCadastro").value;
    const senhaInput = document.querySelector("#SenhaCadastro").value;
    const senhaConfirmaInput = document.querySelector("#SenhaConfirmarCadastro").value;
    const newErrors = [];
    //Validação, para cada input é feito uma validação:
    if (!isValidInput(nomeInput, "^[a-zA-Z0-9_.-]+$")) {
      newErrors.push('Digite um nome de usuário válido.');
    }
    if (!isValidInput(emailInput, /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      newErrors.push('Digite um endereço de e-mail válido.');
    }
    if (!isValidInput(senhaInput, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      newErrors.push('A senha deve conter pelo menos 8 caracteres, incluindo letras e números.');
    }
    if (senhaInput !== senhaConfirmaInput) {
      newErrors.push('As senhas não coincidem.');
    }
    //Aqui, se houver algum erro, ou seja, se o array de newErros for maior que 0, ele irá renderizar o alert
    if (newErrors.length > 0) {
      setErrors(newErrors);
      showValidationErrorAlert('');
      return;
    }
    setErrors([]);

    const usuario = {
      "login": nomeInput,
      "email": emailInput,
      "senha": senhaInput
    }
    cadastrar(usuario);
  }
  async function cadastrar(usuario) {
    try {
      await registerService(usuario);
      console.log("Usuario cadastrado com sucesso")
      zerarCadastro();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data; // Obtém a mensagem de erro do back-end
        showValidationErrorAlert(errorMessage); // Exibe a mensagem de erro
      } else {
        console.log(error.response.data);
      }
    }
  }

  function irCadastrar() {
    setShowAlert(false);
    setErrors([]);
    zerarCadastro();
    handleJustifyClick('tab1')
  }
  function irLogin() {
    setShowAlert(false);
    setErrors([]);
    zerarLogin();
    handleJustifyClick('tab2')
  }
  function zerarLogin() {
    document.querySelector("#EmailLogin").value = null;
    document.querySelector("#SenhaLogin").value = null;
  }
  function zerarCadastro() {
    document.querySelector("#NomeCadastro").value = null;
    document.querySelector("#EmailCadastro").value = null;
    document.querySelector("#SenhaCadastro").value = null;
    document.querySelector("#SenhaConfirmarCadastro").value = null;
  }
  return (
    <>
      <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible className="w-100 custom-alert" >
        {alertMessage && <p>{alertMessage}</p>}
        {errors.map((error, index) => (
          <p key={index}><h6 className="errosLogin">{error}</h6></p>
        ))}
      </Alert>
      <div className="loginBody">
        <div className="logo">
          <img
            src="\SpringMed.png"
          />
        </div>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
            <MDBTabsItem>
              <MDBTabsLink className="MDBTabsLink"
               onClick={() => irCadastrar()} active={justifyActive === 'tab1'}>
                Login
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink className="MDBTabsLink"
                onClick={() => irLogin()} active={justifyActive === 'tab2'}>
                Register
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
          
          <MDBTabsContent>
            <MDBTabsPane show={justifyActive === 'tab1'}>
              <MDBInput wrapperClass='mb-4' id='EmailLogin' type='email' placeholder='Email' />
              <MDBInput wrapperClass='mb-4' id='SenhaLogin' type='password' placeholder='Senha' />
              <button className="btn btn-custom-success"  onClick={login}>Entrar</button>
            </MDBTabsPane>

            <MDBTabsPane show={justifyActive === 'tab2'}>
              <MDBInput wrapperClass='mb-4' id='NomeCadastro' type='text' placeholder='Nome' />
              <MDBInput wrapperClass='mb-4' id='EmailCadastro' type='text' placeholder='Email' />
              <MDBInput wrapperClass='mb-4' id='SenhaCadastro' type='email' placeholder='Senha' />
              <MDBInput wrapperClass='mb-4' id='SenhaConfirmarCadastro' type='password' placeholder='Confirmar a senha' />
              <button className="btn btn-custom-success"  onClick={cadastrarTeste}>Criar conta</button>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBContainer>

      </div>
    </>
  );
}

export default Login