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
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async create(employee){
    try {
      const response = await axios.post(this.baseUrl + '/create-employee', {
        firstName :employee.firstName,
        lastName :employee.lastName,
        birthDay :employee.birthDay,
        startDate :employee.startDate,
        street :employee.street,
        city :employee.city,
        state :employee.state,
        zipCode :employee.zipCode,
        department :employee.department,
      })
      console.log(response)
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new api()