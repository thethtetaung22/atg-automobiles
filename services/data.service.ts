import axios from 'axios';

const host = 'http://localhost:8500';

export const testAPI = async () => {
  try {
    return await axios.get(host);
  } catch(error: any) {
    console.log(error)
  }
}

export const login = async (email: string, password: string) => {
  try {
    return await axios.post(`${host}/users/login`, {
      email,
      password
    });
  } catch (error) {
    console.log(error);
  }
}

export const validateToken = async (token?: string)  =>  {
  try {
    return await axios.get(`${host}/users/validate-token`, {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    });
  } catch (error) {
    console.log(error);
  }
}