import React, { useEffect } from 'react';
import { useNavigate } from "react-router";
import { api } from "./api";

export async function registerService(usuario) {
  await api.post('/auth/register', {
    "login": usuario.login,
    "email": usuario.email,
    "senha": usuario.senha
  });
}

export function loginService(email, senha) {
  return api
    .post('/auth/login', {
      "email": email,
      "senha": senha,
    })
    .then((response) => {
      sessionStorage.setItem('token', JSON.stringify(response.data));
    })
    .catch((error) => {
      throw error;
    });
}






export function sessionValidate() {
  const accessToken = sessionStorage.getItem('token');
  try {
    const response = api.get('/auth/validate', {
      headers: {
        'Authorization': `Bearer ${JSON.parse(accessToken)}`
      }
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Erro ao validar a sessão:', error);
    return false;
  }
}
