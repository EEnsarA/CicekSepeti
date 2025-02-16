import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeProductToCart } from '../redux/cartSlice';
import { TiDeleteOutline } from "react-icons/ti";

function CartProduct(props) {
    const product = props.product;
    var images = (product.image).split(",");


    const dispatch = useDispatch();
    const navigate = useNavigate();


    function refreshPage() {
        setTimeout(()=>{
            window.location.reload(false);
        }, 50);
        console.log('page to reload');
    }

    const removePrdToCart = ()=>{  
        console.log(product);
        dispatch(removeProductToCart(product));
        refreshPage();
    }

    return (
        <div style={{marginBottom:"2px",borderRadius:"4px",backgroundColor:"#edf1f2",borderTopLeftRadius:"0",borderTopRightRadius:"0",padding:"10px 15px",position:"relative"}}>
            <Link onClick={removePrdToCart} style={{textDecoration:"none",position:"absolute",top:"0",right:"0",padding:"7px"}}>
                <TiDeleteOutline color='#555' size={18} />
            </Link>
            <div>   
                <h3 style={{textAlign:"left",fontSize:"16px",padding:"15px 10px"}}>{product.count} Adet - {product.productName}</h3>
                <div style={{padding:"5px 10px 15px",display:"flex",flexDirection:"row"}}>
                    <Link to={`/`+product.id} style={{textDecoration:"none"}}>
                        <img className='cartProductImage' src={"../images/" + images[0] }alt="" width={100} height={110} />
                    </Link>
                    <div style={{display:"flex",flexDirection:"column",fontSize:"14px",paddingLeft:"15px",justifyContent:"space-around"}}>
                        <span>Teslimat Tarihi:</span>
                        <span>27 Aralık, Cuma, 09:00 - 12:00 </span>
                        <span style={{color:"#51b549",fontSize:"14px"}}>Ücretsiz Teslimat</span>
                        <span>{product.price},00 TL</span>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default CartProduct