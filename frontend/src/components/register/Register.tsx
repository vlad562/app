import React, { } from 'react'
import Styles from './register.module.sass'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IUseForm } from '../../interface/register/registerInterface'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchAuthRegister, isAuthFunction } from '../../redux/store/reducers/isAuthSlice'
import { Navigate } from 'react-router-dom'

const Register = () => {
  const isAuth = useAppSelector(isAuthFunction)
  const dispatch = useAppDispatch()
  const { register, handleSubmit, watch, formState: { errors }, resetField,setFocus } = useForm<IUseForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange'
  })

  React.useEffect(() => {
    setFocus("name")
  }, [setFocus])

  const onSubmit: SubmitHandler<IUseForm> = async (values) => {
    const data = await dispatch(fetchAuthRegister(values))
    console.log(data)
    if (!data.payload) {
      return alert('Не удалось зарегистрироваться')
    }
    window.localStorage.setItem('token',data.payload.token)
  }

  if (isAuth) {
    return <Navigate to='/' />
  }

  const watchName = watch('name')
  const watchEmail = watch('email')
  const watchPassword = watch('password')

  return (
    <div className={Styles.container}>
      <div className={Styles.register__block}>
        <div className={Styles.register__inner}>
          <h1>Создание аккаунта</h1>
          <img src="/assets/user.jpg" width='100px' height='100px' alt="" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={Styles['form__input-name']}>
              {
                errors.name && watchName === ''
                  ?
                  <>
                    <input
                      {...register('name',
                        {
                          required: 'Name обязательное поле',
                          minLength: {
                            value: 2,
                            message: 'Длина не менее 2'
                          }
                        })}
                      className={Styles.text__input}
                      style={{ borderColor: 'red', marginBottom: 0 }}
                      onBlur={() => resetField('name')}
                    />
                    <span className={Styles['error__message-name']}>{errors.name.message}</span>
                  </>
                  :
                  errors.name && watchName !== ''
                    ?
                    <>
                      <input
                        {...register('name',
                          {
                            required: 'Name обязательное поле',
                            minLength: {
                              value: 2,
                              message: 'Длина не менее 2'
                            }
                          })}
                        className={Styles.text__input}
                        style={{ borderColor: 'red', marginBottom: 0 }}
                        autoFocus
                      />
                      <span className={Styles['error__message-name']}>{errors.name.message}</span>
                    </>
                    :
                    watchName === ''
                      ?
                      <>
                        <input
                          {...register('name',
                            {
                              required: 'Name обязательное поле',
                              minLength: {
                                value: 2,
                                message: 'Длина не менее 2'
                              }
                            })}
                          className={Styles.text__input}
                          autoFocus
                        />
                        <span className={Styles.name}>Name</span>
                      </>
                      :
                      <input
                        {...register('name',
                          {
                            required: 'Name обязательное поле',
                            minLength: {
                              value: 2,
                              message: 'Длина не менее 2'
                            }
                          })}
                        className={Styles.text__input}
                        autoFocus
                      />
              }
            </div>
            <div className={Styles['form__input-email']}>
              {
                errors.email && watchEmail === ''
                  ?
                  <>
                    <input
                      {...register('email',
                        {
                          required: 'Email обязательное поле',
                          pattern: {
                            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                            message: 'Введите валидный email'
                          }
                        })}
                      className={Styles.text__input}
                      style={{ borderColor: 'red', marginBottom: 0 }}
                      onBlur={() => resetField('email')}
                    />
                    <span className={Styles['error__message-email']}>{errors.email.message}</span>
                  </>
                  :
                  errors.email && watchEmail !== ''
                    ?
                    <>
                      <input
                        {...register('email',
                          {
                            required: 'Email обязательное поле',
                            pattern: {
                              value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                              message: 'Введите валидный email'
                            }
                          })}
                        className={Styles.text__input}
                        style={{ borderColor: 'red', marginBottom: 0 }}
                        autoFocus
                      />
                      <span className={Styles['error__message-email']}>{errors.email.message}</span>
                    </>
                    :
                    watchEmail === ''
                      ?
                      <>
                        <input
                          {...register('email',
                            {
                              required: 'Email обязательное поле',
                              pattern: {
                                value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                                message: 'Введите валидный email'
                              }
                            })}
                          className={Styles.text__input}
                          autoFocus
                        />
                        <span className={Styles.email}>E-Mail</span>
                      </>
                      :
                      <input
                        {...register('email',
                          {
                            required: 'Email обзательное поле',
                            pattern: {
                              value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                              message: 'Введите валидный email'
                            }
                          })}
                        className={Styles.text__input}
                        autoFocus
                      />
              }
            </div>

            <div className={Styles['form__input-password']}>
              {
                errors.password && watchPassword === ''
                  ?
                  <>
                    <input
                      {...register('password',
                        {
                          required: 'Password обязательное поле',
                          minLength: {
                            value: 3,
                            message: 'Длинна не менее 3'
                          }
                        })}
                      className={Styles.text__input}
                      style={{ borderColor: 'red', marginBottom: 0 }}
                      onBlur={() => resetField('password')}
                    />
                    <span className={Styles['error__message-password']}>{errors.password.message}</span>
                  </>
                  :
                  errors.password && watchPassword !== ''
                    ?
                    <>
                      <input
                        {...register('password',
                          {
                            required: 'Password обязательное поле',
                            minLength: {
                              value: 3,
                              message: 'Длинна не менее 3'
                            }
                          })}
                        className={Styles.text__input}
                        style={{ borderColor: 'red', marginBottom: 0 }}
                        autoFocus
                      />
                      <span className={Styles['error__message-password']}>{errors.password.message}</span>
                    </>
                    :
                    watchPassword === ''
                      ?
                      <>
                        <input
                          {...register('password',
                            {
                              required: 'Password обязательное поле',
                              minLength: {
                                value: 3,
                                message: 'Длинна не менее 3'
                              }
                            })}
                          className={Styles.text__input}
                          autoFocus
                        />
                        <span className={Styles.password}>Password</span>
                      </>
                      :
                      <input
                        {...register('password',
                          {
                            required: 'Password обязательное поле',
                            minLength: {
                              value: 3,
                              message: 'Длинна не менее 3'
                            }
                          })}
                        className={Styles.text__input}
                        autoFocus
                      />
              }
            </div>
            <button className={Styles.fetch__input}>Зарегистрироваться</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register