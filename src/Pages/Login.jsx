import { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import './Login.css'
import { loginService, registerService, } from "../services/UserService";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const [justifyActive, setJustifyActive] = useState('tab1');

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
      loginService(emailInput, senhaInput);
      toast.success('Plantao cadastrado com sucesso!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
      toast.success('Usuário cadastrado com sucesso!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
    setJustifyActive('tab2')
    zerarCadastro();
  }
  function irLogin() {
    setShowAlert(false);
    setErrors([]);
    setJustifyActive('tab1')
    zerarLogin();
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
      <ToastContainer />
      <div className="loginBody">
        <div className="logo mb-5">
          <img
            src="\SpringMed.png"
          />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-2">
            <button className={`btn w-100 MDBTabsLink text-white ${justifyActive === 'tab1' ? 'active' : ''}`} onClick={() => irLogin()}>Login</button>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-2">
              <button className={`btn w-100 MDBTabsLink text-white ${justifyActive === 'tab2' ? 'active' : ''}`} onClick={() => irCadastrar()} active={justifyActive === 'tab2'}>Cadastrar</button>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2 mt-4" style={{ display: justifyActive === 'tab2' ? "none" : null }}>
              <input className='mb-4 form-control' id='EmailLogin' type='email' placeholder='Email' />
              <input className='mb-4 form-control' id='SenhaLogin' type='password' placeholder='Senha' />
              <button className="btn btn-custom-success" onClick={login}>Entrar</button>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2 mt-4" style={{ display: justifyActive === 'tab1' ? "none" : null }}>
              <input className='mb-4 form-control' id='NomeCadastro' type='text' placeholder='Nome' />
              <input className='mb-4 form-control' id='EmailCadastro' type='email' placeholder='Email' />
              <input className='mb-4 form-control' id='SenhaCadastro' type='password' placeholder='Senha' />
              <input className='mb-4 form-control' id='SenhaConfirmarCadastro' type='password' placeholder='Confirmar a senha' />
              <button className="btn btn-custom-success" onClick={cadastrarTeste}>Criar conta</button>
            </div>


          </div>
        </div>

      </div>
    </>
  );
}

export default Login