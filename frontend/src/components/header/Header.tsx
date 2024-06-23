import React, { useState, useEffect } from 'react'
import Styles from './header.module.sass'
import { menuWithRegistration, menuWithoutRegistration } from './headerAuthMenu'
import axios from '../../axios'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { isAuthFunction, logout } from '../../redux/store/reducers/isAuthSlice'

const Header = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(isAuthFunction)
  const [buttonState, setButtonState] = useState<boolean>(false)

  useEffect(() => {
    axios.get('/article/all')
  }, [])

  const exitAuth = () => {
    if (window.confirm("Вы дейсвительно хотите выйти")) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }

  }
  console.log(buttonState)
  return (
    <div className={Styles.header}>
      <div className={Styles.container}>
        <div className={Styles.header__inner}>
          <div className={Styles['header__inner-logo']}>
            <p>Your Blog</p>
          </div>
          <div className={Styles['header__inner-authMenu']}>
            {
              isAuth
                ?
                (
                  <ul>
                    {menuWithoutRegistration.map((elem, id) => (
                      elem.event === true
                        ?
                        <li key={id}>
                          <Link
                            onClick={() => exitAuth()}
                            style={{ backgroundColor: elem?.style?.backgroundColor, color: elem?.style?.color }}
                            to={elem.link}>
                            {elem.title}
                          </Link>
                        </li>
                        :
                        <li key={id}>
                          <Link
                            style={{ backgroundColor: elem?.style?.backgroundColor, color: elem?.style?.color }}
                            to={elem.link}>
                            {elem.title}
                          </Link>
                        </li>
                    ))}
                  </ul>
                ) : (
                  <ul>
                    {menuWithRegistration.map((elem, id) => (
                      <li key={id}>
                        <Link
                          to={elem.link}>
                          {elem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )
            }
          </div>
          <div className={Styles.btn__burger}>
            <button className={buttonState ? Styles.active : Styles['btn__mobile']} onClick={() => setButtonState(prev => !prev)}>
              {/* <span ></span> */}
              <span />
              {/* <span ></span>  */}
            </button>
          </div>
        </div>
        {
          buttonState
          &&
          <div className={Styles.auth__block}>
            <div>

              {
                isAuth
                  ?
                  (
                    <ul>
                      {menuWithoutRegistration.map((elem, id) => (
                        elem.event === true
                          ?
                          <li key={id}>
                            <Link
                              onClick={() => exitAuth()}
                              style={{ backgroundColor: elem?.style?.backgroundColor, color: elem?.style?.color }}
                              to={elem.link}>
                              {elem.title}
                            </Link>
                          </li>
                          :
                          <li key={id}>
                            <Link
                              style={{ backgroundColor: elem?.style?.backgroundColor, color: elem?.style?.color }}
                              to={elem.link}>
                              {elem.title}
                            </Link>
                          </li>
                      ))}
                    </ul>
                  ) : (
                    <ul>
                      {menuWithRegistration.map((elem, id) => (
                        <li key={id}>
                          <Link
                            to={elem.link}>
                            {elem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )
              }
            </div>
          </div>
        }
      </div>
    </div >
  )
}

export default Header


