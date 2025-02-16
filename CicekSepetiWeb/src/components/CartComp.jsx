import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import { PiShoppingCartLight } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { BsShopWindow } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { calculateCart, calculateCartDb, getCartByUserId, getCartProducts } from '../redux/cartSlice';
import CartProduct from './CartProduct';
import CartDbProduct from './CartDbProduct';


function CartComp() {

    const dispatch = useDispatch();

    const {isAuth,currentUser} = useSelector((store)=>store.authInfo);
    const {amountCart,cartProducts,amountCartDb} = useSelector((store)=>store.cartList);
    const [discount,setDiscount] = useState("");    
    const [cart, setCart] = useState([]);
   
    useEffect(()=>{
        if(localStorage.getItem("cart"))
        {   
            setCart(JSON.parse(localStorage.getItem("cart")));
            dispatch(calculateCart());      
        }
        if(isAuth)
        {
            dispatch(getCartByUserId(currentUser.id));
            dispatch(getCartProducts(currentUser.id));
        }    
    },[])
    
    var amount = 0;
    if(cartProducts)
    {
        cartProducts.map((prd)=>{
            amount += prd.price * prd.productCount;
        })
    }


  return (
    <>
        <div style={{marginTop:"2rem"}}>

            <h2 className='cartTitle'>
                <span>
                    <PiShoppingCartLight style={{marginRight:"6px",marginBottom:"11px"}} size={32} color='#51b549'/>
                </span>
                Sepetim
            </h2>
            <Grid container spacing={2}>
                <Grid size={9}>
                    <div style={{display:"flex",justifyContent:"flex-start",flexDirection:"column"}}>
                        <div style={{marginBottom:"2px"}}>
                            <div style={{display:"flex",paddingLeft:"10px",minHeight:"38px",backgroundColor:"#edf1f2",alignItems:"center"}}>
                                <div style={{padding:"5px 0",fontSize:"16px"}}>
                                    <span>
                                        <Link to={"/"} style={{textDecoration:"none",color:'#3597ec'}}>
                                            <span style={{marginRight:"5px",height:"20px"}}><BsShopWindow style={{marginBottom:"3px"}} color='#3597ec' size={15}/></span>
                                            <span>Çiçeksepeti</span>
                                            <IoIosArrowForward style={{marginLeft:"4px"}} size={14} color='#3597ec' />
                                        </Link>
                                    </span>
                                </div>  
                            </div>
                        </div>
                        {cart && cart.map((prd)=>
                            <CartProduct product={prd} key={(Math.random())*999999} />
                        )}
                        {isAuth && cartProducts && cartProducts.map((prd)=>
                            <CartDbProduct product={prd} key={prd.productId}/>
                        )}  
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{padding:"0"}}>
                        <div style={{padding:"0 17px"}}>
                            <button className='buyButton'>Satın Al</button>
                        </div>
                    </div>
                    <div style={{border:"2px solid #edf1f2",padding:"0 10px 2px",marginBottom:"20px",borderRadius:"6px"}}>
                        <h3 className='orderSummary'>Sipariş Özeti</h3>
                        <div style={{borderRadius:"6px",padding:"15px 10px 0",marginTop:"0",backgroundColor:"#edf1f2",marginBottom:"10px"}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div>
                                    {isAuth && cartProducts ?
                                        <p>{`Ara Toplam (${cartProducts.length} ürün)`}</p>
                                    :   <p>{`Ara Toplam (${cart.length} ürün)`}</p>
                                    }  
                                </div>
                                <div>
                                    {isAuth && cartProducts ?
                                        <p>{`${amount},00 TL`}</p>
                                    :   <p>{`${amountCart},00 TL`}</p>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",width:"100%",margin:"5px",marginBottom:"10px"}}>
                            <input type="text" className='dicountCouponInput' value={discount} placeholder='Kodu Girin' onChange={(e)=>{setDiscount(e.target.value)}} />
                            <button className='discountCouponButton'>Kullan</button>
                        </div>
                        <div style={{borderRadius:"6px",padding:"15px 10px 0",marginTop:"0",backgroundColor:"#edf1f2",marginBottom:"10px"}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div>
                                    <p>Toplam:</p>
                                </div>
                                <div>
                                {isAuth && cartProducts ?
                                        <p>{`${amount},00 TL`}</p>
                                    :   <p>{`${amountCart},00 TL`}</p>
                                }
                                </div>
                            </div>
                        </div>
                    </div>

                </Grid>
            </Grid>
        </div>

    </>
  )
}

export default CartComp