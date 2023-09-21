import { useLocation } from "react-router-dom"
import { useFurniture } from "../../furnitureContext"
import { useState } from "react"
import { useEffect } from "react"
import './productPage.css'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';


function ProductPage() {
  const location = useLocation()
  const info = location.state
  const [picIndex,setPicIndex]=useState(0)


  
const [selectedDate, onSelectedDate] = useState(new Date());
const weakDays = ["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"]

const SelectNewDate = (e) =>{
  onSelectedDate({year: e.getFullYear(), month: e.getMonth()+1 , date: e.getDate() , day: e.getDay()})
}

function SwichPic() {
  setPicIndex( prev=> (prev+1)%info.photo.length)
}



  return (
<>
<h1>{info.title}</h1>
<img src={info.photo[picIndex]} alt="not found" onClick={SwichPic} className="picture"/>
<h3>{info.discription}</h3>
<h2>תאם איסוף</h2>
<Calendar onClickDay={SelectNewDate} value={selectedDate} minDate={new Date}/>
<p>{selectedDate.year&&`${weakDays[selectedDate.day]} - ${selectedDate.year}/${selectedDate.month}/${selectedDate.date}`}</p>
<div>
<div id="clock">
      <form>
        <input id="min" type="number" min="0" max="24" onChange={(e)=>selectedDate.hour = e.target.value}></input>
        <span>:</span>
        <input id="sec" type="number" min="0" max="59" onChange={(e)=>selectedDate.minute = e.target.value}></input>
      </form>
      <div id="controls">
      </div>
    </div>
</div>
</>
  )
}
export default ProductPage