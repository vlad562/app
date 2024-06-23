import React, { useState, useEffect } from 'react'
import Style from './fullPost.module.sass'
import { useAppSelector } from '../../hooks/redux'
import axios from '../../axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IPosts } from '../../interface/post/postInterface'
import Comments from '../comments/Comments'
import User from '../user/User'

const FullPost = () => {
  const { id } = useParams()
  const navigator = useNavigate()
  const user = useAppSelector(state => state.isAuthReducer.isAuth)
  const [inputState, setInputState] = useState<string>('')
  const [data, setData] = useState<IPosts>({
    _id: '',
    title: '',
    imageUrl: '',
    user: {
      createdAt: '',
      avatar: '',
      name: '',
      _id: '',
    },
    tags: [],
    text: '',
    viewCount: 0,
    commentCount: 0,
    comments: []
  })

  useEffect(() => {
    axios.get(`/article/one/${id}`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
        console.log('Ошибка при получении статьи')
      })
  }, [])

  const deletePost = async (): Promise<void> => {
    try {
      const answer = await axios.delete(`article/remove/${data._id}`)
      navigator('/')
    } catch (error) {
      console.log(error)
      alert('Не удалось удалить статью')
    }

  }

  const updatePost = async () => {

  }

  const fetchCreateComment = async () => {
    try {
      setInputState('')
      await axios.post(`/comments/create/${id}`, { comment: inputState })
      axios.get(`/article/one/${id}`)
        .then((res) => {
          setData(res.data)
        })
        .catch((err) => {
          console.log(err)
          console.log('Ошибка при получении статьи')
        })

    } catch (error) {
      alert('Не удалось создать комментарий')
    }
  }
  if (!data.title || !data.text) {
    return (
      <div className={Style.container}>
        <div style={{ textAlign: 'center', fontSize: '25px' }}>Такой статьи не существует</div>
      </div>
    )
  }

  return (
    <div className={Style.container}>
      <div className={Style.main__mid}>
        <div className={Style['main__mid-block']}>
          <div className={Style.post__block}>
            <div className={Style.post__inner}>
              {
                user?._id === data.user?._id &&
                <div className={Style.menu__post}>
                  <Link to='add-post'>
                    <img onClick={updatePost} className={Style.pencil} src="/assets/pencil.png" alt="" />
                  </Link>
                  <img onClick={deletePost} src="/assets/close.png" className={Style.close} alt="" />
                </div>
              }
              {
                data.imageUrl && <img src={data.imageUrl} alt="" />
              }
              <div className={Style['post__inner-footer']}>
                {
                  data.user && <User name={data.user.name} avatar={user?.avatar} createdAt={data.user.createdAt} />
                }
                <div className={Style['post__inner-footer-indention']}>
                  <h1 className={Style.title}>{data.title}</h1>
                  {data.tags && (
                    <ul className={Style.tags}>
                      {
                        data.tags.map((elem, idx) => (
                          <li key={idx}>#{elem}</li>
                        ))
                      }
                    </ul>
                  )
                  }
                  <p className={Style.text}>{data.text}</p>
                  <div className={Style.postInfo}>
                    <p>Просмотры {data.viewCount}</p>
                    <p>Коментарии {data.comments.length}</p>
                  </div>
                </div>
              </div>
            </div >
          </div>
          <div className={Style.comments__block}>
            <Comments comments={data.comments} />
          </div>
          <div className={Style.create__comment}>
            {
              user?.avatar ? <img src={user.avatar} alt="" /> : <img src='/assets/user.jpg' alt="" />
            }
            <div className={Style['create__comment-after']}>
              <input onChange={(e) => setInputState(e.target.value)} value={inputState} placeholder='Написать комментарий' />
              <button onClick={fetchCreateComment}>Отправить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullPost