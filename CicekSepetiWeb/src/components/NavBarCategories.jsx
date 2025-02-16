import React from 'react'
import {Link} from "react-router-dom"


function NavBarCategories(props) {

    function refreshPage() {
        setTimeout(()=>{
            window.location.reload(false);
        }, 50);
        console.log('page to reload')
    }
    const cat = props.category;
    return (
            
        <Link to={("/" + cat.categoryName +"/"+ cat.id).replace(" ","-").toLowerCase()} onClick={()=>refreshPage()} className='linkCategory' style={{marginLeft:"10px"}} underline="hover" key={cat.id} color='black' >
            <span>{cat.categoryName}</span> 
        </Link>
    )
}   

export default NavBarCategories