import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, register } from './../actions/userActions';
import Modal from 'react-modal'
import { Link } from 'react-router-dom';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    width: 400,
    transform             : 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

const UserScreen = ({history}) => {
  
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const userRegister = useSelector((state) => state.userRegister)
    const {loading: createLoading, success: createSuccess ,error: createError, user: createdUser} = userRegister 
    
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }

    }, [dispatch, history, userInfo, createSuccess])

    const handleSubmit = () => {
      setModalIsOpen(false)
      dispatch(register(name, email, password, isAdmin))
      setName('')
      setEmail('')
      setPassword('')
      setIsAdmin(false)
    }

    return ( 
        <>  
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Users</h1>
          {createLoading 
          ? 
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          : 
          ''}
          {createError 
          ? 
          <div className="alert alert-danger" role="alert">
            {createError}
          </div> 
          : 
          ''}
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Users</li>
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  {/* Main content */}
  
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">

  <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            aria-describedby="name" 
            placeholder="Enter name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            aria-describedby="email" 
            placeholder="Enter email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            placeholder="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-check">
          <input 
            type="checkbox" 
            className="form-check-input" 
            id="isAdmin" 
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="admin">Is admin</label>
        </div>
        <hr/>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button className='btn btn-danger float-right' onClick={() => setModalIsOpen(false)}>Close</button>
      </form>
  </Modal>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Users table</h3>
              <button 
                className='btn btn-success float-right mr-4'
                onClick={() => setModalIsOpen(true)}
              >
                New User
              </button>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              {loading 
              ? 
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div> 
              : error 
              ? <div className="alert alert-danger" role="alert">
                {error}
                </div>  
              : (<table id="example2" className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th></th>

                  </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'Si' : 'No'}</td>
                            <td className='text-center'>
                              <Link to={`/user/${user.id}/edit`}>
                                <button 
                                  className='btn btn-warning'
                                >Edit
                                </button>
                              </Link>
                            </td>

                        </tr>
                    
                    ))}

                </tbody>

              </table>)}
            </div>
            {/* /.card-body */}
          </div>

        </div>
        {/* /.col */}
      </div>
      {/* /.row */}
    </div>
    {/* /.container-fluid */}
  </section>


        </>
        
     );
}
 
export default UserScreen;