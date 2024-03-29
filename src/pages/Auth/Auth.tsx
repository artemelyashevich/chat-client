import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IAuth } from '../../types'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { loginUser, registerUser } from '../../store/slices/userSlice'
import { Navigate, useNavigate } from 'react-router-dom'

const Auth: React.FC = () => {

  const {isAuth, loading} = useAppSelector(store => store.user)

  const navigate = useNavigate()

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  const [status, setStatus] = React.useState<string>("Sign Up")

  const dispatch = useAppDispatch()

  const {
    register, handleSubmit, reset, formState: {
      errors
    }
  } = useForm<IAuth>()

  const onSubmit: SubmitHandler<IAuth> = data => {
    if (status.includes("Up")) {
      dispatch(registerUser(data))
    } else {
      dispatch(loginUser(data))
    }
    navigate("/")
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className='auth-form'>
      {
        isAuth && <Navigate to={"/"} replace /> 
      }
      <h1>{status}</h1>
      {
        status.includes("Up") && <input
        {...register("name",
          {
            required: {
              message: "Username can not be empty!",
              value: true
            }
          }
        )
        }
        type='text'
        placeholder='Username'
        className='auth-form__input'
      />
      }
      <input {...register("password",
        {
          required: {
            message: "Password can not be empty",
            value: true
          },
          minLength: {
            message: "MIn length of password is 5!",
            value: 5,
          },
        }
      )
      }
        type='password'
        placeholder='Password'
        className='auth-form__input'
      />

      <input {...register("email",
        {
          required: {
            message: "Email can not be empty!",
            value: true
          },
          minLength: {
            message: "Min length of email is 10!",
            value: 10,
          },
          pattern: {
            message: "Check your email!",
            value: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/,
          },
        }
      )
      }
        type='email'
        placeholder='Email'
        className='auth-form__input'
      />

      <p className='errors'>
        {errors.email?.message?.toString() || errors.password?.message?.toString() || errors.name?.message?.toString()}
      </p>
      <button type='submit'>{status}</button>
      <div>
        {
          status.includes("Up")
            ? <p className='label' onClick={() => setStatus("Sign In")}>Login here</p>
            : <p className='label' onClick={() => setStatus("Sign Up")}>Register here</p>
        }
      </div>
    </form>
  )
}

export default Auth