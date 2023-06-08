import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let navigate = useNavigate();
  const host = "http://localhost:5000";
 
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked on the Login Button.");
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        cpassword: credentials.cpassword,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success){
      // Save the auth-token and redirect
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert("Account Created Successfully", 'success')
    }
    else{
      props.showAlert("Invalid Details", 'danger')
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-5">
      <h2>Create an Account to use iNoteBook</h2>
      <div className="container">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={credentials.name}
              className="form-control"
              id="name"
              onChange={onChange}
              aria-describedby="nameHelp"
              placeholder="Enter your Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              id="email"
              onChange={onChange}
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              minLength={8}
              value={credentials.password}
              onChange={onChange}
              id="confirmInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              minLength={8}

              onChange={onChange}
              name="cpassword"
              value={credentials.cpassword}
              id="exampleInputPassword1"
              placeholder="Confirm Password"
            />
          </div>
          <button disabled={credentials.password.length<8} type="submit" className="btn btn-primary my-2">
            SignUP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
