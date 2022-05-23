import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  
  const {register,handleSubmit,formState:{errors}} = useForm();
  const [registerError,setRegisterError] = useState();

  return (
    <section className="text-gray-600 body-font ">
      <div className="container px-10 mx-auto flex flex-wrap items-center" >
        <div className="lg:w-1/2 md:w-1/2 md:pr-16 lg:pr-0 pr-0 lg:text-left md:text-center sm:text-center">
          <h3 className="font-medium text-3xl text-slate-50">
            Your Courses in your hand
          </h3>
          <br></br>
          <p>
            Taking and Droping Courses has never been easier.
          </p>
          <div className="mt-10">
            <p className="text-slate-50">
              Already Registered? <a href="/login" className="text-blue-700 underline underline-offset-1" >Login Now</a>
            </p>

          </div>
        </div>
        <div className="lg:w-1/2 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0  ">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
          <form className="w-full max-w-lg"
          onSubmit={handleSubmit((data)=>{
            console.log(data)

            axios.post('http://127.0.0.1:4000/api/user/register',data).then((res)=>{
             console.log(res.data)
             if(res.data==="Registered"){
               window.location.href = "/login"
             }
            }).catch((err)=>{
              console.log(err.response.data)
              setRegisterError(err.response.data)
            })
          })}
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                  First Name
                </label>
                {/* First Name */}
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                 id="grid-first-name" type="text" placeholder="Jane"
                  // name="fName" ref={register}
                  {...register("fName", {
                    required: 'Field Required'
                  })}
                 >
                </input>
                <p className="text-red-600 text-xs">{errors.fName?.message}</p>
                
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                  Last Name
                </label>
                {/* Last Name */}
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="grid-last-name" type="text" placeholder="Doe"
                {...register("lName", {
                  required: 'Field Required'
                })}
                >
                </input>
                <p className="text-red-600 text-xs">{errors.lName?.message}</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                  Email
                </label>
                {/* Email  */}
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                id="grid-email" type="email" placeholder="JaneDoe@email.com"
                {...register("email", {
                  required: 'Field Required'
                })}
                >

                </input>
                <p className="text-red-600 text-xs">{errors.email?.message}</p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-student-number">
                  student Number
                </label>
                {/* Student# */}
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                 id="grid-student-number" type="text" placeholder="123456"
                 {...register("studentNumber", {
                  required: 'Field Required'
                })}
                 >

                </input>
                <p className="text-red-600 text-xs">{errors.studentNumber?.message}</p>
                <p className="text-gray-600 text-xs mt-2">Remember for login</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">
                  Address
                </label>
                {/* Address */}
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="grid-address" type="text" placeholder="123 DreamLand"
                {...register("address")}
                >
                </input>

              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                  Password
                </label>
                {/* password */}
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="grid-password" type="password" placeholder="******************"
                {...register("password", {
                  required: 'Field Required and must be 6 characters',
                })}
                >
                </input>
                <p className="text-red-600 text-xs">{errors.password?.message}</p>
                <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                
              </div>
            </div>
            <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-8 mt-1 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Sign Up
            </button>
            <p className="text-red-600 text-s  mt-4">{registerError}</p>
          </form>
         
  
        </div>
      </div>
    </section>
  )
}

export default Register