import { useState,useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import './Donate.css'
import { useFurniture } from "../../furnitureContext";
import axios from 'axios'
import { useEffect } from "react";

function Donate() {

  const [selectedImage, setSelectedImage] = useState([]);
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const Furniture = useFurniture()
  const CreateNewFurniture = Furniture.createNewFurniture
  const [render,setRender]=useState(true)

    function OnSubmit(data) {
      const newFurniture = data
      newFurniture.furnitureID = CreateRandomFurnitureID()
      newFurniture.photo = selectedImage
      newFurniture.publishDate = new Date
      CreateNewFurniture(newFurniture)
    }

   

    function CreateRandomFurnitureID (){
      let result = '';
    const UpperCasecharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const LowerCasecharacters = 'abcdefghijklmnopqrstuvwxyz'
    const numbercharacters = '0123456789'
    let counter = 0;
    while (counter < 3) {
      result += UpperCasecharacters.charAt(Math.floor(Math.random() * UpperCasecharacters.length));
      result += LowerCasecharacters.charAt(Math.floor(Math.random() * LowerCasecharacters.length));
      result += numbercharacters.charAt(Math.floor(Math.random() * numbercharacters.length));
      counter += 1;
    }
    return result
    }

    const handleClick = ()=> {
      setSelectedImage([...selectedImage,0],
      console.log(selectedImage),
      ) }
      
      const presetKey = 'h2jouxfr'
      const cloudName = 'dhzuiixyx'

      const HandleFile = (event,i)=> {
        selectedImage.pop()
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file',file)
        formData.append('upload_preset' , presetKey)
        axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
        .then(res => setSelectedImage([...selectedImage , res.data.secure_url]) )
        .catch(err => console.log(err))
        
         }

         useEffect(()=>{setSelectedImage(selectedImage.filter((v)=>v!==0))},[])

    
    return (
      <>
      <form onSubmit={handleSubmit(OnSubmit)} id="main-form" >
      <label>title:
      <input type="text" placeholder="title" {...register('title', { required: 'title is required', validate: {
        minLength: (v) => v.length >= 5 || 'The title should have at least 5 characters',
        maxLength: (v) => v.length <= 40 || 'The title should have less than 40 characters',
        matchPattern: (v) => /^[a-zA-Z0-9_]+$/.test(v)||'title must contain only letters, numbers and _',
      } })} />
      {errors.title?.message && (
    <small className="error-massage">{errors.title.message}</small>)}
      </label>
      <label>discription:
      <input type="text" placeholder="discription" {...register('discription', { required: 'discription is required'})} />
      {errors.discription?.message && (
    <small className="error-massage">{errors.title.message}</small>)}
      </label>
      <button type="button" onClick={()=>handleClick()}>add photo</button>
      <div id="photo-div">
      {selectedImage.map((value,i)=>
        <label key={i} className="single-photo">
        <>
        <input type="file"  className="file-input" name="ImageStyle" onChange={(event)=>HandleFile(event,i)}/>
          <button type="button" onClick={()=>setSelectedImage(selectedImage.filter((value)=>value!==selectedImage[i]))}>delete</button>
        </>
        {selectedImage[i]&&<img src={selectedImage[i]} alt="not found" className="pic"/>}
        </label>)}
      </div>
      <label>category
      <input type="text" placeholder="category" {...register('category', { required: 'category is required', validate: {
        maxLength: (v) => v.length <= 40 || 'The category should have less than 40 characters',
        matchPattern: (v) => /^[a-zA-Z0-9_]+$/.test(v)||'category must contain only letters, numbers and _',
      } })} />
      </label>
      <label>color:
      <select  {...register('color')}>
        <option value="blue">blue</option>
        <option value="red">red</option>
        <option value="yellow">yellow</option>
      </select>
      </label>
      <label>collect from:
      <select  {...register('collect',{ required: 'required'})}>
        <option value="blue">from wherehouse</option>
        <option value="red">from my address</option>
      </select>
      {errors.collect?.message && (
    <small className="error-massage">{errors.title.message}</small>)}
      </label>
      <label>name:
      <input type="text" placeholder="name" {...register('donerName', { required: 'name is required', validate: {
        minLength: (v) => v.length >= 1 || 'The name should have at least 1 characters',
        maxLength: (v) => v.length <= 20 || 'The name should have less than 20 characters',
        matchPattern: (v) => /^[a-zA-Z0-9_]+$/.test(v)||'name must contain only letters, numbers and _',
      } })} />
      {errors.donerName?.message && (
    <small className="error-massage">{errors.donerName.message}</small>)}
      </label> 
      <label>phone number:
     <input type="text" placeholder="050-0000000" {...register('donerPhone', { required: "phone number is required", validate: {
        maxLength: (v) =>
          v.length <= 50 || "The phone number should have at most 50 characters",
        matchPattern: (v) =>
        /^[0-9-]+$/.test(v) ||  "phone number must contain only numbers and -",
      },
  })} />
  {errors.donerPhone?.message && (
    <small className="error-massage">{errors.donerPhone.message}</small> )}
    </label>     
      <label>address:
      <input type="text" placeholder="address" {...register('address', { required: 'address is required', validate: {
        minLength: (v) => v.length >= 5 || 'The address should have at least 5 characters',
        maxLength: (v) => v.length <= 40 || 'The address should have less than 40 characters',
        matchPattern: (v) => /^[a-zA-Z0-9_]+$/.test(v)||'address must contain only letters, numbers and _',
      } })} />
      {errors.address?.message && (
    <small className="error-massage">{errors.address.message}</small>)}
      </label>
      <button type="submit">submit</button>
      </form>
      <button type='button' onClick={()=>navigate('/')}>nav</button>
      </>
    )
  }
  export default Donate