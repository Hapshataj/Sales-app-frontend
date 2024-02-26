import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../src/config';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
const Add = () => {
    const navigate = useNavigate();
    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    const [productName, setproductName] = useState("")
    const [quantity, setquantity] = useState("")
    const [saleAmount, setsaleAmount] = useState("")
    const [loading, setLoading] = useState(false);
    const add = (event) => {
        event.preventDefault();
        setLoading(true);

        debugger;
        const requestData = { productName, quantity, saleAmount };
        axios.post(`${API_BASE_URL}/addsale`, requestData, CONFIG_OBJ)
            .then((result) => {
                debugger;
                if (result.status === 201) {
                    setLoading(false);

                    Swal.fire({
                        icon: "success",
                        title: "Product Saved Successfully"
                    })
                    navigate("/todaytotal");
                }
                setproductName('');
                setquantity('');
                setsaleAmount('');
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
            <h3 className='card-title mb-5  text-center text-uppercase pt-4 fw-bold'>ADD SALE ENTRY</h3>
            {<div className='mx-auto form-container text-muted shadow-sm roundedp-3 lh-2 px-3 '>
                {loading ? <div className='row'>
                    <div className='col-md-12 mt-3 text-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>

                    </div>
                </div> : ""}

                <form onSubmit={(e) => add(e)}>
                    <div className="mb-3">
                        <label htmlFor='ProductName' className='form-label d-flex label' style={{ textAlign: "left" }}>Product Name</label>
                        <input type="text" placeholder='eg.ProductA' value={productName} onChange={(ev) => setproductName(ev.target.value)} className="form-control" id="productname" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Quantity" className="form-label d-flex label">Quantity</label>
                        <input type="number" placeholder='eg.1 or 100' value={quantity} onChange={(ev) => setquantity(ev.target.value)} className="form-control" id="quantity" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Amount" className="form-label d-flex label">Amount</label>
                        <input type="number" placeholder='Enter in dollers($)' value={saleAmount} onChange={(ev) => setsaleAmount(ev.target.value)} className="form-control" id="amount" required />

                    </div>
                    <div className='d-grid'>
                        <button type="submit" className="btn btn-primary mb-3" id='submit'>Submit</button>
                    </div>
                </form>
            </div>
            }
        </div>
    )
}

export default Add;