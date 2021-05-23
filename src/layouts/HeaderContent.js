import React from "react"
import { useSelector } from "react-redux"
import FilterForm from "./FilterForm"

const HeaderContent= (props) =>{ 
    const Gstate = useSelector(s=> s.entities.acudata)
    const acuDatA = Gstate.acudata
    return(
        <>
        <div style={{textAlign:"center"}}>
                 <p style={{color:"red"}}>{acuDatA.top}</p>
                 <h1>{acuDatA.heading}</h1>
             </div>

            <section className="blog-grid padding-top-40px padding-bottom-50px">
                 <div className="container">
                     <div className="row" style={{alignItems:"center"}}>
                        
                         <div className="col-lg-5" style={{textAlign:"center"}}>
                             <img 
                                src={acuDatA.image} 
                                className="imgstyle"
                                 />
                         </div>
                        
                         <div className="col-lg-6"  style={{marginTop:"4em", fontSize:"20px"}}>
                            
                             <p>{acuDatA.description1}</p><br />
                             <p>{acuDatA.description2}</p><br />
                             <p>{acuDatA.description3}</p><br />
                             <p>{acuDatA.description4}</p><br />
                             <p>{acuDatA.description5}</p><br />
                            
                             <br />
                             <hr />
                             <br />

                             <FilterForm filtername={acuDatA.filtername}/>

                         </div>
                     </div>
                </div>
            </section>
        </>
    )
}

export default HeaderContent;