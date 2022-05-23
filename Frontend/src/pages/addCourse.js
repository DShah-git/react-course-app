import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'


const AddCourse = () => {

    const [courses, setCourses] = useState([])
    const [sections, setSections] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState();
    const [selectedSection, setSelectedSection] = useState();
    const [step2,setStep2] = useState('Select a Course First');
    const [error,setError] = useState('');

    useEffect(() => {
        const sid = window.sessionStorage.getItem("sid")
        if (!sid) return

        axios.get('http://127.0.0.1:4000/api/courses/courses', {
            headers: {
                Authorization: sid
            }
        }).then((result) => {
            setCourses(result.data);
            console.log(result.data);
        }).catch((err) => {
            console.log(err)
        });
    }, [])

    const registerCourse = ()=>{
        var data = {
           courseId : courses[selectedCourse]._id,
           section:selectedSection,
           courseCode: courses[selectedCourse].courseCode,
           courseName:courses[selectedCourse].courseName
        }
        const sid = window.sessionStorage.getItem("sid")
        console.log(data);
        axios.post('http://127.0.0.1:4000/api/courses/registercourse',data,{
            headers: {
                Authorization: sid
            }
        }).then((result) => {
            window.location.href = "/home"
        }).catch((err) => {
            console.log(err.response.data)
            setError(err.response.data);
        });

    }

    return (
        <div className='text-blue-400'>
            <p className='text-2xl'>Follow these steps to register a course</p>
            <div className='mt-10'>
                <p className='text-lg'> <span className='pl-3 pr-2 py-1 bg-blue-400 text-xl text-slate-900 rounded-full mr-3'> 1 </span> Select a Course </p>
                <select 
                onChange={(e)=>{
                    const i = e.target.value
                    setSelectedCourse(i)
                    setSections(courses[i].availableSections)
                    setStep2('Select a Section')
                }}
                class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out mt-5 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                    <option selected>Select a course</option>
                    {courses.map((course,index) => {
                        return (
                            <option value={index}>{course.courseName} - {course.courseCode}</option>
                        )
                    })}

                </select>
            </div>
            <div className='mt-20'>
                <p className='text-lg'> <span className='pl-3 pr-2 py-1 bg-blue-400 text-xl text-slate-900 rounded-full mr-3'> 2 </span> Select a Available Section</p>
                <select 
                onChange={(e)=>{
                    const i = e.target.value
                    setSelectedSection(i);
                }}
                class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out mt-5 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                    <option selected>{step2}</option>
                    {sections.map((section) => {
                        return (
                            <option value={section}>{section}</option>
                        )
                    })}

                </select>
            </div>
            <div>
                <p className=' mt-10 text-red-400 text-xl'> {error}</p>
            </div>
            <div className='mt-5 float-right w-48' >
                <button className='bg-blue-400 text-slate-900 p-2 rounded-lg'
                onClick={()=>{registerCourse()}}
                > Register Course </button>
            </div>

        </div>
    )
}

export default AddCourse