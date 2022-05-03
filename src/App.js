import "./App.css";
import Header from "../src/Header/header";
import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import Api from './Services/staff.services'

function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [actionStaffModel, setactionStaffModel] = React.useState('');
  const [modalIsOpen1, setIsOpen1] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);
 
  const [staffSearch, setStaffSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");  
 
  const [Staffs,setStaffs]=useState([])
  const [StaffId,setStaffsId]=useState('')

  //staff model
  const [staffName, setstaffName] = useState("");
  const [staffAge, setstaffAge] = useState("");
  const [staffGenderKey, setstaffGenderKey] = useState("Select");
  const [staffExperience, setstaffExperience] = useState("");

   useEffect(()=>{
    GetStaff()
   },[])

  //MODEL 1
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "330px",
    },
  };
  //MODEL 1
  const customStyles1 = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "330px",
    },
  };
  //MODEL 2
  const customStyles2 = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "330px",
    },
  };

  const GetStaff=()=>{
    Api.getStaffs()
    .then((res)=>{
      setStaffs(res.data)
    })
    .catch((err)=>{
       alert("Server Error")
    })
  }

  const AddStaff = () => {
   let errors = [];
   if (!staffName) {
     errors.push("Name,");
   }
   if (!staffAge) {
     errors.push("Age,");
   }
   if (!staffGenderKey) {
     errors.push("Gender,");
   }
   if (!staffExperience) {
     errors.push("Experience,");
   }
   if (errors.length) {
    return alert("Invalid feilds")
   } else {
    const body={
      "name":staffName,
      "age":staffAge,
       "gender":staffGenderKey,
       "experience":staffExperience
     }
   Api.addStaff(body)
   .then((res)=>{
     setIsOpen(false)
     GetStaff()
   })
   .catch((err)=>{
      alert("Server Error")
   })
   }
  };

 const editStaff=()=>{
    const body2={
      "name":staffName,
      "age":staffAge,
       "gender":staffGenderKey,
       "experience":staffExperience
     }
    Api.editStaff(StaffId,body2)
    .then((res)=>{
      setIsOpen(false)
      GetStaff()
    })
    .catch((err)=>{
       alert("Server Error")
    })
 }

  const openStaffModal=(type,item)=> {
    setactionStaffModel(type)
    if(type=="Edit"){
      setstaffName(item.name)
      setstaffAge(item.age)
      setstaffGenderKey(item.gender)
      setstaffExperience(item.experience)
      setStaffsId(item.id)
    }else{
      setstaffName("")
      setstaffAge("")
      setstaffGenderKey("Select")
      setstaffExperience("")
    }
    setIsOpen(true);
  }

const deleteStaff=(item)=>{
  Api.deleteStaff(item.id)
  .then((res)=>{
    GetStaff()
  })
  .catch((err)=>{
     alert("Server Error")
  })
}

  function openModal1() {
    setIsOpen1(true);
  }

  function closeModal1() {
    setIsOpen1(false);
  }

  function openModal2() {
    setIsOpen2(true);
  }

  function closeModal2() {
    setIsOpen2(false);
  }

  useEffect(() => {}, []);

  return (
    <div>
      <Header></Header>
      <div className="container mb-5">
        <div class="card shadow content_staff mt-5">
          <div class="card-body">
            <div class="table-responsive">
              <div className="d-flex justify-content-between">
                <div>
                  <h2>Staff</h2>
                </div>
                <div>
                  <div>
                    <input
                      className="mr-3 mb-3 search_field"
                      type="text"
                      placeholder="Search.."
                      value={staffSearch}
                      onChange={(e) => setStaffSearch(e.target.value)}
                    />

                    <IoAddOutline onClick={()=>openStaffModal("Add","")} className="addStaff" />

                    <Modal
                      isOpen={modalIsOpen}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <div className="row">
     
                        <div className="d-flex justify-content-between mb-3">
                        <div>
                          {actionStaffModel} Staff
                        </div>
                          <IoMdClose
                            size={24}
                            onClick={() => setIsOpen(false)}
                            className="close closemodal"
                          />
                        </div>
                        <div className="col-12 col-sm-6 col-md-12">
                          <div className="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Staff Name
                            </label>
                            <input
                              type="value"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder=""
                              value={staffName}
                              onChange={(e)=>setstaffName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4">
                          <div className="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Age
                            </label>
                            <input
                              type="number"
                              min={1}
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder=""
                              value={staffAge}
                              onChange={(e)=>setstaffAge(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-6 col-sm-6 col-md-4 ">
                          <div className="mb-3">
                            <div>
                          <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Gender
                            </label>
                            </div>
                            <label
                              for="exampleFormControlInput1"
                              className="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {staffGenderKey}
                            </label>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <a class="dropdown-item" href="#" onClick={()=>setstaffGenderKey("Male")}>
                                  Male
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#"  onClick={()=>setstaffGenderKey("Female")}>
                                  Female
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#"  onClick={()=>setstaffGenderKey("Others")}>
                                  Others
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4 ">
                          <div className="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Experience
                            </label>
                            <input
                              type="number"
                              min={0}
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder=""
                              value={staffExperience}
                              onChange={(e)=>setstaffExperience(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <button type="button" class="btn btn-danger" onClick={()=>setIsOpen(false)}>
                            Close
                          </button>
                          <button type="button" class="btn btn-success" onClick={()=>actionStaffModel=="Add"?AddStaff():editStaff()}>
                            Save
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Staff Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Experience</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Staffs.map((item,index)=>(
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.gender}</td>
                    <td>{item.experience}</td>
                    <td>
                      <div>
                        <AiFillEdit
                          className="addStaff icon_edit"
                          data-toggle="tooltip"
                          onClick={()=>openStaffModal("Edit",item)}
                        />

                        <RiDeleteBin6Line
                          className="addStaff ml-2 icon_delete"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        />

                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                        >
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body ">
                                <h5>Are you sure want to delete ?</h5>
                              </div>

                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  No
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  data-bs-dismiss="modal"
                                   onClick={() => deleteStaff(item)}
                                >
                                  Yes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="card shadow content_staff mt-5">
          <div class="card-body">
            <div class="table-responsive">
              <div className="d-flex justify-content-between">
                <div>
                  <h2>Courses</h2>
                </div>
                <div>
                  <div>
                    <input
                      className="mr-3 mb-3 search_field"
                      type="text"
                      placeholder="Search.."
                      value={courseSearch}
                      onChange={(e) => setCourseSearch(e.target.value)}
                    />

                    <IoAddOutline onClick={openModal1} className="addStaff" />

                    <Modal
                      isOpen={modalIsOpen1}
                      style={customStyles1}
                      contentLabel="Example Modal"
                    >
                      <div className="row">
                        <div className="d-flex justify-content-end">
                          <IoMdClose
                            size={24}
                            onClick={() => closeModal1()}
                            className="close"
                          />
                        </div>

                        <div className="col-12 col-md-12">
                          <div className="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Name
                            </label>
                            <input
                              type="value"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-12">
                          <div className="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Category
                            </label>
                            <input
                              type="value"
                              min={0}
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-12 ">
                          <div className="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label btn btn-danger dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Allocated Course
                            </label>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuLink"
                            >
                              <li>
                                <a class="dropdown-item" href="#">
                                  Java
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  Javascript{" "}
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  Python
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  Machine Learning
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between">
                          <button type="button" class="btn btn-danger">
                            Close
                          </button>
                          <button type="button" class="btn btn-success">
                            Save
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Allocated Staff</th>
                    <th scope="col">Actions </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>Otto</td>

                    <td>
                      <div>
                        <AiFillEdit className="addStaff icon_edit" />

                        <RiDeleteBin6Line
                          className="addStaff ml-2 icon_delete"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        />
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                        >
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body ">
                                <h5>Are you sure want to delete ?</h5>
                              </div>

                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  No
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  data-bs-dismiss="modal"
                                  // onClick={() => deleteModal(item)}
                                >
                                  Yes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="card shadow content_staff mt-5">
          <div class="card-body">
            <div class="table-responsive">
              <div className="d-flex justify-content-between">
                <div>
                  <h2>Students</h2>
                </div>
                <div>
                  <div>
                    <input
                      className="mr-3 mb-3 search_field"
                      type="text"
                      placeholder="Search.."
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                    />
                    <IoAddOutline onClick={openModal2} className="addStaff" />

                    <Modal
                      isOpen={modalIsOpen2}
                      style={customStyles2}
                      contentLabel="Example Modal"
                    >
                      <div className="row">
                        <div className="d-flex justify-content-end">
                          <IoMdClose
                            size={24}
                            onClick={() => closeModal2()}
                            className="close"
                          />
                        </div>

                        <div className="col-12 col-md-12">
                          <div className="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Name
                            </label>
                            <input
                              type="value"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-12">
                          <div className="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Age
                            </label>
                            <input
                              type="number"
                              min={0}
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-12 ">
                          <div className="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Gender
                            </label>
                            <input
                              type="value"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-12 ">
                          <div className="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Course
                            </label>
                            <input
                              type="value"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <button type="button" class="btn btn-danger">
                            Close
                          </button>
                          <button type="button" class="btn btn-success">
                            Save
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Course Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Course</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>
                      <div>
                        <AiFillEdit className="addStaff icon_edit" />

                        <RiDeleteBin6Line
                          className="addStaff ml-2 icon_delete"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        />
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                        >
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body ">
                                <h5>Are you sure want to delete ?</h5>
                              </div>

                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  No
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  data-bs-dismiss="modal"
                                  // onClick={() => deleteModal(item)}
                                >
                                  Yes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
