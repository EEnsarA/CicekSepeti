import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import {Link, useNavigate} from "react-router-dom"
import { Button, createTheme, setRef, ThemeProvider } from "@mui/material";
import { GiTwirlyFlower } from "react-icons/gi";
import { GiCottonFlower } from "react-icons/gi";
import { IoCartOutline } from "react-icons/io5";
import { PiShoppingCartLight } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { PiTruckLight } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { getAllCategories } from '../redux/categorySlice';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavBarCategories from './NavBarCategories';
import { setLoading } from '../redux/authSlice';
import { jwtDecode } from "jwt-decode";
import { setCurrentUser, setIsAuth } from '../redux/authSlice';
import Badge from '@mui/material/Badge';
import { calculateCart, calculateCartDb, getCartProducts } from '../redux/cartSlice';

function NavBar() {
    const navigate = useNavigate();

    const {categories,loadingCategories} = useSelector((store)=>store.categoryList)
    const {isAuth,currentUser} = useSelector((store)=>store.authInfo)
    const {cart,cartProducts}  = useSelector((store)=>store.cartList);
    const [role,roleSet] = useState("");

    const dispatch = useDispatch();

    function refreshPage() {
        setTimeout(()=>{
            window.location.reload(false);
        }, 1000);
        console.log('page to reload');
    };

    
    useEffect(()=>{
        if(!loadingCategories)
        {   
            console.log("sayfa yükleniyor..");
        }
        dispatch(getAllCategories());   
    },[])


    useEffect(()=>{
      const token = String(JSON.parse(localStorage.getItem("token")));
      const isAccess = localStorage.getItem("isAuth");
      if(token && isAccess)
      {
        const decoded = jwtDecode(token);
        const user = {
          id : decoded.nameid,
          fullName : decoded.unique_name,
          role : decoded.role,
        }
        dispatch(setCurrentUser(user));
        dispatch(setIsAuth(isAccess));
      }
    },[]);
    useEffect(()=>{
        if(currentUser)
        {
            roleSet(currentUser.role);
            dispatch(getCartProducts(currentUser.id));
            dispatch(calculateCartDb());
        }
    },[currentUser])


    const logout = ()=>{
        localStorage.clear();
        navigate("/")
        navigate(0);
    }

   
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
    <>
    <div style={{backgroundColor : "rgb(225, 248, 231)" , height:"60px",color:"black",display:"flex",alignItems:"center"}}>
        <ThemeProvider theme={customContainer}>
            <Container maxWidth="xl" style={{height:"100%"}}>
                <Grid container spacing={2}>
                     <Grid size={8}>
                        <div style={{height:"60px",display:"flex",justifyContent:"flex-start",flexDirection:"row"}}>
                            <div style={{height:"60px",display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
                                <button className='navbarTopButton'>
                                    <span>
                                        <img src="../images/navbarTopImg.webp" style={{width:"105px",height:"14px"}}/>
                                    </span>
                                    <span style={{color:"gray",fontSize:"10px",width:"116px",marginTop:"2px"}}>Çiçek ve Gurme Lezzetler</span>
                                </button> 
                            </div>
                            <div style={{display:"flex",alignItems:"flex-end",marginBottom:"8px",justifyContent:"center"}}>
                                <button className='navbarTopButton2'>
                                        <img src="../images/navbarTopImg2.webp"  style={{width:"110px",height:"16px"}}/> 
                                </button>
                            </div>
                            <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
                                <img src="../images/navbarTopMidImg.jpg" alt="" />
                            </div>
                        </div>  
                    </Grid>
                    <Grid size={4}>
                        <div style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                            <Link className='navBarTopLink' >Kurumsal Hediye</Link>
                            <Link className='navBarTopLink' style={{marginLeft:"2rem"}} >Yardım</Link>
                            <Link className='navBarTopLink' style={{marginLeft:"2rem"}}>Çiçeksepeti'nde Satış Yap</Link>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    </div>
    <div style={{height:"86px",display:"flex",alignItems:"center"}}>   
        <ThemeProvider theme={customContainer}>
            <Container maxWidth="xl">
                <Grid container spacing={2} >       
                        <Grid size={8} >
                            <div style={{display:"flex",alignItems:"center",height:"100%",justifyContent:"flex-start"}} >
                                <Link to="/" className='link' style={{fontSize:"32px",color:"#003DA6",fontFamily:"Parkinsans",display:"flex",alignItems:"center"}}>
                                    <img src="../images/appLogo.webp" alt="" style={{width:"200px",height:"42px"}}/>
                                </Link>
                                <div className='searchBar'>
                                    <input type="text" className='searchBarInput' placeholder='Marka, ürün veya kategori ara' />
                                    <div style={{width:"50px",height:"100%",backgroundColor:"#3CA735",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                        <Link  className='link'>
                                            <IoSearchOutline size={28} color='white'/>
                                        </Link>
                                    </div>
                                </div>
                            </div>        
                        </Grid>
                        
                        <Grid size={4}>
                            <div style={{display:"flex",alignItems:"center",height:"100%",justifyContent:"flex-end"}}>
                                {isAuth == false || role == "user" ?
                                    <Link  className='link'>
                                        <div style={{display:"flex",alignItems:"center"}}>
                                            <PiTruckLight size={28}/><span style={{marginLeft:"5px"}}>Sipariş Takibi</span>
                                        </div>
                                    </Link>
                                :""}
                                <div style={{marginLeft:"2rem",display:"flex",alignItems:"center"}}>
                                    {isAuth == false &&
                                        <div className="dropdown">
                                            <a className="btn btn-none dropdown-toggle"  onClick={()=>{navigate("/user/" + "üye-girişi"),navigate(0)}} role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" >
                                                <IoPersonOutline size={24}/>
                                                <span style={{marginLeft:"5px"}}>Üyelik</span>
                                            </a>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    <li><a className="dropdown-item" onClick={()=>{navigate("/user/" + "üye-girişi"),navigate(0)}}>Üye Girişi</a></li>
                                                    <li><a className="dropdown-item" onClick={()=>{navigate("/user/" + "yeni-üyelik"),navigate(0)}}>Üye Ol</a></li>
                                                </ul>
                                                
                                        </div>
                                    }
                                    {role == "user" &&
                                        <>
                                            <div className="dropdown">
                                                <a className="btn btn-none dropdown-toggle"  onClick={()=>{navigate(),navigate(0)}} role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" >
                                                    <IoPersonOutline size={24}/>
                                                    <span style={{marginLeft:"5px"}}>Hesabım</span>
                                                </a>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    <li><a className="dropdown-item" onClick={()=>{navigate(),navigate(0)}}>Siparişlerim</a></li>
                                                    <li><a className="dropdown-item" onClick={()=>{navigate(),navigate(0)}}>Favorilerim</a></li>
                                                    <li><a className="dropdown-item" onClick={()=>{navigate(),navigate(0)}}>Üyelik Bilgilerim</a></li>
                                                    <li><a className="dropdown-item" onClick={()=>{logout()}}>Çıkış Yap</a></li>
                                                </ul>
                                            </div>
                                        </>
                                    }
                                    {role == "admin" &&
                                       <>
                                            <div className="dropdown">
                                                <a className="btn btn-none dropdown-toggle"  onClick={()=>{navigate(),navigate(0)}} role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" >
                                                    <IoPersonOutline size={24}/>
                                                    <span style={{marginLeft:"5px"}}>Hoşgeldin Admin</span>
                                                </a>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    <li><a className="dropdown-item" onClick={()=>{navigate("/admin/users"),navigate(0)}}>Tüm Kullanıcılar</a></li>
                                                    <li><a className="dropdown-item" onClick={()=>{navigate("/admin/dealers"),navigate(0)}}>Tüm Satıcılar</a></li>
                                                    <li><a className="dropdown-item" onClick={()=>{navigate("/admin/products"),navigate(0)}}>Tüm Ürünler</a></li>
                                                    <li><a className="dropdown-item" onClick={()=>{logout()}}>Çıkış Yap</a></li>
                                                </ul>
                                            </div>
                                        </>
                                    }
                                    {role == "dealer" &&
                                       <>
                                            <div className="dropdown">
                                                <a className="btn btn-none dropdown-toggle"  role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" >
                                                    <IoPersonOutline size={24}/>
                                                    <span style={{marginLeft:"5px"}}>Hoşgeldin {currentUser.fullName}</span>
                                                </a>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    <li><a className="dropdown-item" onClick={()=>{navigate("/dealer/page"),navigate(0)}}>Mağaza Sayfası</a></li>
                                                    <li><a className="dropdown-item" onClick={()=>{navigate("/dealer/products"),navigate(0)}}>Ürünlerim</a></li>
                                                    <li><a className="dropdown-item" onClick={()=>{navigate(),navigate(0)}}>Satış Bilgileri</a></li>
                                                    <li><a className="dropdown-item" onClick={()=>{logout()}}>Çıkış Yap</a></li>
                                                </ul>
                                            </div>
                                        </>
                                    }
                                   
                                </div>
                                {isAuth && cartProducts ?
                                <Badge badgeContent={cartProducts.length} color="error">
                                    <div style={{width:"50px",height:"45px",backgroundColor:"#3CA735",borderRadius:"5px",display:"flex",justifyContent:"center",alignItems:"center",marginLeft:"2rem"}}> 
                                        <Link to={"/sepetim"}><PiShoppingCartLight size={32} color='white'/></Link>
                                    </div>
                                </Badge>
                                :
                                <Badge badgeContent={cart.length} color="error">
                                    <div style={{width:"50px",height:"45px",backgroundColor:"#3CA735",borderRadius:"5px",display:"flex",justifyContent:"center",alignItems:"center",marginLeft:"2rem"}}> 
                                        <Link to={"/sepetim"}><PiShoppingCartLight size={32} color='white'/></Link>
                                    </div>
                                </Badge>
                                }
                                
                            </div>
                            
                        </Grid>
                </Grid>              
            </Container>
        </ThemeProvider>
    </div>
        <hr style={{backgroundColor:"#EDF1F2",margin:"0",padding:"0",}}/>
        <ThemeProvider theme={customContainer}>  
            <Container maxWidth="xl" style={{height:"60px",color:"black",alignItems:"center"}}>        
                <div style={{display:"flex",alignItems:"center",height:"100%"}}>
                    <Breadcrumbs separator="|" style={{fontSize:"20px"}} maxItems={10} color="#EDF1F2">
                        {categories?.map((cat)=>
                            <NavBarCategories category={cat} key={cat.id}/>
                        )}
                   </Breadcrumbs> 
                </div>
            </Container>
        </ThemeProvider>   
        <hr style={{backgroundColor:"#EDF1F2",margin:"0",padding:"0",height:"2px"}}/>  
    </>
  )
}

export default NavBar