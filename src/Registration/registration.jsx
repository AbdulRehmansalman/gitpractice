import React, { useEffect, useState } from 'react';
import './regist.css';
import register from '../../assets/register.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    usertype: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (Object.keys(formError).length === 0) {
        const { name, email, password, usertype } = user;
        const res = await fetch('/api/Register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          //todo Server String samjta hai : and name:name ko{name} bhi likh saktai
          body: JSON.stringify({
            name,
            email,
            password,
            usertype,
          }),
        });
        //? check if data is valid or not
        const data = await res.json();
        console.log(data);
        if (!res.ok || res.status === 422 || res.status === 400 || !data) {
          toast.error('Failed Httperror', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        } else {
          toast.success('Registration SuccessFull', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          navigate('/login');
        }
      } else {
        toast.error('plz Fill valid Details', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, [name]: value };
      console.log(name, value);
      setFormError(validate(updatedUser));
      return updatedUser;
    });
  };

  const validate = (formvalue) => {
    const errors = {};
    const nameregex = /^[A-Za-z\s\-']{3,}$/i;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const pwdregex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // For userName:
    if (!formvalue.name) {
      errors.name = 'Plz enter the username';
    } else if (!nameregex.test(formvalue.name)) {
      errors.name = 'Plz enter the Valid username';
    }
    // for Email
    if (!formvalue.email) {
      errors.email = 'Plz enter the email';
    } else if (!emailRegex.test(formvalue.email)) {
      errors.email = 'Plz enter the Valid email';
    }
    // For Password
    if (!formvalue.password) {
      errors.password = 'Plz enter the password';
    } else if (!pwdregex.test(formvalue.password)) {
      errors.password = 'Plz enter the Valid password';
    }
    // for User Role:
    if (!formvalue.usertype) {
      errors.usertype = 'Plz enter the user role';
    }

    return errors;
  };
  // to handle PassWord:
  const handlePass = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="row mt-1">
            {/* left Side */}
            <div className="img_section col-md-6">
              {/* Picture */}
              <img src={register} alt="Regsiter Image" loading="lazy" />
              <div className="text-center mt-3  ">
                <h6>
                  Already Registered! <NavLink to="/login">login</NavLink>
                </h6>
              </div>
            </div>{' '}
            {/* Right Side */}
            <div className="col-md-6 mt-3">
              <form method="POST">
                <h2>Sign Up</h2>
                <div className="line"></div>
                <div className="mt-4">
                  <div className="input-container">
                    <input
                      placeholder="Enter Your Name"
                      className="input-field"
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />
                    <label htmlFor="input-field" className="input-label">
                      Enter Name
                    </label>
                    <span className="input-highlight"></span>
                  </div>
                  <p>{formError.name}</p>
                </div>
                <div className="mt-5">
                  <div className="input-container">
                    <input
                      placeholder="Enter Your Email"
                      className="input-field"
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                    <label htmlFor="input-field" className="input-label">
                      Enter Email
                    </label>
                    <span className="input-highlight"></span>
                  </div>
                  <p>{formError.email}</p>
                </div>
                <div className="mt-5">
                  <div className="input-container">
                    {showPassword ? (
                      <Eye
                        color="#14efff"
                        className="Icon"
                        onClick={handlePass}
                      />
                    ) : (
                      <EyeOff
                        color="#066bef"
                        className="Icon"
                        onClick={handlePass}
                      />
                    )}
                    <input
                      placeholder="Enter Your Password"
                      className="input-field"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                    />
                    <label htmlFor="input-field" className="input-label">
                      Enter Password
                    </label>

                    <span className="input-highlight"></span>
                  </div>
                  <p>{formError.password}</p>
                </div>
                {/* User Role */}
                <label className="labelSelect"> User Role:</label>
                <select
                  className="select1"
                  name="usertype"
                  value={user.usertype}
                  onChange={handleChange}
                >
                  <option>Select option</option>
                  <option value="Manager">Manager</option>
                  <option value="Developer">Developer</option>
                </select>

                <p className="mt-2">{formError.usertype}</p>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="SignInbtn mt-2 mb-2"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
