import React from 'react';
import { useDispatch } from 'react-redux';
import {logout} from '../store/authslice';
import authService from '../authservice/auth';
const Logoutbtn = () => {
    const dispatch=useDispatch();
    const loginSubmit= async ()=>{
        await authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
 <>
 <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={loginSubmit}>Logout</button>
 </>
  )
}

export default Logoutbtn