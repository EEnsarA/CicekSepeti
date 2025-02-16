import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer';
import Register from '../components/Register';
import Login from '../components/Login';

function RegisterLogin() {

    const params = useParams();

    const [regLogType,setRegLogType] = useState("");
  
    
    useEffect(()=>{
        if(params.registerLogin != null)
        {
            setRegLogType(params.registerLogin);
        }
    },[])


  return (
    <>
    <div className="container-sm" style={{display:"flex",alignItems:"center",justifyContent:"center",height:"800px",width:"100%",padding:"32px"}} >
        <div style={{border:"1px solid #eaeaea",borderRadius:"8px",width:"450px",height:"750px"}}>
            <div style={{padding:"18px",width:"100%",height:"100%"}}>
                    <div style={{width:"100%",height:"40px",paddingBottom:"3px",display:"flex",flexDirection:'row'}}>
                        <button className="loginRegisterButton" onClick={()=>{setRegLogType("üye-girişi")}}>
                            <div>
                                Giriş Yap
                            </div>
                        </button>
                        <button className="loginRegisterButton" onClick={()=>{setRegLogType("yeni-üyelik")}}>
                            <div>
                                Üye Ol
                            </div>
                        </button>
                    </div>
                    {regLogType == "üye-girişi" && <Login/>}
                    {regLogType == "yeni-üyelik" && <Register/>}               
                                     
            </div>
        </div>
    </div>
    <Footer/>
    </>  
  )
}

export default RegisterLogin