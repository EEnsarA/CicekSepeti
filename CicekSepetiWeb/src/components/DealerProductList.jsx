import React , { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByDealerId } from '../redux/userSlice';

function DealerProductList() {
    const dispatch = useDispatch();

    const{dealerProducts} = useSelector((store)=>store.userList);
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    var userId;
    if(currentUser){
        userId = currentUser.id;
    }

    useEffect(()=>{
        if(userId)
        {
            dispatch(getProductsByDealerId(userId));
        }      
    },[])
    

  return (
    <>  
        {dealerProducts ?
        <>
            <h2 className='cartTitle'>Ürün Listesi</h2>
                <div style={{padding:"10px"}}>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Ürün Resmi</th>
                                <th>Ürün İsmi</th>
                                <th>Fiyat</th>
                                <th>Stok</th>
                                <th>Aktiflik</th>
                                <th>Ayarlar</th>
                            </tr>
                        </thead>
                        <tbody style={{height:"120px"}}>
                            {dealerProducts.map((p)=>(
                                
                                    <tr key={p.productId}>
                                        <td><img className='listProductImage' src={"../images/" + ((p.image).split(","))[0] } alt="" /></td>
                                        <td>{p.productName}</td>
                                        <td>{p.price},00 TL</td>
                                        <td>{p.stock} Adet</td>
                                        <td>{p.isActive ? "açık" : "kapalı"}</td>
                                        <td style={{}}>
                                            
                                            <button className='dealerButtons'>Edit</button>
                                            <button className='dealerButtons' style={{backgroundColor:"#ba3127"}}>Delete</button>
                                            
                                        </td>
                                    </tr>
                                 
                            ))}
                        </tbody>
                    </table>    
                </div>
                <div style={{display:"flex",justifyContent:"flex-end"}}>  
                </div>
        </>   
        :""}   
    </>
  )
}

export default DealerProductList