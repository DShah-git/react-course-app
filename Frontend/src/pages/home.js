import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'




const Home = () => {


    const [userData, setUserData] = useState({})

    const [courseData, setCourseData] = useState([])

    const [editArray,setEditArray] = useState([]);

    const [section,setSections] = useState([]);

    const [selectedSection,setSelectedSection] = useState();

    useEffect(() => {
        const sid = window.sessionStorage.getItem("sid")
        if (sid) {

            axios.get("http://127.0.0.1:4000/api/profile/", {
                headers: {
                    Authorization: sid
                }
            }).then((result) => {
                setUserData(result.data) 
                var old  = []  
                for(let i=0;i<result.data.courses.length;i++){
                   old.push(false);
                }    
                setEditArray([...old])
                setCourseData(result.data.courses)
            }).catch((err) => {
                console.log(err)
            });
        }
        else {

            window.location.href = "/login"
        }

    }, [])



    function removeCourse(id) {
        const sid = window.sessionStorage.getItem("sid")
        console.log("clicked", id)
        axios.post("http://127.0.0.1:4000/api/courses/unregistercourse", { courseId: id }, {
            headers: {
                Authorization: sid
            }
        }).then((result) => {
            setUserData(result.data)
            setCourseData(result.data.courses)
        }).catch((err) => {
            console.log(err);
        });
    }

    function toggleEdit(index,id){
        var oldArray = editArray
        oldArray = oldArray.map(course => { return false} )
        oldArray[index] = true;
        console.log(id)
        axios.post("http://127.0.0.1:4000/api/courses/courseSection", {
            "courseId":id
        }).then((result) => {
           console.log(result)
           setSections(result.data)
          
        }).catch((err) => {
            console.log(err)
        }); 
        
        setEditArray([...oldArray])
    }


    function changeSection(index){
        const sid = window.sessionStorage.getItem("sid")
        axios.post("http://127.0.0.1:4000/api/courses/changeSection",{ index:index, section:selectedSection },{
            headers: {
                Authorization: sid
            }
        }).then((result) => {
            var ea = editArray;
            ea = ea.map(edit => {return false})
            setEditArray([...ea])
            console.log(result)
            setUserData(result.data)
            setCourseData(result.data.courses)
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className='w-full p-10 text-blue-400 flex divide-x-2 divide-blue-900'>
            <div className="w-2/6 ">
                <div className='w-24 h-24 rounded-full'>
                    <img className="rounded-lg" src={"https://avatars.dicebear.com/api/initials/" + userData.fName + userData.lName + ".svg?background=60A5FA"} alt="" />
                    
                </div>
                <div className='break-words mt-7 ml-1 text-wrap'>
                    <p className='text-2xl'> {userData.fName} {userData.lName}</p>
                    <p className='text-lg mt-2 opacity-80'> <a href={"mailto:" + userData.email}> {userData.email}</a> </p>
                    <p className='text-md mt-2 opacity-50'>  {userData.studentNumber} </p>
                    <p className='text-md mt-2 opacity-40'>  {userData.address} </p>
                </div>
            </div>
            <div className='w-4/6 py-16 px-16 '>
                <div className='flex flex-wrap gap-5 '>
                    {
                        courseData.map((course, index) => {
                            return (
                                <div key={index} className='bg-cyan-900 pb-4 rounded-lg pt-4 px-4'>
                                    <button onClick={() => { removeCourse(course.split(',')[0]) }} className='float-right hover:text-slate-900' >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <p className='text-3xl'> {course.split(',')[2]}</p>
                                    <p className='text-lg'> {course.split(',')[3]}</p>
                                    {editArray[index]===false &&
                                        <div>
                                            <button onClick={()=>{toggleEdit(index,course.split(',')[0])}}  className='float-left mt-5 rounded-full bg-slate-900 p-2 hover:bg-slate-700' >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                        </button>
                                        </div>
                                    }{editArray[index]===true &&
                                        <div>
                                            <select
                                              onChange={(e)=>{
                                                const i = e.target.value
                                                setSelectedSection(i);
                                            }} 
                                             className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out mt-5 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                            <option selected>Select a Section</option>
                                            {section.map((section) => {
                                                return (
                                                    <option value={section}>{section}</option>
                                                )
                                            })}

                                            </select>

                                            <div>
                                                <button onClick={()=>{changeSection(index)}}  className='float-left mt-5 rounded-lg bg-slate-900 p-2 hover:bg-slate-700' >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                    }
                                    <div className='bg-stone-900 mt-5 p-2 rounded-lg float-right ' style={{ width: "max-content" }}>
                                        Sec {course.split(',')[1]}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <button onClick={() => { window.location.href = "/addCourse" }} className='mt-5 bg-blue-400 text-slate-900 px-3 py-2 rounded-lg'> Add A Course </button>
                </div>

            </div>
        </div>
    )
}




export default Home