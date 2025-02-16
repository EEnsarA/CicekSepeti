import React from 'react'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from "@mui/material";
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByDealerId } from '../redux/userSlice';
import DealerPageComp from '../components/DealerPageComp';
import { useEffect } from 'react';
import { BsShopWindow } from "react-icons/bs";

function DealerPage() {

    const dispatch = useDispatch();

    const{dealerProducts} = useSelector((store)=>store.userList);
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    var userId;
    var dealerName;
    if(currentUser){
        userId = currentUser.id;
        dealerName = currentUser.fullName

    }

    useEffect(()=>{
        if(userId)
        {
            dispatch(getProductsByDealerId(userId));
        }      
    },[])
    


    const customContainer = createTheme({
        components: {
        MuiContainer:{
            styleOverrides:{
            root:{
                "&.MuiContainer-maxWidthXl":{
                maxWidth:"1500px",
                }
            }
            }
        }
        }
    });
    return (
        <>
        <ThemeProvider theme={customContainer}>
          <Container maxWidth="xl" style={{marginTop : "2rem"}}>
            <div style={{padding:"12px 16px",borderRadius:"6px",margin:" 0 0 16px",backgroundColor:"#555",color:"#fff",display:"flex",alignItems:"center",width:"1500px"}}>
                <div style={{width:"60px",height:"60px",backgroundColor:"#fff",border:"1px solid #f2f2f2",borderRadius:"50%",display:"inline-flex",justifyContent:"center",marginRight:"16px",alignItems:"center"}}>
                    <span><BsShopWindow color='#555' fontSize={34}/></span>
                </div>
                <h2 style={{fontSize:"20px",lineHeight:"24px",marginTop:"5px"}}>{dealerName}</h2>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",padding:"0",width:"1500px"}}>
                {dealerProducts.map((p)=>
                    <DealerPageComp product={p} key={p.Id}/>
                )}
            </div>
          </Container>
          <div style={{marginTop:"2rem"}}>
              <Footer/>
          </div>
        </ThemeProvider> 
      </>
    )
}

export default DealerPage