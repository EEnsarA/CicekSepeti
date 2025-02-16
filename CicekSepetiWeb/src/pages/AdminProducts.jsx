import React from 'react'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from "@mui/material";
import Footer from '../components/Footer';
import AdminProductList from '../components/AdminProductList';


function AdminProducts() {

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
            <AdminProductList/>
          </Container>
          <div style={{marginTop:"2rem"}}>
              <Footer/>
          </div>
        </ThemeProvider> 
    </>
    )
}

export default AdminProducts