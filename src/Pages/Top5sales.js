import React, { useEffect, useState } from 'react'
import '../App.css';
import axios from 'axios';
//import { API_BASE_URL } from '../../src/config';
//import Swal from 'sweetalert2';
const Top5sales = (props) => {
  const url = "http://localhost:4000/top5sale";
  const [products, setProducts] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      setProducts(data);
    } catch (error) {
      console.log(error);

    }


  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className='page'>
      <h3 className='card-title mb-5  text-center text-uppercase pt-4 fw-bold'>TOP 5 SALES</h3>
      {
        <div className="table-responsive bg-light w-100 h-100">
          <table className="table table-bordered table-striped mt-5">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Product Name</th>
                <th scope="col">Sales Id:</th>

                <th scope="col">Quantity</th>
                <th scope="col">Sale Amount</th>

              </tr>
            </thead>
            <tbody>

              {products.map((product, index) => {
                return (
                  <tr key={index}>
                    <th scope='col'>{index + 1}</th>
                    <td >{product.productName}</td>
                    <td >{product._id}</td>
                    <td>{product.quantity}</td>
                    <td>{product.saleAmount}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      }</div>
  )
}

export default Top5sales;