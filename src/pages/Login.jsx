import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const Login = () => {
    const navigate = useNavigate()
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("email required"),
        password: Yup.string().required("password required"),
    })

    const handleLogin = async(values, {setSubmitting})=>{
        try {
            const response = await axios.post("http://localhost:5000/api/users/login",values);
            console.log(response, "login")
            toast.success("Login is Sucess!")
            navigate("/")
            
        } catch (error) {

            console.log(error.message)

            toast.message(error)
            
        }finally{
            setSubmitting(false)
        }  
    }

  return (
    <div className='max-w-sm mx-auto mt-10 p-4 border'>
        <h2 className='text-3xl text-blue-500 mb-4'>Login</h2>
        <Formik
        initialValues={{email: "", password: ""}}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
        >
            {({isSubmitting})=>(
            <Form>

        <div className='mb-4'>
            <label className='block text-gray-700'>Email:</label>
            <Field type="email" id="email" name="email" className="border p-2 w-full " />
            <ErrorMessage name='email' component="p" className='text-red-500' />
        </div>
        <div className='mb-4'>
            <label className='block text-gray-700'>Password:</label>
            <Field type="password" id="password" name="password" className="border p-2 w-full " />
            <ErrorMessage name='password' component="p" className='text-red-500' />
        </div>
        <button type='submit' disabled={isSubmitting} className='bg-black text-white px-2 py-1 rounded mb-4'>Login</button>
        </Form>
            )}
        </Formik>
        <p>Don't have an account <Link to="/signin" className='text-red-700'>Sign Up</Link></p> 

    </div>
  )
}

export default Login