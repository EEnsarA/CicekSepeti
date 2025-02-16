import React , { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/userSlice';
import { getUserRoles } from '../redux/authSlice';


function AdminUserList() {

    const dispatch = useDispatch();
    const {users} = useSelector((store)=>store.userList);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    useEffect(()=>{
        dispatch(getAllUsers());
        dispatch(getUserRoles());
    },[]);


  return (
    <>  
    <h2 className='cartTitle'>Kullanıcı Listesi</h2>
    <div style={{padding:"10px"}}>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Kullanıcı Id</th>
                        <th>İsim</th>
                        <th>Email</th>
                        <th>Ayarlar</th>
                    </tr>
                </thead>
                <tbody style={{height:"120px"}}>
                    {users.map((u)=>(
                        
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.firstName} {u.lastName}</td>
                            <td>{u.email}</td>
                            <td style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}>
                                <button className='dealerButtons'>edit</button>
                                <button className='dealerButtons' style={{backgroundColor:"#ba3127"}}>delete</button>
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

export default AdminUserList