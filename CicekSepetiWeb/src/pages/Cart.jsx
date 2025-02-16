import React from 'react'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from "@mui/material";
import CartComp from '../components/CartComp';
import Footer from '../components/Footer';

function Cart() {
    
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
                    <div>
                        <CartComp/>           
                    </div>
                </Container>
                <div style={{marginTop:"5rem"}}>
                    <Footer/>
                </div>
            </ThemeProvider> 
        </>
    )
}

export default Cart