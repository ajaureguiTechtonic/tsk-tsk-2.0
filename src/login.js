const authURL = 'http://127.0.0.1:4000/auth';
const axios = require('axios');

//Handle the loggin in of a user
export function _handleLogIn(props, email, password) {
  let postData = {
    email: email,
    password: password,
  };
  axios.post(`${authURL}/login`, postData)
  .then((jwt) => {
    sessionStorage.setItem('jwt-token', jwt.data.token);
    sessionStorage.setItem('user', jwt.data.name);
    console.log('Logged In');
    props.checkLogin(jwt.data.auth);
  })
  .catch((jwt) => {
    console.log(jwt.response.data);
  });
}

//Handle registering a user, goes together with _validateAccount
export function _handleRegister(props, newUser) {
  axios.post(`${authURL}/register`, newUser)
  .then((jwt) => {
    console.log(jwt);
    sessionStorage.setItem('jwt-token', jwt.data.token);
    sessionStorage.setItem('user', jwt.data.name);
    props.checkLogin(jwt.data.auth);
  }).catch(() => {
    alert('An account with this email address already exists.');
  });
}

//Simple validation check, can expand to make more robust validation.
//Used before calling _handleRegister.
export function _validateAccount(user) {
  if (user.username == '') {
    console.log('Please enter a valid username');
    return false;
  } else if (user.email == '') {
    console.log('Please enter a valid email');
    return false;
  } else if (user.password == '') {
    console.log('Please enter a valid password');
    return false;
  } else {
    return true; // Good to move forward and register the user.
  }
}

//Verify the users token.
export function _verify() {
  let headers = { 'x-access-token': sessionStorage.getItem('jwt-token') };
  return axios.get(`${authURL}/verify`, { headers: headers });
}
