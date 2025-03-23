import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function Verify() {

    const { navigate, token, setCartItems } = useContext(ShopContext)
    const [searchParams, setSearchParama] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if(!token) {
                return null;
            }
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/order/verifystripe`, {success, orderId}, {headers: {token}})
            if(response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                navigate('/cart')
            }
        } catch (error) {
            console.log('Error in verifyPayment client verify :: ', error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])

  return (
    <div>
      
    </div>
  )
}

export default Verify
