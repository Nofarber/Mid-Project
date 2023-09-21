import { useFurniture } from "../../furnitureContext"
import ProductCard from '../ProductCard/ProductCard'
import './catalog.css'

function Catalog() {
const furnitureData = useFurniture()
const furniture = furnitureData.furniture

    return (
     <>
      <div className="entire-catalog">
        {furniture.map((value,i)=><ProductCard key={i} info={value}/>)}
        </div>
     </>
    )  
}
export default Catalog