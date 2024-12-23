import {Card, Input, Button, Label} from '../components/ui'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function LoginPage() {

  const {register, handleSubmit} = useForm(); // Desestructuración de funciones de useForm
  const {signin} = useAuth(); // Retorna multiples datos del contexto de autenticación
  const navigate = useNavigate(); // Redireccionar al perfil

  const onSubmit = handleSubmit( async(data) => {
    await signin(data); // Petición de inicio de sesión
    navigate('/profile'); // Redirigir al perfil

  });


  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">

      <Card>
        <h1 className='text-4xl font-bold my-2 text-center'>Sing in</h1>

        <form onSubmit={onSubmit}>
          <Label htmlFor="email" >Email</Label>
          <Input type="email" placeholder='Email' {...register('email',{required: true})}/>

          <Label htmlFor="password" >Password</Label>
          <Input type='password' placeholder='Password'{...register('password',{required: true})}/>

          <Button>Sign in</Button>

          <div>
            <p className='my-3'>No estas registrado? </p>
            <Link to='/register' className='font-bold'>Registraste</Link>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default LoginPage
