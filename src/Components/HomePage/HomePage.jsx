import { useState } from "react"
import { useCredentials } from "../../context"
import { useFurniture } from "../../furnitureContext"
import ProductCard from '../ProductCard/ProductCard'
import { useEffect } from "react"
import './HomePage.css'

function HomePage() {
const furnitureData = useFurniture()
const furniture = furnitureData.furniture
const credintials = useCredentials()
const users = credintials.users
const isConnected = credintials.isConnected
const [orderedByNew,setOrderedByNew] = useState([])
const [favorites,setFavorites] = useState([])

console.log(furniture);

useEffect(()=>{NewestFurniture(),console.log(orderedByNew);},[])

function NewestFurniture(){
setOrderedByNew(furniture.sort((a,b)=>a.publishDate < b.publishDate ? 1 : -1).slice(0,4))
}

function WhoIsConnected() {
  const infoOfConnected = users.find((value=>value.userName = isConnected))
  setFavorites([...infoOfConnected.favorites])
}


  return (
    <>
    <div id="entire-page">
    <h1>!ברוך הבא</h1>
    <h2>:ראה מה חדש במחסן</h2>
    <div className="new-products">{orderedByNew.map((value,i)=><ProductCard key={i} info={value}/>)}</div>
    <button onClick={()=>console.log(orderedByNew)}>test</button>
    <h2>:המועדפים שלך</h2>
    <div>{favorites.map((value,i)=><ProductCard key={i} info={value}/>)}</div>
    </div> 
    </>
  )
}
export default HomePage