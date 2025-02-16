import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


function HomeSlider() {


  const options = {
    responsive:{
      600:{
        items:9
      },
      1000:{
        items:12
      }
    },
    nav: true,
    dots: false
  }



  return (
    <OwlCarousel className='owl-theme'  loop margin={5} {...options}>
      <div className='review item' style={{width:"119"}}>
          <div>
            <Link className='sliderLink'>
              <img src="../images/Kokina-tur.png" alt="" style={{width:"95px",height:"95"}}/>
              <span style={{color:'#555555',fontSize:"12px",display:"flex",textAlign:"center"}}>Kokina</span>
            </Link>
          </div>    
      </div>
      <div className='review item' style={{width:"119"}}>
          <Link className='sliderLink'>
              <img src="../images/GurmeLezzetler-tur.png" alt="" style={{width:"95px",height:"95"}}/>
              <span style={{color:'#555555',fontSize:"12px",display:"flex",textAlign:"center"}}>Gurme Lezzetler</span>
          </Link>
      </div>
      <div className='review item' style={{width:"119"}}>
        <Link className='sliderLink'>
            <img src="../images/Ayn-G-n-Hediye-Seti-tur.jpg" alt="" style={{width:"95px",height:"95"}}/>
            <span style={{color:'#555555',fontSize:"12px",display:"flex",textAlign:"center"}}>Aynı Gün Hediye Seti</span>
        </Link>
      </div>
      <div className='review item' style={{width:"119"}}>
        <Link className='sliderLink'> 
            <img src="../images/-ok-Satanlar-tur.png" alt="" style={{width:"95px",height:"95"}}/>
            <span style={{color:'#555555',fontSize:"12px",display:"flex",textAlign:"center"}}>Çok Satanlar</span>
        </Link>
      </div>
      <div className='review item' style={{width:"119"}}>
        <Link className='sliderLink'>
            <img src="../images/Do-um-G-n-i-ekleri-tur.png" alt="" style={{width:"95px",height:"95"}}/>
            <span style={{color:'#555555',fontSize:"12px",display:"flex",textAlign:"center"}}>Doğum Günü Çiçekleri</span>
        </Link>
      </div>
      <div className='review item' style={{width:"119"}}>
      <Link className='sliderLink'>
            <img src="../images/GurmeLezzetler-tur.png" alt="" style={{width:"95px",height:"95"}}/>
            <span style={{color:'#555555',fontSize:"12px",display:"flex",textAlign:"center"}}>Doğum Günü Lezzetleri</span>
        </Link>
      </div>
      <div className='review item' style={{width:"119"}}>
      <Link className='sliderLink'>
            <img src="../images/Tasar-m-Taze-i-ekler-tur.png" alt="" style={{width:"95px",height:"95"}}/>
            <span style={{color:'#555555',fontSize:"12px",display:"flex",textAlign:"center"}}>Tasarım Taze Çiçekler</span>
        </Link>
      </div>
      <div className='review item' style={{width:"119"}}>
      <Link className='sliderLink'> 
            <img src="../images/Saks-i-ekleri-tur.png" alt="" style={{width:"95px",height:"95"}}/>
            <span style={{color:'#555555',fontSize:"12px",display:"flex",textAlign:"center"}}>Saksı Çiçekleri</span>
        </Link>
      </div>
      <div className='review item' style={{width:"119"}}>
      <Link className='sliderLink'>
            <img src="../images/Y-ld-n-m-i-ekleri-tur.png" alt="" style={{width:"95px",height:"95"}}/>
            <span style={{color:'#555555',fontSize:"12px",display:"flex",textAlign:"center"}}>Yıldönümü Çiçekleri</span>
        </Link>
      </div>
      <div className='review item' style={{width:"119"}}>
        <Link className='sliderLink'>
            <img src="../images/Sevgiliye-i-ekler-tur.png" alt="" style={{width:"95px",height:"95"}}/>
            <span style={{color:'#555555',fontSize:"12px",display:"flex",textAlign:"center"}}>Sevgiliye Çiçekler</span>
        </Link>
      </div>
      <div className='review item' style={{width:"119"}}>
        <Link className='sliderLink'>
            <img src="../images/-z-r-i-ekleri-tur.png" alt="" style={{width:"95px",height:"95"}}/>
            <span style={{color:'#555555',fontSize:"12px",display:"flex",textAlign:"center"}}>Özür Çiçekleri</span>
        </Link>
      </div>
      <div className='review item' style={{width:"119"}}>
        <Link className='sliderLink'>
            <img src="../images/Y-ld-n-m-i-ekleri-tur.png" alt="" style={{width:"95px",height:"95"}}/>
            <span style={{color:'#555555',fontSize:"12px",display:"flex",textAlign:"center"}}>Yeni Bebek Çiçekleri</span>
        </Link>
      </div>
      <div className='review item' style={{width:"119"}}>
        <Link className='sliderLink'> 
            <img src="../images/400-ekler-tur.png" alt="" style={{width:"95px",height:"95"}}/>
            <span style={{color:'#555555',fontSize:"12px",display:"flex",textAlign:"center"}}>Çiçekler</span>
        </Link>
      </div>
      <div className='review item' style={{width:"119"}}>
        <Link className='sliderLink'>
            <img src="../images/Lilyum-Zambak-tur.png" alt="" style={{width:"95px",height:"95"}}/>
            <span style={{color:'#555555',fontSize:"12px",display:"flex",textAlign:"center"}}>Lilyum & Zambak</span>
        </Link>
      </div>
      <div className='review item' style={{width:"119"}}>
        <Link className='sliderLink'>
            <img src="../images/G-ller-tur.png" alt="" style={{width:"95px",height:"95"}}/>
            <span style={{color:'#555555',fontSize:"12px",display:"flex",textAlign:"center"}}>Güller</span>        
        </Link>
      </div>
    </OwlCarousel>  
  )
}

export default HomeSlider