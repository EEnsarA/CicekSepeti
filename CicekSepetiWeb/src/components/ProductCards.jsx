import React from 'react'
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import { BiSolidTruck } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

function ProductCards(props) {

    const product = props.product;
    var images = (product.image).split(",");

  return (
        
    <Link to={"/" + product.id} onClick={()=>{}} className='linkProductCards'>
        <div className='imgDivProductCards'>
            <img className='imgProductCard' src={"../images/" + images[0] } alt="" />
        </div>
        <div style={{marginTop:"12px",minHeight:"36px",width:"100%"}}>
            <span><BiSolidTruck color='#3CA735' size={12}/></span>
            <span className='teslimatSpanProductCards'>Bugün / Ücretsiz Teslimat</span>
        </div>
        <div style={{maxWidth:"300px"}}>
            <span className='prdNameSpanProductCards'>{product.productName}</span>
        </div>
        <div style={{marginTop:"12px"}}>
            <span style={{fontSize:"18px",color:"#171717",fontWeight:600}}>{product.price},00TL</span>
            <div>
                
            </div>
        </div>
    </Link>
  )
}

export default ProductCards