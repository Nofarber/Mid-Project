import { useLocation, useNavigate } from "react-router-dom"
import { useFurniture } from "../../furnitureContext"
import { useEffect, useState } from "react"
import './productPage.css'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { useCredentials } from "../../context"


function ProductPage() {
  const location = useLocation()
  const info = location.state
  const [picIndex,setPicIndex]=useState(0)
  const [minutes,setMinutes]=useState(0)
  const [hours,setHours]=useState(16)
  const credentials = useCredentials()
  const users =credentials.users
  const connected = credentials.currentUser
  const isSomeOneConnected = credentials.isConnected
  const Navigate = useNavigate()
  const update = credentials.UpdateUser
  const [favButtonBG,setFavButtonBG]=useState('whitesmoke')

 useEffect(()=>{
      const indexOfUser = users.findIndex((user)=>user.userName === connected.userName)
      const text = users[indexOfUser].favorites;
      if (text.includes(info.furnitureID)){
        setFavButtonBG('whitesmoke')
      } else{
        setFavButtonBG('#00802D')
 }},[])
  
  function FindCurrentUser (){
    if (credentials.isConnected){
    const tempUsersArray = users
    const indexOfUser = tempUsersArray.findIndex((user)=>user.userName === connected.userName)
    tempUsersArray[indexOfUser].pickUpTime? tempUsersArray[indexOfUser].pickUpTime = [...tempUsersArray[indexOfUser].pickUpTime, selectedDate]: tempUsersArray[indexOfUser].pickUpTime = [selectedDate]; 
    update([...tempUsersArray])
    Navigate('/confirmOrder')}
    else{
      return alert('You need to sign-in in order to claim a donation.')
    }
  }

  const AddToFavorites=()=>{
    if (credentials.isConnected){
      const tempUsersArray = users
      const indexOfUser = tempUsersArray.findIndex((user)=>user.userName === connected.userName)
      const text = users[indexOfUser].favorites;
      if (text.includes(info.furnitureID)){
        tempUsersArray[indexOfUser].favorites? tempUsersArray[indexOfUser].favorites = [...tempUsersArray[indexOfUser].favorites.filter((v)=>v!== info.furnitureID)]: tempUsersArray[indexOfUser].favorites = [info.furnitureID]; 
        update([...tempUsersArray])
        setFavButtonBG('whitesmoke')
        console.log(`${info.title} removed from ${tempUsersArray[indexOfUser].userName}'s wishlist!`);
      } else{
        tempUsersArray[indexOfUser].favorites? tempUsersArray[indexOfUser].favorites = [...tempUsersArray[indexOfUser].favorites, info.furnitureID]: tempUsersArray[indexOfUser].favorites = [info.furnitureID]; 
        update([...tempUsersArray])
        setFavButtonBG('#00802D')
        console.log(`${info.title} added to ${tempUsersArray[indexOfUser].userName}'s wishlist!`);
      }} else{
        return alert('You need to sign-in in order to add to wishlist.')
      }
  }

const [selectedDate, onSelectedDate] = useState(new Date());
const weakDays = ["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"]

const SelectNewDate = (e) =>{
  onSelectedDate({year: e.getFullYear(), month: e.getMonth()+1 , date: e.getDate() , day: e.getDay(), hour:hours, minutes:minutes, title:info.title})
}

function SwichPic() {
  setPicIndex( prev=> (prev+1)%info.photo.length)
}



  return (
<>
<div id="entire-page-product-page">
  <div style={{height:"68px"}}></div>
<h1>{info.title}</h1>
{/* {users.some(v=>v.favorites.includes(info.furnitureID))&&<h3>in wishlis</h3>} */}
  <button id="add-favorite-button" style={{backgroundColor: favButtonBG}} type="button" onClick={()=>{AddToFavorites()}}>מועדפים</button>
<div id="product-img-container">
  <div id="img-container">
<img src={info.photo[picIndex]} alt="not found" onClick={SwichPic} className="picture"/>
  </div>
<div id="description-container">
<p id="product-descripition">{info.discription}</p>
{info.category&&<p id="product-descripition">{`${info.category} :קטגוריות`}</p>}
{info.color&&<p id="product-descripition">{`${info.color} :צבע`}</p>}
{info.publishDate&&<p id="product-descripition">{`${info.publishDate} :פורסם בתאריך`}</p>}
{info.collect==='from wherehouse'?<p id="product-descripition">{`.איסוף מהמחסן`}</p>:<p id="product-descripition">{`${info.address} :איסוף מכתובת`}</p>}
{info.donerName&&<p id="product-descripition">{`${info.donerName} :נתרם על ידי`}</p>}
{info.donerPhone&&<p id="product-descripition">{`${info.donerPhone} :טלפון`}</p>}
</div>
</div>
<h2>תאם איסוף</h2>
<div id="calender-container">
<Calendar onClickDay={SelectNewDate} value={selectedDate} minDate={new Date}/>
</div>
{selectedDate.year&& <div id="time-input-container">
<p style={{fontSize:"30px",marginTop:'0px'}}>{`${weakDays[selectedDate.day]} - ${selectedDate.year}/${selectedDate.month}/${selectedDate.date}`}</p>
  <p id="time-input-text">:שעה</p>
  <input id="time-input" type="number" max={59} min={0} value={minutes} onChange={(e)=>setMinutes(e.target.value)}/>
  <span>:</span>
  <input id="time-input" type="number" max={23} min={0} value={hours} onChange={(e)=>setHours(e.target.value)}/>
  <button id="confirm-order-button" type="button" onClick={()=>{FindCurrentUser()}}>!הזמן</button>
  <button id="add-favorite-button" type="button" onClick={()=>{console.log(users);}}>test</button>
  </div>}
</div>
</>
  )
}
export default ProductPage