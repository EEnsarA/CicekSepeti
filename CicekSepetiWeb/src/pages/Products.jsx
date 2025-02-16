import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByCatId } from '../redux/productSlice';
import Container from '@mui/material/Container';
import Footer from '../components/Footer';
import { createTheme, ThemeProvider } from "@mui/material";
import ProductCards from '../components/ProductCards';
import { setLoading } from '../redux/authSlice';


function Products() {

  const params = useParams();
  const catId = params.catid;

  const {loading,products} = useSelector((store)=>store.productList)
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!loading)
    {
      console.log("sayfa yükleniyor..");
    }
    dispatch(getProductsByCatId(catId));
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
    <div>
        <ThemeProvider theme={customContainer}>
            <Container maxWidth="xl" style={{marginTop : "10px"}}>
                <div style={{display:"flex",flexWrap:"wrap",padding:"0",width:"1500px"}}>
                  {products.map((p)=>
                      <ProductCards product={p} key={p.id}/>
                  )}
                </div>
            </Container>
            <div style={{marginTop:"2rem"}}>
                <Footer/>
            </div>
      </ThemeProvider> 

    </div>
  )
}

export default Products