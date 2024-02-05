import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Developer = () => {
  const [taskData, setTaskData] = useState([{}]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const showTasks = async () => {
    try {
      //get user id from backend ,middleware:-
      const resp = await fetch('/api/Developer', {
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
      setStatus(taskData.status);
      console.log('the fetch data' + JSON.stringify(taskData));

      if (taskData.length === 0) {
        toast.warning('No ASSIGNED TASK Found ', {
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
  useEffect(() => {
    showTasks();
  }, []);
  const handleUpdate = async (task_id) => {
    try {
      const response = await fetch(`/api/${task_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...taskData,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error('No Response');
      } else {
        const result = await response.json();
        if (result) {
          showTasks();
          toast.success(' Status Updated SuccessFully', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setStatus('');
          navigate(1);
        } else {
          toast.error(' Status NOT Updated SuccessFully', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  return (
    <>
      <div className="text-center mt-4">
        <h2>THE ASSIGNED TASKS ARE: </h2>
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
                  Detail
                </th>
                <th className="text-center" scope="col">
                  deadline
                </th>
                <th className="text-center" scope="col">
                  status
                </th>
                <th className="text-center" scope="col">
                  Project Reference:
                </th>
              </tr>
            </thead>
            <tbody>
              {taskData.length > 0 ? (
                taskData.map((task, index) => {
                  const { name, detail, deadline, status, project_id } = task;
                  return (
                    <tr key={index} className="table-secondary text-center">
                      <th className="text-center" scope="row">
                        {index + 1}
                      </th>
                      <td className="text-center">{name}</td>
                      <td className="text-center">{detail}</td>
                      <td className="text-center">{deadline}</td>
                      <td className="text-center">
                        {status}
                        <button
                          type="button"
                          className="btn btn-l mt-2 col-md-12"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Update
                        </button>
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-sm modal-sm modal-sm modal-sm modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1
                                  className="modal-title fs-5"
                                  id="exampleModalLabel"
                                >
                                  Create New Task
                                </h1>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <label htmlFor="Status" className="label">
                                  {' '}
                                  Status:
                                </label>
                                <select
                                  value={status}
                                  onChange={(e) => setStatus(e.target.value)}
                                  name="format"
                                  id="format"
                                >
                                  <option value="Not Started">
                                    Not Started
                                  </option>
                                  <option value="Started"> Started</option>
                                  <option value="In Progress">
                                    In Progress
                                  </option>
                                  <option value="Completed">Completed</option>
                                </select>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={() => handleUpdate(task._id)}
                                >
                                  Save Status
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">{project_id}</td>
                    </tr>
                  );
                })
              ) : (
                <tr rowSpan={5} className="text-center">
                  <td colSpan={5}>NO TASK FOUND FOR THIS DEVELOPER</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Developer;
