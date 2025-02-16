import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { RegisterFormSchema } from '../Schemas/RegisterFormSchema';
import { RiErrorWarningFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LoginFormSchema } from "../Schemas/LoginFormSchema";
import { login } from '../redux/authSlice';
import { IoWarning } from "react-icons/io5";

function Login() {

    const navigate = useNavigate();

    const {isAuth,token,loading,errMessage} = useSelector((store)=>store.authInfo);
    const dispatch = useDispatch();

    function refreshPage() {
        setTimeout(()=>{
            window.location.reload(false);
        }, 1000);
        console.log('page to reload');
    }

    const logout = ()=>{
        localStorage.clear();
        navigate("/")
        navigate(0);
    }

    const submit = (values,action)=>{
        const user = {  
            "email" : values.email,
            "password" : values.password 
        }
        if(!loading)
        {
            console.log("sayfa yükleniyor..");
        }
        dispatch(login(user));
        action.resetForm();   
    }

    if(isAuth)
    {
        navigate("/");
        refreshPage();
    }


    const {values,errors,handleChange,handleSubmit} = useFormik({
        initialValues:{
            email: "",
            password:"",
        },
        validationSchema : LoginFormSchema,
        onSubmit : submit
    });
           
    
  return (
    <div style={{width:"100%",height:"400px"}}>  
        <form onSubmit={handleSubmit}>
            {errMessage.message &&
             <div className='loginAlert'>
                <span style={{}}><IoWarning style={{marginRight:"5px"}} size={18} color='#e64e41'/>
                </span>
                {errMessage.message}
             </div> 
             } 
            <div style={{marginTop:"24px",width:"100%"}}>
                <label color='#171717'>E-posta</label>
            </div>
            <div className='loginEmailDiv'>
                <input type="email" placeholder='E-posta adresiniz' id='email' className='loginEmailInput' value={values.email}  onChange={handleChange}/>
            </div>
            {errors.email && <p className='registerError'><RiErrorWarningFill size={12} style={{margin:"3px"}}/>{errors.email}</p>}
            <div style={{marginTop:"24px",width:"100%"}}>
                <label color='#171717'>Şifre</label>
            </div>
            <div className='loginEmailDiv'>
                <input type="password" id='password' placeholder='Şifre' className='loginEmailInput' value={values.password} onChange={handleChange}/>
            </div>
            {errors.password && <p className='registerError'><RiErrorWarningFill size={12} style={{margin:"3px"}} />{errors.password}</p>}
            <Link style={{width:"100%",color:"#003da6",marginTop:"15px",textDecoration:"none",display:"flex",alignItems:"flex-end",justifyContent:"flex-end"}}>
            <span>Şifremi Unuttum</span> 
            </Link>
            <button type='submit' className='loginButton'>
                Giriş Yap
            </button>
        </form> 
    </div>
  )
}

export default Login