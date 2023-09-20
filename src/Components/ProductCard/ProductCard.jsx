import { useState , useEffect} from 'react'
import './ProductCard.css'


function ProductCard({info}) {



 const changeImgOut =  ({target}) =>{ 
  target.style.height = '200px'
target.style.width = '150px'
setSrc(info.photo[0])
 }

  return (
    <div className='entire-card'
    style={{backgroundImage:`url(${info.photo[0]})`,backgroundRepeat: 'no-repeat',backgroundSize:"contain"
     }}>
      <p>{info.title} </p>
       
    </div>
  )
}
export default ProductCard