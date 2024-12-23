import { useAuth } from "../context/AuthContext"

function HomePage() {

  const data = useAuth() // extraemos los valores del contexto
  console.log(data)

  return (
    <div>HomePage</div>
  )
}

export default HomePage
