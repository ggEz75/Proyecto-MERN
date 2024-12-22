import {Button, Card, Input, Label} from "../components/ui"
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'

function RegisterPage() {

  const {
    register, 
    handleSubmit, 
    formState: {errors}} = useForm()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers:{
        'Content-Type':'application/json',
        'Acces-Control-Allow-Credetials': true
      }
    })

    const dataSignup = await response.json()
    console.log(dataSignup)
  });
  /* al completar el envio de datos tener en cuenta en donde este alojado el servidor para darle el permiso de aceptar los datos  */




  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">

      <Card>
      <h1 className="text-4xl font-bold text-center my-2" >Register</h1>
      <form onSubmit={onSubmit}>

      <Label htmlFor="name">Nombre de usuario</Label>
      <Input placeholder="Nombre de usuario" {...register('name',{required: true})}/>

      {
        errors.name && <p className="text-red-600">El nombre es requerido</p>
      }

      <Label htmlFor="email">Correo electronico</Label>
      <Input type="email" placeholder="Correo electronico" {...register('email', {required: true})}/>

      {
        errors.email && <p className="text-red-600">Correo electronico requerido</p>
      }

      <Label htmlFor="password">Contraseña</Label>
      <Input type="password" placeholder="Ingresar contraseña" {...register('password',{required: true})}/>

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
