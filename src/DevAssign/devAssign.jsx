import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useParams, useNavigate } from 'react-router-dom';

const devAssign = () => {
  const navigate = useNavigate();
  //For User Verification:
  const { id } = useParams();
  const [devlopers, setTaskData] = useState([{}]);
  //* Developers Show:
  const showTasks = async () => {
    try {
      const resp = await fetch('/api/assignTask', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      //* get data from backend:
      const resdata = await resp.json();
      setTaskData(resdata);

      // console.log('the fetch data' + JSON.stringify(devlopers));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    showTasks();
  }, []);

  const goBack = () => {
    navigate('/manager');
  };
  //to assign the task to the developer
  const handleAssigntask = async (devId) => {
    try {
      const res = await fetch(`/api/developerAssign/${id}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        //todo Server String samjta hai : and name:name ko{name} bhi likh saktai
        body: JSON.stringify({
          devId,
        }),
      });

      const dataSaved = await res.json();
      console.log('The Data Saved is ' + JSON.stringify(dataSaved));
      if (res.status === 422 || !dataSaved) {
        toast.warning('Assigned User UnSuccessFully ', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        showTasks();
        toast.success('Assigned User SuccessFully', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteTask = async (devID) => {
    try {
      const resp = await fetch(`/api/AssignDelete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ devID }),
        credentials: 'include',
      });
      // Check if the deletion was successful based on the response Json
      const dataDeleted = await resp.json();
      if (resp.ok && dataDeleted) {
        showTasks();
        toast.success('Deleted SuccessFully', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        toast.error('Deleted Not SuccessFully', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="text-center">
        <button
          type="button"
          className="btn btn-danger mt-2"
          onClick={() => goBack()}
        >
          Go Back
        </button>
      </div>
      <div className="text-center mt-4">
        <h2>ASSIGN TASKS </h2>
      </div>
      <div className="container-fluid mt-5">
        <div className="table-responsive">
          <table className="table table-info table-striped table-hover">
            <thead>
              <tr className="table-danger text-center">
                <th className="text-center" scope="col">
                  Dev No#
                </th>
                <th className="text-center" scope="col">
                  Name
                </th>
                <th className="text-center" scope="col">
                  Email
                </th>
                <th className="text-center" scope="col">
                  User Role
                </th>
                <th className="text-center" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {devlopers.map((developer, index) => {
                const { _id, name, email, usertype } = developer;
                return (
                  <tr key={index} className="table-info text-center">
                    <th className="text-center" scope="row">
                      {index + 1}
                    </th>
                    <td className="text-center">{name}</td>
                    <td className="text-center">{email}</td>
                    <td className="text-center">{usertype}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-primary m-1"
                        onClick={() => handleAssigntask(_id)}
                      >
                        Assign
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteTask(_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default devAssign;
