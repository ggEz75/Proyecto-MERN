import {Button, Card, Input, Label} from "../components/ui"
import {useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom' // useNavigate para redireccionar a otra página
import {useAuth} from '../context/AuthContext'

function RegisterPage() {

  const {
    register, 
    handleSubmit, 
    formState: {errors}
  } = useForm();
  const {signup} = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await signup(data);
    navigate('/profile'); // despues de registrarse redirigir a la página de perfil
      });

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">

      <Card>
      <h1 className="text-4xl font-bold text-center my-2" >Register</h1>
      <form onSubmit={onSubmit}>

      <Label htmlFor="name">Nombre de usuario</Label>
      <Input id="name" placeholder="Nombre de usuario" {...register('name',{required: true})}/>

      {
        errors.name && <p className="text-red-600">El nombre es requerido</p>
      }

      <Label htmlFor="email">Correo electronico</Label>
      <Input id="email" type="email" placeholder="Correo electronico" {...register('email', {required: true})}/>

      {
        errors.email && <p className="text-red-600">Correo electronico requerido</p>
      }

      <Label htmlFor="password">Contraseña</Label>
      <Input id="password" type="password" placeholder="Ingresar contraseña" {...register('password',{required: true})}/>

      {
        errors.password && <p className="text-red-600">Contraseña requerida</p>
      }

      <Button>Registrar</Button>      
      
      <div>
          <p className='my-3'>Ya tienes una cuenta? </p>
          <Link to='/login' className='font-bold'>Inicia sesión</Link>
      </div>

      </form>
      </Card>

    </div>
  );
}

export default RegisterPage
