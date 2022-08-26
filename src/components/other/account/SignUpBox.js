import React from "react";
import SignInOptions from "./SignInOptions";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import Button from "@material-ui/core/Button";
import { CountryListData } from "../../../store/CountryListData";

function SignUpBox(props) {
  return (
    <>
      <div className="billing-form-item mb-0 shadow-sm">
        <div className="billing-title-wrap border-bottom-0 pr-0 pl-0 pb-0 text-center">
          <h3 className="widget-title font-size-28 pb-0">{props.title}</h3>
          <p className="font-size-16 font-weight-medium">{props.subtitle}</p>
        </div>
        <div className="billing-content">
          <div className="contact-form-action">
            <form method="post">
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
                        placeholder="Password"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="input-box">
                    <label className="label-text">Confirm Password</label>
                    <div className="form-group">
                      <span className="form-icon">
                        <FiLock />
                      </span>
                      <input
                        className="form-control"
                        type="password"
                        name="confirmpassword"
                        placeholder="Confirm password"
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
                        placeholder="Confirm password"
                        required
                      >
                        <option value="">Select Account Type</option>
                        <option value="Solo - Practice">
                          Solo - Practice{" "}
                        </option>
                        <option value="Clinic with Staff">
                          Clinic with Staff
                        </option>
                        <option value="Common User">
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
                    Already have an account?{" "}
                    <Button onClick={() => props.handleLogin()}>LogIn</Button>
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
