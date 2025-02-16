import React , { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDealers } from '../redux/userSlice';

function AdminDealerList() {

    const dispatch = useDispatch();
    const {dealers} = useSelector((store)=>store.userList);
    
    useEffect(()=>{
        dispatch(getDealers());
    },[]);

  return (
    <>  
        <h2 className='cartTitle'>Satıcı Listesi</h2>
        <div style={{padding:"10px"}}>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Satıcı Id</th>
                        <th>Satıcı İsmi</th>
                        <th>Email</th>
                        <th>Ürün Id</th>
                        <th>Ayarlar</th>
                    </tr>
                </thead>
                <tbody style={{height:"120px"}}>
                    {dealers.map((d)=>(
                        <tr key={d.productId}>
                            <td>{d.dealerId}</td>
                            <td>{d.dealerName}</td>
                            <td>{d.dealerEmail}</td>
                            <td>{d.productId}</td>
                            <td style={{display:"flex",alignItems:"center"}}>
                                <button className='dealerButtons'>edit</button>
                                <button className='dealerButtons' style={{backgroundColor:"#ba3127"}}>delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    </>

  )
}

export default AdminDealerList