import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

const Login = (props) => {

    const {register,handleSubmit,formState:{errors}} = useForm();
    const [loginError,setLoginError] = useState('');
   



    return (
        <section className="text-gray-600  body-font">
          <div className="container px-10 pt-20 mx-auto flex flex-wrap items-center">
            <div className="lg:w-3/5 md:w-2/3 md:pr-16 lg:pr-0 pr-0">
              <h3 className="font-medium text-3xl text-slate-50">
                Your Courses in your hand
              </h3>
              <br></br>
              <p>
              Taking and Droping Courses has never been easier.
              </p>
              <div className="mt-10">
                <p className="text-slate-50">
                  Not Registered? <a href="/" className="text-blue-700 underline underline-offset-1" > Register Now</a>
                </p>
              </div>
            </div>
            <div className="lg:w-2/5 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
              <form className="w-full max-w-lg"
               onSubmit={handleSubmit((data)=>{
                console.log(data);
                axios.post('http://127.0.0.1:4000/api/user/login',data).then((res)=>{
                  console.log(res.data)
                  if(res.data){
                    window.sessionStorage.setItem("sid",res.data)
                    window.location.href="/home"
                    props.changeState()
                  }
                 }).catch((err)=>{
                   console.log(err.response.data)
                   setLoginError(err.response.data)
                 })
               })}
              
              >
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">
                      Student Number
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="grid-password" type="text" placeholder="111222"
                    {...register("studentNumber", {
                      required: 'Field Required'
                    })}
                    >
                    </input>
                    <p className="text-red-600 text-xs">{errors.studentNumber?.message}</p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                      Password
                    </label>
                    <input 
                    {...register("password", {
                      required: 'Field Required'
                    })}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************">
                    </input>
                    <p className="text-red-600 text-xs">{errors.password?.message}</p>
                  </div>
                </div>
                <p className="text-red-600 text-s mt-0 mb-4">{loginError}</p>
                <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-8 mt-1 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                 Login
                </button>
              </form>
             
      
            </div>
          </div>
        </section>
      )
}

export default Login