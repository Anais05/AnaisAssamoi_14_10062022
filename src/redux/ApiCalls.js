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
      localStorage.setItem('token', response.data.body.token)
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async employeeList(){
    try {
      const response = await axios.get(this.baseUrl + '/employee-list')
      localStorage.setItem('list',  JSON.stringify(response.data.body))
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new api()