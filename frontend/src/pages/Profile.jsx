import {useAuth} from '../context/AuthContext'; // Importar el hook useAuth de AuthContext

function Profile() {

  const {user} = useAuth(); // Extraer el usuario del contexto 

  return (
    <div>
      {JSON.stringify(user, null, 2)}
    </div>
  )
}

export default Profile