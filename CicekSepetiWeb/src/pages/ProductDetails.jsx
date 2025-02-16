import React, { useEffect } from 'react'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from "@mui/material";
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import ProductCards from '../components/ProductCards';
import ProductDetailsCard from '../components/ProductDetailsCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../redux/productSlice';
import { setLoading } from '../redux/authSlice';

function ProductDetails() {
    const params = useParams();
    const prodId = params.prdId;

    const {product,loading} = useSelector((store)=>store.productList);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!loading)
        {
          console.log("sayfa yükleniyor..");
        }
        dispatch(getProductById(prodId));
    },[]);

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
           <ProductDetailsCard product = {product}/>
      </Container>
      <div style={{marginTop:"2rem"}}>
          <Footer/>
      </div>
    </ThemeProvider> 
  </>
  )
}

export default ProductDetails