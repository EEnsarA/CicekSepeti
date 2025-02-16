import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

function Loading() {

  const {loading} = useSelector((store)=>store.authInfo);
  const {loadingProducts} = useSelector((store)=>store.productList);
  const {loadingCategories} = useSelector((store)=>store.categoryList);

  const [open,setOpen] = useState(false);
  
  
    if(loading | loadingProducts | loadingCategories)
      {
        setOpen[true];
      }
      else{
        setOpen[false];
      }


  return (
    <Backdrop
    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    open={loadingCategories}
    >
    <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loading