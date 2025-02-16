import React, { useEffect } from 'react'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from "@mui/material";
import HomeSlider from '../components/HomeSlider';
import HomeCards from '../components/HomeCards';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';


function Home() {

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
        <Container maxWidth="xl" style={{marginTop : "10px"}}>
          <HomeSlider/>
          <HomeCards/>
        </Container>
        <div style={{marginTop:"2rem"}}>
            <Footer/>
        </div>
      </ThemeProvider> 
    </>
  )
}   

export default Home