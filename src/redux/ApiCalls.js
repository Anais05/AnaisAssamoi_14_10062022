import axios from 'axios'; 

class api {
  constructor() {
    this.baseUrl = 'http://localhost:3001/api/user';
  }

  async loginUser(email, password){
    try {
      const response = await axios.post(this.baseUrl + '/login', {
        email: email,
        password: password
      })
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new api()