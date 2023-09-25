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
      const [pickUpFurniture,setPickUpFurniture] = useState([])
      
      useEffect(()=>{NewestFurniture(),WhoIsConnected()},[])
      
      function NewestFurniture(){
        setOrderedByNew(furniture.sort((a,b)=>a.publishDate < b.publishDate ? 1 : -1).slice(0,4))
      }
      
      function WhoIsConnected() {
        const tempFurnArray = []
        const tempFurnArray2 = []
        const fav = infoOfConnected.favorites
  fav.forEach((favTitle)=>{
    furniture.some((e)=>e.furnitureID===favTitle) && tempFurnArray.push(furniture.find((e)=>e.furnitureID === favTitle))
  })
  orderedFurniture.forEach((orderedTitle)=>{
    furniture.some((e)=>e.title===orderedTitle.title) && tempFurnArray2.push(furniture.find((e)=>e.title === orderedTitle.title))
  })
  setFavoritesFurniture(tempFurnArray)
  setPickUpFurniture(tempFurnArray2)
}



return (
  <>
    <div id="entire-page">
      <div>
    <h1>!ברוך הבא</h1>
    <h2>:ראה מה חדש במחסן</h2>
      </div>
    <div className="product-container orders" id="new-container">
    <div className="new-products">{orderedByNew.map((value,i)=><ProductCard key={i} info={value}/>)}</div>
    </div>
    <div className="orders">
    <h2>:הזמנות</h2>
    <ul>
      {pickUpFurniture[0] && orderedFurniture.map((value,i)=>
      <li key={i} className="li-ordered">
        <p>
        <h2 >{`${value.title}`}</h2>
        <h3 >{`${value.year}/${value.month}/${value.date}`}</h3>
        <h3 >{`${pickUpFurniture[i].address}`}</h3>
        </p>
        <ProductCard info={pickUpFurniture[i]}/>
      </li>
      )}
    </ul>
    </div>
    <div>
    <button onClick={()=>console.log(orderedFurniture)}>test</button>
    <h2>:המועדפים שלך</h2>
    </div >
    <div className="product-container" id="fav-container">
    <div className="new-products">{favoritesFurniture.map((value,i)=><ProductCard key={i} info={value}/>)}</div> 
    </div>
    </div> 
    </>
  )
}}
export default HomePage