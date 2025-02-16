import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';


function HomeCards() {
  return (
    <div>
        <div style={{display:'flex',alignItems:"center"}}>
            <Grid container spacing={2}>
                <Grid size={6}>
                    <div style={{width:"715px",height:"304px",display:"flex",justifyContent:"flex-start"}}>
                        <Link>
                            <img src="../images/Yilbasina-Ozel-Cicekler-tur.jpg" alt="" width={715} height={304}/>
                        </Link>
                    </div>
                </Grid>
                <Grid size={6}>
                    <div>
                    <Link>
                        <img src="../images/Cok-Satanlar-Cicek-Bonnyfood-tur.jpg" alt="" width={730} height={304}/>
                    </Link>
                    </div>
                </Grid>
            </Grid>
        </div>

        <div style={{marginTop:"15px"}}>
            <Grid container spacing={3}>
                <Grid size={4}>
                    <div>
                        <Link>
                            <img src="../images/Kokina-Ponsetyalar-tur.jpg" alt="" width={480} height={200}/>
                        </Link>
                    </div>
                </Grid>
                <Grid size={4}>
                    <div>
                        <Link>
                            <img src="../images/Dogum-Gunu-Surprizleri-tur.jpg" alt="" width={480} height={200} />
                        </Link>
                    </div>
                </Grid>
                <Grid size={4}>
                    <div >
                        <Link>
                            <img src="../images/Yilbasina-Ozel-Gurme-Lezzetler-tur.jpg" alt="" width={480} height={200}/>
                        </Link>
                    </div>
                </Grid>
            </Grid>
        </div>

        <div style={{marginTop:"15px"}}>
            <Grid container spacing={2}>
                    <Grid size={6}>
                        <div style={{width:"715px",height:"304px",display:"flex",justifyContent:"flex-start"}}>
                            <Link>
                                <img src="../images/Yilbasina-Ozel-Yenilebilir-Cicekler-tur.jpg" alt="" width={715} height={304}/>
                            </Link>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div>
                        <Link>
                            <img src="../images/Yeni-Is-Cicekleri-tur.jpg" alt="" width={730} height={304}/>
                        </Link>
                        </div>
                    </Grid>
            </Grid>
        </div>

        <div style={{marginTop:"15px"}}>
            <Grid container spacing={3}>
                    <Grid size={4}>
                        <div>
                            <Link >
                                <img src="../images/Yilbasina-Ozel-Hediye-Setleri-tur.jpg" alt="" width={480} height={200}/>
                            </Link>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div>
                            <Link>
                                <img src="../images/Tasarim-Taze-Cicekler-tur.jpg" alt="" width={480} height={200} />
                            </Link>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div >
                            <Link>
                                <img src="../images/Dubai-Kremali-Kekler-tur.jpg" alt="" width={480} height={200}/>
                            </Link>
                        </div>
                    </Grid>
            </Grid>
        </div>

        <div style={{marginTop:"15px"}}>
            <Grid container spacing={3}>
                    <Grid size={4}>
                        <div>
                            <Link >
                                <img src="../images/Saksi-Bitkiler-tur.jpg" alt="" width={480} height={200}/>
                            </Link>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div>
                            <Link>
                                <img src="../images/Gecmis-Olsun-Cicekleri-tur.jpg" alt="" width={480} height={200} />
                            </Link>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div >
                            <Link>
                                <img src="../images/Kirmizi-Guller-tur.jpg" alt="" width={480} height={200}/>
                            </Link>
                        </div>
                    </Grid>
            </Grid>
        </div>

        <div style={{marginTop:"15px"}}>
            <Grid container spacing={2}>
                    <Grid size={6}>
                        <div style={{width:"715px",height:"304px",display:"flex",justifyContent:"flex-start"}}>
                            <Link>
                                <img src="../images/Orkide-Cesitleri-tur.jpg" alt="" width={715} height={304}/>
                            </Link>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div>
                        <Link>
                            <img src="../images/Papatya-tur.jpg" alt="" width={730} height={304}/>
                        </Link>
                        </div>
                    </Grid>
            </Grid>
        </div>

        <div style={{marginTop:"15px"}}>
            <Grid container spacing={3}>
                    <Grid size={4}>
                        <div>
                            <Link >
                                <img src="../images/Buket-Cicekler-tur.jpg" alt="" width={480} height={200}/>
                            </Link>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div>
                            <Link>
                                <img src="../images/Teraryum-tur.jpeg" alt="" width={480} height={200} />
                            </Link>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div >
                            <Link>
                                <img src="../images/400-TL-Alti-Cicekler-tur.jpg" alt="" width={480} height={200}/>
                            </Link>
                        </div>
                    </Grid>
            </Grid>
        </div>
    </div>
  )
}

export default HomeCards