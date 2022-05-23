
import './navigation.css'
import logo from '../../assets/Courseta.png'

const navigation = (props) => {
  if (props.isLoggedIn){
   return LoggedIn(props)
  }
  else{
    return notLoggedIn(props)
  }
}


function LoggedIn(props){
  return (
    <nav className="bg-gray-900 text-slate-200">
    <div className="py-5 px-20 mx-auto flex justify-between">
    <div className=" hover:text-sky-900">
        <a href="/"  >
          <img className="rounded-lg h-12 w-12" src={logo} alt="" /> 
        </a>
      </div>
      <div className="flex gap-10 mx-10">
      <a href="/home" type="button" className="flex gap-2 items-center hover:text-slate-300">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
      </a>
      <a href="/allStudents" type="button" className="flex gap-2 items-center hover:text-slate-300">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" fill="currentColor" className="bi bi-person-badge" viewBox="0 0 16 16">
        <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"/>
      </svg>
      </a>
      <button  
      onClick={()=>{
        window.sessionStorage.removeItem("sid")
        window.location.href = "/login"
      }}
      type="button" className="flex gap-2 items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      </button>     
      </div>
    </div>
    <hr className="mx-auto w-90" ></hr>
  </nav>
  )
}

function notLoggedIn(props){
  return (
  <nav className="bg-gray-900 text-slate-200">
    <div className="py-5 px-20 mx-auto flex justify-between">
      <div className="my-auto hover:text-sky-900">
        <a className='text-2xl ' href="/"  >
          <img className="rounded-lg h-12 w-12" src={logo} alt="" /> 
        </a>
      </div>
      <div>
      <a href="/login" type="button" className="flex gap-2 my-auto py-auto pt-2 px-10 items-center text-lg hover:text-sky-900">
        Login
      </a>     
      </div>
    </div>
    <hr className="mx-auto w-90"></hr>
  </nav>
)
}


export default navigation