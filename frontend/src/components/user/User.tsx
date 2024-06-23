import React, { FC } from 'react'
import Style from './user.module.sass'
import { IUser } from '../../interface/user/userInterface'

const User: FC<IUser> = ({ avatar, name, createdAt, comment }) => {
  console.log(comment)
  return (
    <div className={Style.block}>
      {
        avatar ? <img src={avatar} alt="" /> : <img src='/assets/user.jpg' alt="" />
      }
      <div className={Style.block__info}>
        <p className={Style.name}>{name}</p>
        {
          comment
            ?
            <p className={Style.date}>{comment}</p>
            :
            <p className={Style.date}>{createdAt}</p>
        }
      </div>
    </div>
  )
}

export default User
