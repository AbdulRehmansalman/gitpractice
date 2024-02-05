import React, { useState, useContext } from 'react';
import './logn.css';
import login1 from '../../assets/login.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { userContext } from '../../App';

const login = () => {
  const { dispatch } = useContext(userContext);
  const navigate = useNavigate();
  const [formError, setFormError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ email: '', password: '', usertype: '' });

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
  //?Validation
  const validate = (formvalue) => {
    const errors = {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const pwdregex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
  const handleLogin = async (e) => {
    const { email, password, usertype } = user;
    e.preventDefault();
    try {
      if (Object.keys(formError).length === 0) {
        const res = await fetch('/api/signin', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email,
            password,
            usertype,
          }),
        });

        const data = await res.text();
        console.log(data);
        if (data === usertype) {
          console.log(data);
          if (usertype === 'Manager') {
            dispatch({ type: 'Manager', payload: data });
            toast.success('Manager Login', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
            navigate('/manager');
          } else if (usertype === 'Developer') {
            dispatch({ type: 'Developer', payload: data });
            console.log(usertype);
            toast.success('Developer Log in', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
            navigate('/developer');
          } else {
            toast.error('plz Fill all Valid Details', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }
        }

        if (res.status === 422 || res.status === 400 || !data) {
          toast.error('Failed', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        } else {
          //* type matlab kon sa action perform karna cha rhe or payload extra msg kis pas kar rhe action k sath
          toast.success('Login SuccessFull', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      } else {
        toast.error('plz Fill all Valid Details', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'coloured',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="row">
            {/* left Side */}

            <div className="img_sectionn col-md-6">
              {/* Picture */}
              <img src={login1} alt="Regsiter Image" loading="lazy" />
              <div className="text-center mt-3">
                <h6>
                  Not Registered! <NavLink to="/register">register</NavLink>
                </h6>
              </div>
            </div>
            {/* Right Side */}
            <div className="left col-md-6">
              <form method="POST">
                <h2>Login</h2>
                <div className="line"></div>
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
                  value={user.usertype}
                  name="usertype"
                  onChange={handleChange}
                >
                  <option>Select option</option>
                  <option value="Manager">Manager</option>
                  <option value="Developer">Developer</option>
                </select>

                <p className="mt-1">{formError.usertype}</p>
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="SignInbtn mt-2 mb-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// export const exportedData = data;

export default login;
