import React, { FC } from 'react'
import Style from './post.module.sass'
import User from '../user/User'
import { IPosts } from '../../interface/post/postInterface'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from '../../axios'


const Post: FC<IPosts> = ({ imageUrl, text, user, title, tags, viewCount, commentCount, userId, postId, comments }) => {
  const navigate = useNavigate()
  const deletePost = async (e: React.MouseEvent<HTMLImageElement>): Promise<void> => {
    try {
      e.stopPropagation()
      await axios.delete(`article/remove/${postId}`)
      
    } catch (error) {
      console.log(error)
      alert('Не удалось удалить статью')
    }

  }

  const updatePost = async () => {

  }

  console.log('tags', tags)
  const navigator = () => {
    navigate(`/article/one/${postId}`)
  }
  
  return (
    <div onClick={navigator} className={Style.post__block}>
      <div className={Style.post__inner}>
        {
          userId === user?._id &&
          <div className={Style.menu__post}>
            <Link to="/add-post">
              <img onClick={updatePost} className={Style.pencil} src="/assets/pencil.png" alt="" />
            </Link>
            <img onClick={(e) => deletePost(e)} src="/assets/close.png" className={Style.close} alt="" />
          </div>
        }
        {
          imageUrl && <img src={imageUrl} alt="" />
        }
        <div className={Style['post__inner-footer']}>
          {
            user && <User name={user.name} createdAt={user.createdAt} avatar={user?.avatar} />
          }
          <div className={Style['post__inner-footer-indention']}>
            <h1 className={Style.title}>{title}</h1>
            <p className={Style.text}>{text}</p>
            {tags && (
              <ul className={Style.tags}>
                {
                  tags.map((elem, idx) => (
                    <li key={idx}>#{elem}</li>
                  ))
                }
              </ul>
            )
            }
            <div className={Style.postInfo}>
              <p>Просмотры {viewCount}</p>
              <p>Коментарии {commentCount}</p>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

export default Post



