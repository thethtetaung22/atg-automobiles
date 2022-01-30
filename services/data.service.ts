import axios from 'axios';

const host = 'http://3.1.141.66:8500';

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
    return error;
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

export const getCarsList = async (query?: any): Promise<any> => {
  try {
    const result = await axios.get(`${host}/car${query ? `?${query}` : ''}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return {
      status: result.status,
      data: result.data
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getDropDownData = async (): Promise<any> => {
  try {
    const result = await axios.get(`${host}/car/search-dropdown-data`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return {
      status: result.status,
      data: result.data
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getCarByID = async (id: string): Promise<any> => {
  try {
    const result = await axios.get(`${host}/car/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return {
      status: result.status,
      data: result.data
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const uploadToS3 = async (url: string, file: any, contentType: string): Promise<any>  =>  {
  try {
    const result = await axios.put(url, file, {
      headers: {
        'Content-Type': contentType
      }
    });
    return {
      status: result.status
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const testingAPI = async (): Promise<any>  =>  {
  try {
    const result = await axios.get('http://localhost:8000/cdn/get-signed-url?module=driver&name=image.jpg&mimeType=image/jpeg', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldmVsb3BlckB0cmFjdGl2ZS5jb20ubXkiLCJmaXJzdE5hbWUiOiJEZXZlbG9wZXIiLCJsYXN0TmFtZSI6IlRyYWN0aXZlIiwic3ViIjoiNTMwODYzOTUtZjQ3OS00ZjE0LTliZDAtNDQ1ZTRmNTM4ZWFlIiwicm9sZSI6eyJpZCI6Ijk4ZTBjOGUxLWY3MDgtNDcyZS1hNmJkLWIxMDIwNTc5M2RhNyIsIm5hbWUiOiJERVZFTE9QRVIiLCJkZXNjcmlwdGlvbiI6ImRldmVsb3BlciIsImNyZWF0ZWRBdCI6IjIwMjEtMTItMjBUMDY6NTA6MzIuNzEzWiIsInVwZGF0ZWRBdCI6IjIwMjEtMTItMjBUMDY6NTA6MzIuNzEzWiIsImlzQWRtaW5Sb2xlIjp0cnVlLCJpc0RlbGV0ZWQiOmZhbHNlLCJwcml2aWxlZ2VzIjpbXX0sImxpY2Vuc2UiOnsiaWQiOiJlMDk5NmU0OS03NDFjLTQ0M2QtODAwZi1mOGRlN2IzNWFmNTEiLCJrZXkiOiJiNGY0MDA2NS05ZWNmLTQ3OGYtODU0My04MjI5YjM1YTdjNjQiLCJuYW1lIjoiU3VwcmVtZSBUcmFjdGl2ZSIsImVtYWlsIjpudWxsLCJ0eXBlIjoiRlJFRSIsImJhbGFuY2UiOiIwIiwiaXNGdWxsVmlldyI6dHJ1ZSwiaXNHcmFiIjpmYWxzZSwiZXhwaXJ5RGF0ZSI6IjIwMjItMDYtMjBUMTQ6NTA6MzMuNTkzWiIsImNyZWF0ZWRBdCI6IjIwMjEtMTItMjBUMDY6NTA6MzMuNjI1WiIsInVwZGF0ZWRBdCI6IjIwMjEtMTItMjRUMDM6MDA6MDIuNDEwWiIsInBvc2l0aW9uIjozfSwiaWF0IjoxNjQyNzUzNDQ5LCJleHAiOjE2NDI4Mzk4NDksImF1ZCI6Imh0dHBzOi8vZGFzaC5kZXYuZW5vbWFkLmlvIiwiaXNzIjoiaHR0cHM6Ly9nYXRld2F5LmRvaC5hcHB0cmFjdGl2ZS5jb20ubXkifQ.u6vOPG3PKDkckfm4TzIo68bYKvxFwRZyYAG91cAY1Uc'
      }
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const createNewCarApi = async (token: string, body: any): Promise<any> => {
  try {
    const result = await axios.post(`${host}/car`, body, {
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
    return error;
  }
}

export const updateCarApi = async (token: string, id: string, body: any): Promise<any> => {
  try {
    const result = await axios.put(`${host}/car/${id}`, body, {
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
    return error;
  }
}

export const deleteCarApi = async (token: string, id: string): Promise<any> => {
  try {
    const result = await axios.delete(`${host}/car/${id}`, {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    });
    return {
      status: result.status,
      result: result.data
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}

