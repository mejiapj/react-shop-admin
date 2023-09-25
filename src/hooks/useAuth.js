import React, { useState, useContext, createContext } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api/';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

// function xuseProvideAuth() {
//   const [user, setUser] = useState(null);

//   const signIn = async (email, password) => {
//     const options = {
//       headers: {
//         accept: '*/*',
//         'Content-Type': 'application/json',
//       },
//     };
//     const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
//     console.log(access_token);
//     if (access_token) {
//       Cookie.set('token', access_token.access_token, { expires: 5 });
//     }
//   };

//   return {
//     user,
//     signIn,
//   };
// }

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);

      if (access_token) {
        Cookie.set('token', access_token.access_token, { expires: 5 });
        const token = access_token.access_token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const { data: user } = await axios.get(endPoints.auth.profile);
        setUser(user);
      } else {
        throw new Error('Acceso denegado. Verifica tus credenciales.');
      }
    } catch (error) {
      // console.error('Error al iniciar sesión:', error.message);
      window.alert('Acceso denegado. Verifica tus credenciales.');
    }
  };

  return {
    user,
    signIn,
  };
}
