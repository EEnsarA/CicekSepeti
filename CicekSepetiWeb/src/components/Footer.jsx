import React from 'react'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from "@mui/material";

function Footer() {

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
    <div style={{backgroundColor:"#FAFAFA",width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <h5 style={{marginTop:"20px"}}>Çiçeksepeti Mobil Uygulamamızı İndirin</h5>
        <div style={{width:"100%",height:"190px",margin:"5px",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
            <div style={{width:"220px",height:"190px",marginTop:"10px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <a style={{margin:"5px"}} href="https://play.google.com/store/apps/details?id=com.ciceksepeti.ciceksepeti" target='_blank'><img src="../images/google-store.webp" alt="" width={180} height={53} /></a>
                <a style={{margin:"5px"}} href="https://apps.apple.com/tr/app/%C3%A7i%C3%A7eksepeti-online-al%C4%B1%C5%9Fveri%C5%9F/id723715907" target='_blank'><img src="../images/apple-store.webp" alt="" width={180} height={53} /></a>
                <a style={{margin:"5px"}} href="https://appgallery.huawei.com/#/app/C102041891" target='_blank'><img src="../images/huawei-store.webp" alt="" width={180} height={53}/></a>
            </div>
            <div style={{display:"flex",justifyContent:"row",marginLeft:"10px"}}>
                <img src="../images/qrcode-cs-new.webp" alt="" width={100} height={100}/>
                <p style={{width:"115px",height:"54px",margin:"10px"}}>Uygulamamızı QR kod ile hemen indirin.</p>
            </div>
        </div>
        <div style={{marginTop:"10px"}}>
          <p>Çiçeksepeti - Proje Ödevi - Ensar Atıcı</p>
        </div>

    </div>
    
  )
}

export default Footer