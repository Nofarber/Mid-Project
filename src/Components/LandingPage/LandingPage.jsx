import { useState , useContext} from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from '../../context'

function LandingPage() {
  const userContext = useContext(UserContext)
  const [password,setPassword]=useState('')
  const [username,setUserName]=useState('')
  const navigate = useNavigate()
  const users = userContext.users || ''
  const Login = userContext.login || ''



  function test() {
    console.log(username);
    console.log(password);
    console.log(userContext);
  }

  return (
    <>
    <h1>hello?</h1>
    <div>
      <input type="text" onChange={(e)=>setUserName(e.target.value)} placeholder="UserName"/>
      <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
      <button onClick={()=>Login({username,password})}>sign in!</button>
      <button onClick={()=>test()}>test</button>
      <button onClick={()=>navigate('/signUp')}>new user? sign up!</button>
    </div>
    <div>photo </div>
    <div>about us</div>
    <div><Link to='Donate'>Donate</Link></div>
    </>
  )
}
export default LandingPage