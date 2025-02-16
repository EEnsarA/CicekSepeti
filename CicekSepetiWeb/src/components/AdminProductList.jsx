import React , { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/productSlice';


function AdminProductList() {
    const dispatch = useDispatch();
    const {products} = useSelector((store)=>store.productList);

    useEffect(()=>{
        dispatch(getAllProducts());
    },[])
    console.log(products);
    return (
    <>  
        <h2 className='cartTitle'>Ürün Listesi</h2>
        <div style={{padding:"10px"}}>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Ürün Id</th>
                            <th>Ürün Resmi</th>
                            <th>Ürün İsmi</th>
                            <th>Ürün Fiyat</th>
                            <th>Ürün Stok</th>
                            <th>Ürün Aktiflik</th>
                            <th>Ayarlar</th>
                        </tr>
                    </thead>
                    <tbody style={{height:"120px"}}>
                        {products.map((products)=>(
                            
                            <tr key={products.id}>
                                <td>{products.id}</td>
                                <td><img className='listProductImage' src={"../images/" + ((products.image).split(","))[0] } alt=""/></td>
                                <td>{products.productName}</td>
                                <td>{products.price}.00 TL</td>
                                <td>{products.stock} Adet</td>
                                <td>{products.isActive ? "açık" : "kapalı"}</td>
                                <td>
                                    <button className='dealerButtons'>Edit</button>
                                    <button className='dealerButtons' style={{backgroundColor:"#ba3127"}}>Delete</button>
                                </td>
                            </tr>          
                        )    
                        )}
                    </tbody>

                </table>
            </div>
    </>
    )
}

export default AdminProductList