import React, { ChangeEvent, FC, useState } from 'react'
import Styles from './comments.module.sass'
import User from '../user/User'
import { IComments } from '../../interface/comments/commentsInterface'
import { useAppSelector } from '../../hooks/redux'

const Comments: FC<IComments> = ({ comments }) => {
  const [valueInputState, setValueInputState] = useState<string>('')
  // const [focusInputState, setFocusInputState] = useState<boolean>(true)
  return (
    <div className={Styles.comments__block}>
      <div className={Styles.comments__inner}>
        <h6>Комментарии</h6>
        <div className={Styles['comments__inner-info']}>
          {
            comments.map((elem, idx) => (
              <div className={Styles.comment__block}>
                <User key={idx} name={elem.author.name} avatar={elem.author?.avatar} comment={elem.comment} />
                <span></span>
              </div>
            ))
          }
        </div>
      </div>
    </div >
  )
}

export default Comments

