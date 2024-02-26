import '../App.css';
//import { API_BASE_URL } from '../config';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Todaytotalrevenue = () => {
  const url = "http://localhost:4000/todaytotal";
  const [sum, setSum] = useState([]);

  const Revenue = async () => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      setSum(data);
    } catch (error) {
      console.log(error);

    }


  }
  useEffect(() => {
    Revenue();
  }, [])

  return (
    <div className='page'>
      {
        <div className='mx-auto container'>
          {sum.map((product, index) => {
            return (
              <div>
                <h3 className='card-title mb-5  text-center text-uppercase pt-4 fw-bold'>TODAY'S REVENUE IS {product.sum}</h3>

              </div>
            )
          })
          }

        </div>
      }
    </div>
  )
}

export default Todaytotalrevenue;