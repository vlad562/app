import React, { ChangeEvent, useEffect, useState } from 'react'
import Styles from './login.module.sass'
import { SubmitHandler, useForm, } from 'react-hook-form'
import { ILogin } from '../../interface/login/loginInterface'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchIsAuth, isAuthFunction } from '../../redux/store/reducers/isAuthSlice'
import { Navigate } from 'react-router-dom'
const Login = () => {
  const isAuth = useAppSelector(isAuthFunction)
  const dispatch = useAppDispatch()
  const { register, handleSubmit, formState: { errors }, watch, resetField,setFocus} = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: ''
    },
    mode: 'onChange'
  })

  const watchEmail = watch('email')
  const watchPassword = watch('password')
  
  React.useEffect(() => {
    setFocus("email")
  }, [setFocus])

  const onSubmit: SubmitHandler<ILogin> = async (values) => {
    const data = await dispatch(fetchIsAuth(values))
    if(!data.payload) {
      return alert('Не удалось зарегистрироваться')
    }
    window.localStorage.setItem('token',data.payload.token)
  }

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.login__block}>
        <div className={Styles.login__inner}>
          <h1>Вход в аккаунт</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={Styles.input__email}>
              {
                errors.email && watchEmail === ''
                  ?
                  <>
                    <input
                      {...register("email",
                        {
                          required: 'Email обязательное поле',
                          pattern: {
                            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                            message: 'Введите валидный email'
                          }
                        })}
                      autoFocus
                      style={{ borderColor: 'red', marginBottom: 0 }}
                      className={Styles.text__input}
                      onBlur={() => resetField("email")}
                    />
                    <span className={Styles['error__message-email']}>{errors.email.message}</span>
                  </>
                  :

                  errors.email && watchEmail !== ''
                    ?
                    <>
                      <input
                        {...register("email",
                          {
                            required: 'Email обязательное поле',
                            pattern: {
                              value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                              message: 'Введите валидный email'
                            }
                          })}
                        autoFocus
                        style={{ borderColor: 'red', marginBottom: 0 }}
                        className={Styles.text__input}
                      />
                      <span className={Styles['error__message-email']}>{errors.email.message}</span>
                    </>
                    :
                    watchEmail === ''
                      ?
                      <>
                        <input type=''
                          {...register("email",
                            {
                              required: 'Email обязательное поле',
                              pattern: {
                                value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                                message: 'Введите валидный email'
                              }
                            })}
                          autoFocus
                          className={Styles.text__input}
                        />
                        <span className={Styles.email}>E-Mail</span>
                      </>
                      :
                      <input
                        {...register("email",
                          {
                            required: 'Email обязательное поле',
                            pattern: {
                              value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                              message: 'Введите валидный email'
                            }
                          })}
                        autoFocus
                        className={Styles.text__input}
                      />
              }
            </div>

            <div className={Styles.input__password}>
              {
                errors.password && watchPassword === ''
                  ?
                  <>
                    <input
                      {...register("password",
                        {
                          required: 'Password обязательное поле',
                          minLength: {
                            value: 3,
                            message: 'Длинна не менее 3'
                          }
                        })}
                      autoFocus
                      style={{ borderColor: 'red', marginBottom: 0 }}
                      className={Styles.text__input}
                      onBlur={() => resetField("password")}
                    />
                    {/* <span className={Styles.email}>E-Mail</span> */}
                    <span className={Styles['error__message-password']}>{errors.password.message}</span>
                  </>
                  :

                  errors.password && watchPassword !== ''
                    ?
                    <>
                      <input
                        {...register("password",
                          {
                            required: 'Password обязательное поле',
                            minLength: {
                              value: 3,
                              message: 'Длинна не менее 3'
                            }
                          })}
                        autoFocus
                        style={{ borderColor: 'red', marginBottom: 0 }}
                        className={Styles.text__input}
                      />
                      <span className={Styles['error__message-password']}>{errors.password.message}</span>
                    </>
                    :
                    watchPassword === ''
                      ?
                      <>
                        <input type=''
                          {...register("password",
                            {
                              required: 'Password обязательное поле',
                              minLength: {
                                value: 3,
                                message: 'Длинна не менее 3'
                              }
                            })}
                          autoFocus
                          className={Styles.text__input}
                        />
                        <span className={Styles.password}>Пароль</span>
                      </>
                      :
                      <input
                        {...register("password",
                          {
                            required: 'Password обязательное поле',
                            minLength: {
                              value: 3,
                              message: 'Длинна не менее 3'
                            }
                          })}
                        autoFocus
                        className={Styles.text__input}
                      />
              }
            </div>


            <button className={Styles.fetch__input}>Войти</button>
          </form>
        </div>
      </div>
    </div >
  )
}

export default Login



// useEffect(() => {
  //   const subscription = watch((value, { name, type }) => console.log(value, name, type))

  //   return () => subscription.unsubscribe()
  // }, [watch])