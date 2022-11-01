import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { CountryListData } from "../../../store/CountryListData";
import users from "./../../../services/users";

function SignUpBox(props) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [country, setCountry] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        firstName,
        lastName,
        username,
        email,
        password,
        role,
        country,
      };
      
      await users.saveUser(user);
      //await auth.login(user.username, user.password);
      window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        //console.log(ex.response.data);
        setErrorMessage(ex.response.data);
      }
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <div className="billing-form-item mb-0 shadow-sm">
        <div className="billing-title-wrap border-bottom-0 pr-0 pl-0 pb-0 text-center">
          <h3 className="widget-title font-size-28 pb-0">{props.title}</h3>
          <p className="font-size-16 font-weight-medium">{props.subtitle}</p>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
        </div>
        <div className="billing-content">
          <div className="contact-form-action">
            <form method="post" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-box">
                    <label className="label-text">First name</label>
                    <div className="form-group">
                      <span className="form-icon">
                        <AiOutlineUser />
                      </span>
                      <input
                        className="form-control"
                        type="text"
                        name="firstname"
                        placeholder="First name"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="input-box">
                    <label className="label-text">Last name</label>
                    <div className="form-group">
                      <span className="form-icon">
                        <AiOutlineUser />
                      </span>
                      <input
                        className="form-control"
                        type="text"
                        name="lastname"
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="input-box">
                    <label className="label-text">Username</label>
                    <div className="form-group">
                      <span className="form-icon">
                        <AiOutlineUser />
                      </span>
                      <input
                        className="form-control"
                        type="text"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="input-box">
                    <label className="label-text">Email</label>
                    <div className="form-group">
                      <span className="form-icon">
                        <FaRegEnvelope />
                      </span>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="input-box">
                    <label className="label-text">Password</label>
                    <div className="form-group">
                      <span className="form-icon">
                        <FiLock />
                      </span>
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="input-box">
                    <label className="label-text">Select Account Type</label>
                    <div className="form-group">
                      <span className="form-icon">
                        <FiLock />
                      </span>
                      <select
                        className="form-control"
                        type="text"
                        name="accounttype"
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Confirm password"
                        required
                      >
                        <option value="">Select Account Type</option>
                        <option value="622a75a8773388bb0b220190">
                          Solo - Practice{" "}
                        </option>
                        <option value="622a7596773388bb0b220189">
                          Clinic with Staff
                        </option>
                        <option value="622930056405e723619e88d8">
                          Patient / Common User
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="input-box">
                    <label className="label-text">Select Country</label>
                    <div className="form-group">
                      <span className="form-icon">
                        <FiLock />
                      </span>
                      <select
                        className="form-control"
                        type="text"
                        name="country"
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Confirm password"
                        required
                      >
                        <option value="None">Select Country</option>
                        {CountryListData.map((item) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="custom-checkbox d-block mr-0">
                      <input type="checkbox" id="chb13" required />
                      <label htmlFor="chb13">
                        I declare that I have read the
                        <Link to="#" className="color-text">
                          {" "}
                          Privacy Policy and Term of Use.
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="btn-box margin-top-20px margin-bottom-20px">
                    <button className="theme-btn border-0" type="submit">
                      Register account
                    </button>
                  </div>
                </div>
                <div className="col-lg-12">
                  <p className="font-weight-medium">
                    Already have an account?
                    <div
                      onClick={() => props.handleLogin()}
                      className="color-text font-weight-medium"
                      role="button"
                    >
                      Login
                    </div>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpBox;
