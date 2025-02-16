import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import { TbSquarePercentage } from "react-icons/tb";
import { FaTruckFast } from "react-icons/fa6";
import { SiTicktick } from "react-icons/si";
import { PiLineVerticalThin } from "react-icons/pi";
import { MdFavoriteBorder } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { FaCircleInfo } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { addCartDb,addProductToCart, calculateCart, calculateCartDb } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

function ProductDetailsCard(props) {
    const product = props.product;
    const {isAuth,currentUser} = useSelector((store)=>store.authInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [images,setImages] = useState([""]);

    useEffect(()=>{
        if(product.image != null)
        {
            setImages((product.image).split(","))
        }
        
    },[product.image]);


    const addCart = ()=>{
        if(isAuth)
        {
            const cart = {
                "userId" : currentUser.id,
                "productId":product.id
            } 
            dispatch(addCartDb(cart));
            dispatch(calculateCartDb());
        }else{
            const payload  = {
                id:product.id,
                productName : product.productName,
                image : product.image,
                isActive : product.isActive,
                price:product.price,
                stock:product.stock,
                count : 1,
            }
            console.log(payload);
            dispatch(addProductToCart(payload));
            dispatch(calculateCart());
        }
        navigate("/sepetim");
        navigate(0);
    }


  return (
    <div style={{width:"100%",height:"660px",marginTop:"2rem"}}>
        <Grid container spacing={2}>
            <Grid size={6} >
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <button style={{textDecoration:"none",width:"fit-content",height:"fit-content",border:"2px solid #51b549",cursor:"pointer",textAlign:"center",borderRadius:"4px",padding:"0",backgroundColor:"transparent"}}>
                        <div style={{}}>
                            <img  src={"../images/" + images[0] } width={101} height={110} style={{border:"1px solid #edf1f2",borderRadius:"4px"}} />   
                        </div>
                    </button>
                    <div style={{borderRadius:"4px",overflow:"hidden",marginRight:"10px"}}>
                        <img  src={"../images/" +  images[1]} width={580} height={640} style={{border:"0",cursor:"pointer"}} />    
                    </div>
                </div>
            </Grid>
            <Grid size={6}>
                <div>
                    <div className='prdDetailsTitleAndPriceDiv'>
                        <h3 style={{minHeight:"53px"}}> 
                            <span className='prdDetailTitle'>{product.productName}</span>
                        </h3>
                        <div className='prdDetailsPriceDiv'>
                            <div style={{fontSize:"35px"}}>{product.price}</div>
                            <div style={{fontSize:"17.5px"}}>,00 TL</div>
                            <div style={{fontSize:"14px",color:"#51b549",marginLeft:"3px"}}>& Ücretsiz Teslimat</div>
                        </div>
                    </div>
                    <div>
                           <div style={{display:"flex",alignItems:"flex-end",margin:"5 0 10px",height:"26px"}}> 
                                <span><TbSquarePercentage fontSize={18} color='#51b549'/></span>
                                <span style={{color:"#555",fontFamily:"Nunito",fontSize:"14px",marginLeft:"5px"}}>6 Aya Varan Taksit</span>
                                <span style={{marginLeft:"10px",marginRight:"10px"}}><PiLineVerticalThin fontSize={18} color="#555" /></span>
                                <span><FaTruckFast fontSize={18} color='#51b549' /></span>
                                <span style={{color:"#555",fontFamily:"Nunito",fontSize:"14px",marginLeft:"5px"}}>Her Gün Aynı Gün Teslimat</span>
                                <span style={{marginLeft:"10px",marginRight:"10px"}}><PiLineVerticalThin fontSize={18} color="#555" /></span>
                                <span><SiTicktick fontSize={18} color='#51b549'/></span>
                                <span style={{color:"#555",fontFamily:"Nunito",fontSize:"14px",marginLeft:"5px"}}>Ücretsiz Teslimat</span>
                           </div> 
                           <div style={{marginTop:"20px",display:"flex",flexDirection:"row"}}>
                                <div style={{display:"flex",width:"46%"}} >
                                        <button className='orderButton' onClick={addCart}>
                                            <span style={{fontSize:"21px"}}>Sipariş Ver</span>
                                        </button>
                                </div>
                                <div style={{display:"flex",width:"54%"}}>
                                        <button className='favButton'>
                                            <a href=""><MdFavoriteBorder style={{fontSize:"36px",color:"#ef265c"}} /></a>
                                        </button>
                                </div>
                           </div>
                           <div style={{display:'flex',padding:"7px 6px",borderRadius:"5px",backgroundColor:"#eaf5ff",width:"100%",marginTop:"10px"}}>
                                <span style={{padding:"7.5px",color:"#3597ec"}}>
                                    <span>
                                        <IoCameraOutline size={18} style={{marginRight:"5px",marginBottom:"3px"}}/>
                                    </span>
                                    <span>
                                        <b>Siparişin yola çıkmadan gör ! </b>
                                        Hazırlanan siparişinizin fotoğrafını önce siz görür ve onaylarsınız.
                                    </span>
                                </span>
                           </div>
                           <div style={{marginTop:"20px",border:"1px solid #eaeaea",borderRadius:"4px",padding:"10px",fontSize:"14px",color:"#555",display:"flex"}}>
                                <span>
                                    <FaCircleInfo size={16} style={{margin:"1px 5px 0 0"}}/>
                                </span>
                                <span>
                                    Yukarıda verilen teslimat süreleri tahmini olup mevzuattaki yasal sürelerin aşılmaması koşuluyla sapmalar yaşanabilmektedir.
                                </span>
                           </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default ProductDetailsCard