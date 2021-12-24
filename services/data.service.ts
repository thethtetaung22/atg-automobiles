import axios from 'axios';

const host = 'http://ec2-3-0-103-45.ap-southeast-1.compute.amazonaws.com:8300'
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