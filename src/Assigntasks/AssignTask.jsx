import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import '../../App.css';
import { ClipboardEdit } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

const AssignTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setTaskTitle] = useState('');
  const [detail, setTaskDetails] = useState('');
  const [deadline, setDeadLine] = useState('');
  const [status, setStatus] = useState('');
  const [taskData, setTaskData] = useState([{}]);

  // for Display all Tasks:
  const showTasks = async () => {
    try {
      const resp = await fetch(`/api/ProjectTask/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        //todo Server String samjta hai : and name:name ko{name} bhi likh saktai
      });
      //* get data from backend:
      const resdata = await resp.json();
      setTaskData(resdata);
      console.log('the fetch data' + JSON.stringify(taskData));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    showTasks();
  }, []);
  //save Tasks:
  const handleTask = async () => {
    try {
      const res = await fetch(`/api/SaveTasks/${id}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        //todo Server String samjta hai : and name:name ko{name} bhi likh saktai
        body: JSON.stringify({
          name,
          detail,
          deadline,
          status,
        }),
      });

      const dataSaved = await res.json();
      console.log('The Data Saved is ' + JSON.stringify(dataSaved));
      if (res.status === 422 || !dataSaved) {
        toast.warning('Fill all valid Fields', {
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
        toast.success('Task Created SuccessFully', {
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

  // todo delete tasks by id:
  const handleDeleteTask = async (_id) => {
    try {
      const resp = await fetch(`/api/deletetasks/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      // Check if the deletion was successful based on the response Json

      const dataDeleted = await resp.json();
      if (dataDeleted) {
        showTasks();
        toast.success('Deleted SuccessFully', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
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
  const goBack = () => {
    navigate(-1);
  };
  // Handle Update Buttton
  const handleUpdateButton = (idUpdate) => {
    navigate(`/updatetasks/${idUpdate}`);
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
      <div className="text-center">
        <button
          type="button"
          className="btn btn-secondary col-md-12 col-sm-12 mt-2"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Create new task
        </button>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-lg modal-md modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
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
              <label htmlFor="title" className="label">
                {' '}
                Task Title:{' '}
              </label>
              <input
                className="mt-2"
                type="text"
                name="title"
                value={name}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <label htmlFor="deadLine" className="label">
                {' '}
                DeadLine
              </label>
              <input
                className="mt-2"
                type="date"
                name="deadline"
                value={deadline}
                onChange={(e) => setDeadLine(e.target.value)}
              />
              <label htmlFor="description" className="label">
                {' '}
                Description:
              </label>
              <input
                className="mt-2"
                type="text"
                name="description"
                value={detail}
                onChange={(e) => setTaskDetails(e.target.value)}
              />
              <label htmlFor="Status" className="label">
                {' '}
                Status:
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                name="status"
                id="format"
              >
                <option value="Not Started">Not Started</option>
                <option value="Started"> Started</option>
                <option value="In Progress">In Progress</option>
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
                onClick={() => handleTask()}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      {/* FoRTASK SHOW */}
      <div className="flexwrap">
        {taskData.map((task, index) => {
          const { name, detail, deadline, status } = task;
          return (
            <div key={index} className="main">
              <div className="card">
                <div className="btns mb-2">
                  <button
                    className="button"
                    onClick={() => handleUpdateButton(task._id)}
                  >
                    <ClipboardEdit color="#18f3f7" size="20px" />
                    <NavLink
                      className="linkRemove"
                      to={`/updatetasks/${task._id}`}
                    >
                      Update
                    </NavLink>
                  </button>
                  <button
                    className="button"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    <Trash2 color="#c8330e" size="20px" />
                    Delete
                  </button>
                </div>
                <div className="card-title mt-3">
                  <h4>
                    task Name: <span>{name}</span>
                  </h4>
                </div>
                <div className="small-desc mt-3">
                  <h4>
                    task Description: <span>{detail}</span>
                  </h4>
                </div>
                <div className="small-desc mt-3">
                  <h4>
                    DeadLine: <span>{deadline}</span>
                  </h4>
                </div>
                <div className="card-title mt-3">
                  <h5>
                    Status: <span>{status}</span>
                  </h5>
                </div>
                <div className="card-title mt-3">
                  <h6>Project Reference: {id}</h6>
                </div>
                <div className="btns">
                  <button className="Btn mt-3 mb-3">
                    {/* <PlusCircle color="#05ffc1" /> */}
                    <NavLink
                      className="linkRemove"
                      to={`/assignTask/${task._id}`}
                    >
                      Assign Task
                    </NavLink>
                  </button>
                </div>

                <div className="go-corner">
                  <div className="go-arrow">→</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AssignTask;
