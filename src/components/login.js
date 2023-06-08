import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

let history = useNavigate();
  const host = "http://localhost:5000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked on the Login Button.");
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success){
      // Save the auth-token and redirect
      localStorage.setItem('token', json.authToken);
      props.showAlert("Logged in Successfully", 'success');
      history("/");
    }
    else{
      props.showAlert("Invalid Credentials", 'danger');
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-5">
      <h2>Login to continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            onChange={onChange}
            value={credentials.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            className="form-control"
            onChange={onChange}
            id="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
