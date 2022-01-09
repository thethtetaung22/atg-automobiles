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

export const createMedia = async (token: string, obj: any) => {
  try {
    const result = await axios.post(`${host}/media`,
      obj, {
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return {
      status: result.status,
      result: result.data
    };
  } catch (error) {
    console.log(error);
  }
}

export const getPresignedURL = async (token: string, query: any) => {
  try {
    const result = await axios.get(`${host}/cdn/get-presigned-url?name=${query.name}&mimeType=${query.mimeType}`, {
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return {
      status: result.status,
      result: result.data
    };
  } catch (error) {
    console.log(error);
  }

}



export const uploadToS3 = async (url: string, file: any, contentType: string)  =>  {
  try {
    return await axios.put(url, file, {
      headers: {
        'Content-Type': contentType
      }
    });
  } catch (error) {
    console.log(error);
  }
}
