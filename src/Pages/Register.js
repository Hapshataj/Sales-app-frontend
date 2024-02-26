import React, { useState } from 'react'
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../src/config';
import Swal from 'sweetalert2';
const Register = () => {
    const navigate = useNavigate();  //for navigate one page to another

    const [firstName, setfirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const register = (event) => {
        event.preventDefault();
        setLoading(true);

        // debugger;
        const requestData = { firstName, lastName, email, password };  // to store data in database
        axios.post(`${API_BASE_URL}/register`, requestData)   //rest
            .then((result) => {
                // debugger;
                if (result.status === 201)   //validations
                {
                    setLoading(false);

                    Swal.fire({
                        icon: "success",
                        title: "User Successfully Registered"
                    })
                    navigate("/login");
                }
                setfirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);

                Swal.fire({
                    icon: "error",
                    title: "Some error occur try please again later"
                })

            })
    }
    return (
        <div className='page'>
            <h3 className='card-title mb-5  text-center text-uppercase pt-4 fw-bold'>registration form</h3>
            {<div className='mx-auto form-container text-muted shadow-sm roundedp-3 lh-2 px-3'>
                {loading ? <div className='row'>
                    <div className='col-md-12 mt-3 text-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>

                    </div>
                </div> : ""}

                <form onSubmit={(e) => register(e)}>
                    <div className="mb-3">
                        <label htmlFor='FirstName' className='form-label d-flex label' style={{ textAlign: "left" }}>First Name</label>
                        <input type="text" value={firstName} onChange={(ev) => setfirstName(ev.target.value)} className="form-control" id="firstname" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="LastName" className="form-label d-flex label">Last Name</label>
                        <input type="text" value={lastName} onChange={(ev) => setLastName(ev.target.value)} className="form-control" id="lastname" required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor='email' className='form-label d-flex label' style={{ textAlign: "left" }}>Email</label>
                        <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className="form-control" id="email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label d-flex label">Password</label>
                        <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} className="form-control" id="pass" required />
                    </div>
                    <div className='d-grid'>
                        <button type="submit" className="btn btn-primary mb-3" id='submit'>Submit</button>

                    </div>
                </form>
            </div>}
        </div>

    )
}

export default Register;