import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {

  const [currentState, setCurrentState] = useState("Sign Up");
  const {token, setToken, navigate} = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if(currentState === 'Sign Up') {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/register`, {name, email, password})
        if(response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('User registered successfully')
          setName('')
          setEmail('')
          setPassword('')
        } else {
          console.log('Error in signup user')
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/login`, {email, password})
        if(response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('User login successfully')
          setEmail('')
          setPassword('')
        } else {
          console.log('Error in login user')
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log('Error in onSubmitHandler in login jsx :: ', error)
      toast.error(error.message)
    }
  };

  useEffect(()=> {
    if(token) {
      navigate('/')
    }
  }, [token])

  useEffect(()=>{
    if(!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, [])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] m-auto sm:max-w-96 mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
        onChange={(e)=>setName(e.target.value)}
        value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
      onChange={(e)=>setEmail(e.target.value)}
      value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
      onChange={(e)=>setPassword(e.target.value)}
      value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}

export default Login;
