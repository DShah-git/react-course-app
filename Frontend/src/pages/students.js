import React,{useEffect,useState} from 'react'
import axios from 'axios';

const Students = () => {

    const [students, setstudents] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:4000/api/profile/all").then((result) => {
                setstudents(result.data)
                console.log(result.data)

            }).catch((err) => {
                console.log(err.response.data)
            });
    }, []);

    return (
    <div>
        <div className='flex flex-wrap gap-5 '>
                    {
                        students.map((student, index) => {
                            return (
                                <div key={index} className='h-32 text-blue-400 bg-cyan-900 h-40 rounded-lg pt-4 px-4'> 
                                   <p className='text-xl'> {student.fName} {student.lName}</p>
                                   <p className='text-xl opacity-60'><a href={'mailto:'+student.email}> {student.email} </a></p>  
                                   <p className="text-md mt-4 float-right bg-slate-900 text-slate-50 px-2 py-1 rounded-full"> {student.courses.length} courses </p>     
                                </div>
                                
                            )
                        })
                    }
                </div>
    </div>
  )
}

export default Students