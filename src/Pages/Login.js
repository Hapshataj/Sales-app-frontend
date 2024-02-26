import React from 'react'
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from '../../src/config';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();
        debugger;
        setLoading(true);

        const requestData = { email, password };
        axios.post(`${API_BASE_URL}/login`, requestData)
            .then((result) => {
                debugger;
                if (result.status === 200) {
                    setLoading(false);

                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem("user", JSON.stringify(result.data.result.user));
                    dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });
                    setLoading(false);
                    navigate('/addsale');

                }
                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);

                Swal.fire({
                    icon: "error",
                    title: error.response.data.error
                })

            })
    }

    return (
        <div className='page'>
            <h3 className='card-title mb-5  text-center text-uppercase pt-4 fw-bold'>login form</h3>
            {<div className='mx-auto form-container text-muted shadow-sm roundedp-3 lh-2 px-3'>
                {loading ? <div className='row'>
                    <div className='col-md-12 mt-3 text-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>

                    </div>
                </div> : ""}

                <form onSubmit={(e) => login(e)}>
                    <div className="mb-3">
                        <label htmlFor='email' className='form-label d-flex label' style={{ textAlign: "left" }}>Email</label>
                        <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className="form-control" id="email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label d-flex label">Password</label>
                        <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} className="form-control" id="pass" />
                    </div>
                    <div className='d-grid'>
                        <button type="submit" className="btn btn-primary mb-3" id='submit'>Submit</button>
                    </div>
                </form>
            </div>}
        </div>

    )
}

export default Login;