import { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Navigate } from 'react-router-dom';
import '../../index.css';

const clientID = '979909028362-m77kbte3cel9jompo35lvn4fsg3vv882.apps.googleusercontent.com';

const ajaxLogin = async (username, password) => {
  const url = 'http://localhost:3100/api/v1/login';
  const res = await fetch(
    url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      username, password
    })
  }
  );
  return res;
}

function Login() {

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [login, setLogin] = useState(false);

  const handleSuccessGoogle = async (response) => {
    // console.log(response);
    // console.log(response.tokenId);
    // if (response.tokenId) {
    //   doLoginWithGoogle(response.tokenId)
    //     .then((token) => {
    //       localStorage.setItem("token", token);
    //       setIsLoggedIn(token);
    //     })
    //     .catch((err) => console.log(err.message))
    //     .finally(() => setIsLoading(false));
    //}
    console.log(response);
    console.log(response.profileObj.name);
    console.log(response.profileObj.email);
    console.log(response.profileObj.imageUrl);
    const url = 'http://localhost:3100/api/v1/loginGoogle';
    const res = await fetch(
      url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        username: response.profileObj.name,
        password: "",
        email: response.profileObj.email,
        first_name: response.profileObj.givenName,
        last_name: response.profileObj.familyName,
        googleId: response.googleId,
        googleToken: response.accessToken
      })
    }
    );
    res.json().then((json) => {
      if (res.status === 200) {
        console.log(json);
        localStorage.setItem('token', json.token);
        setLogin(true)
        // localStorage.setItem('user', json.users.id)
      } else {
        console.log(json);
        setAlert('Username atau password tidak sesuai')
        setLoading(false);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const handleFailureGoogle = (response) => {
    console.log(response);
    // alert(response);
  }


  const handleSubmit = function (event) {
    event.preventDefault();
    setLoading(true);
    let form = new FormData(this);
    ajaxLogin(form.get('username'), form.get('password')).then(result => {
      result.json().then((json) => {
        if (result.status === 200) {
          localStorage.setItem('token', json.token);
          setLogin(true)
          // localStorage.setItem('user', json.users.id)
        } else {
          setAlert('Username atau password tidak sesuai')
          setLoading(false);
        }
      }).catch(err => {
        console.log(err);
      })
    }).catch(
      error => console.log(error)
    );
  }

  useEffect(() => {
    // console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    localStorage.getItem('token') !== null ? setLogin(true) : console.log('token found');
    try {
      document.getElementById('login-form').addEventListener('submit', handleSubmit);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    login === false || localStorage.getItem('token') === null ? (
      <div className="container mt-5">
        <div className='my-auto mx-auto mt-5'>
          {
            alert !== '' ? (
              <div className="alert alert-danger" role="alert">
                {alert}
              </div>
            ) : ''
          }
          <h2>Login</h2>
          <form id='login-form' method='POST' className='w-50 mx-auto'>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
              <input type="text" className="form-control" name='username' required id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' required id="exampleInputPassword1" />
            </div>
            {loading ? (
              <div>
                <button className="btn btn-primary" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </button>
              </div>
            ) :
              (
                <button type="submit" className="btn btn-primary">Login</button>
              )}
          </form>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleSuccessGoogle}
            onFailure={handleFailureGoogle}
            cookiePolicy={"single_host_origin"}
          />

        </div>
      </div>
    ) : (
      <Navigate to={'/'} />
    )
  );
}

export default Login;