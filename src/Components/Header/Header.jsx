import { useCredentials } from "../../context"

function Header() {
  const credentials = useCredentials()
  const logged = credentials.isConnected
  return (
    <div>Header hello {`${logged}`}!</div>
  )
}
export default Header