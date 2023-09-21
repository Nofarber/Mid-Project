import { useState } from "react"
import { useCredentials } from "../../context"
import { useFurniture } from "../../furnitureContext"
import ProductCard from '../ProductCard/ProductCard'
import { useEffect } from "react"
import './HomePage.css'
import { useNavigate } from "react-router-dom"

function HomePage() {
  const nav = useNavigate()
  const credintials = useCredentials()
  const isConnected = credintials.isConnected
  if (!isConnected) {
    return(
      <div>
          <h1>.</h1>
        <h1>back home</h1>
        <button onClick={()=>nav('/')}>home</button>
        </div>
      )
    } else {
      const furnitureData = useFurniture()
      const furniture = furnitureData.furniture
      const users = credintials.users
      const currentUser = credintials.currentUser
      const [orderedByNew,setOrderedByNew] = useState([])
      const infoOfConnected = users.find((value=>value.userName === currentUser.userName))
      const orderedFurniture = infoOfConnected.pickUpTime
      const [favoritesFurniture,setFavoritesFurniture] = useState([])
      
      useEffect(()=>{NewestFurniture(),WhoIsConnected()},[])
      
      function NewestFurniture(){
        setOrderedByNew(furniture.sort((a,b)=>a.publishDate < b.publishDate ? 1 : -1).slice(0,4))
      }
      
      function WhoIsConnected() {
        const tempFurnArray = []
        const fav = infoOfConnected.favorites
  fav.forEach((favTitle)=>{
    furniture.some((e)=>e.furnitureID===favTitle) && tempFurnArray.push(furniture.find((e)=>e.furnitureID === favTitle))
  })
  setFavoritesFurniture(tempFurnArray)
  console.log(tempFurnArray)
}



return (
  <>
    <div id="entire-page">
    <h1>!ברוך הבא</h1>
    <h2>:ראה מה חדש במחסן</h2>
    <div className="new-products">{orderedByNew.map((value,i)=><ProductCard key={i} info={value}/>)}</div>
    <button onClick={()=>console.log(orderedFurniture)}>test</button>
    <h2>:המועדפים שלך</h2>
    <div>{favoritesFurniture.map((value,i)=><ProductCard key={i} info={value}/>)}</div> 
    <h2>:הזמנות</h2>
    <ul>
      {orderedFurniture.map((value,i)=>
        <h2 key={i}>{`${value.title} - ${value.year}/${value.month}/${value.date}`}</h2>
      )}
    </ul>
    </div> 
    </>
  )
}}
export default HomePage