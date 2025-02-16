import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { RegisterFormSchema } from '../Schemas/RegisterFormSchema';
import { RiErrorWarningFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { IoWarning } from "react-icons/io5";


function Register() {

    const {registeredUser,loading,errMessage} = useSelector((store)=>store.authInfo);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    function refreshPage() {
        setTimeout(()=>{
            window.location.reload(false);
        }, 50);
        console.log('page to reload');
    }


    const submit = async(values,action)=>{
        const user = {
            "firstName" : values.firstName,
            "lastName" : values.lastName,
            "email" : values.email,
            "password" : values.password,
            "confirmPassword" : values.confirmPassword
        };
        if(!loading)
        {
            console.log("sayfa yükleniyor..");
        }
        await dispatch(register(user));
        if(registeredUser)
        {
            console.log(registeredUser);
            navigate("/user/" + "üye-girişi");
            refreshPage();
        }
        action.resetForm();
    }

    const {values,errors,handleChange,handleSubmit} = useFormik({
        initialValues:{
            email: "",
            password:"",
            confirmPassword:"",
            firstName:"",
            lastName:"",
        },
        validationSchema : RegisterFormSchema,
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
                <label color='#171717'>Ad</label>
            </div>
            <div className='loginEmailDiv'>
                <input type="text" placeholder='Adınız' id='firstName' className='loginEmailInput' value={values.firstName} onChange={handleChange}/>
            </div>
            {errors.firstName && <p className='registerError'><RiErrorWarningFill size={12} style={{margin:"3px"}} />{errors.firstName}</p>}
            <div style={{marginTop:"18px",width:"100%"}}>
                <label color='#171717'>Soyad</label>
            </div>
            <div className='loginEmailDiv'>
                <input type="text" placeholder='Soyadınız' id='lastName' className='loginEmailInput' value={values.lastName} onChange={handleChange}/>
            </div>
            {errors.lastName && <p className='registerError'><RiErrorWarningFill size={12} style={{margin:"3px"}}/>{errors.lastName}</p>}
            <div style={{marginTop:"18px",width:"100%"}}>
                <label color='#171717'>E-posta</label>
            </div>
            <div className='loginEmailDiv'>
                <input type="email" placeholder='E-posta adresiniz' id='email' className='loginEmailInput' value={values.email} onChange={handleChange}/>
            </div>
            {errors.email && <p className='registerError'><RiErrorWarningFill size={12} style={{margin:"3px"}}/>{errors.email}</p>}
            <div style={{marginTop:"18px",width:"100%"}}>
                <label color='#171717'>Şifre</label>
            </div>
            <div className='loginEmailDiv'>
                <input type="password" placeholder='Şifre' id='password' className='loginEmailInput' value={values.password} onChange={handleChange}/>
            </div>
            {errors.password && <p className='registerError'><RiErrorWarningFill size={12} style={{margin:"3px"}} />{errors.password}</p>}
            <div style={{marginTop:"18px",width:"100%"}}>
                <label color='#171717'>Şifre Tekrarı</label>
            </div>
            <div className='loginEmailDiv'>
                <input type="password" placeholder='Şifre tekrarı' id='confirmPassword' className='loginEmailInput' value={values.confirmPassword} onChange={handleChange}/>
            </div>
            {errors.confirmPassword && <p className='registerError'><RiErrorWarningFill size={12} style={{margin:"3px"}} />{errors.confirmPassword}</p>}
            <button type='submit' className='loginButton'>
                Üye Ol
            </button>
        </form>   
    </div> 
)
}

export default Register