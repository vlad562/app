import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Styles from './addPost.module.sass'
import axios from '../../axios'
import { ICreatePost } from '../../interface/addPost/addPostInterface'
import { useNavigate, useParams } from 'react-router-dom'
const AddPost = () => {
  const { id } = useParams()
  const inputFileRef = useRef<HTMLInputElement>(null)
  // const [image, setImageUrl] = useState<string>('')
  const [postState, setPostState] = useState<ICreatePost>({
    imageUrl: '',
    title: '',
    tags: '',
    text: '',
  })
  const navigator = useNavigate()
  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) return
      const formData = new FormData()
      const image = e.target.files[0]
      formData.append('image', image)
      const { data } = await axios.post('/upload', formData)
      setPostState(prev => {
        return { ...prev, imageUrl: data.url }
      })
    } catch (error) {
      console.log(error)
      alert("Ошибка загрузки файла")
    }
  }

  const deleteFileImage = () => {
    setPostState(prev => {
      return { ...prev, imageUrl: '' }
    })
  }

  const fetchPostCreate = async () => {
    try {
      var current = postState.tags
      const { data } = id ? await axios.put<ICreatePost>(`/article/update/${id}`, postState) : await axios.post<ICreatePost>('/article/create', postState)
      navigator('/')
    } catch (error) {
      console.log(error)
      alert('Не удалось создать статью')
      setPostState(prev => {
        return { ...prev, tags: current }
      })
    }

  }
  const navigate = () => {
    navigator(-1)
  }

  useLayoutEffect(() => {
    if (id) {
      axios.get(`/article/one/${id}`).then(({ data }) => {
        setPostState({
          imageUrl: data.imageUrl,
          title: data.title,
          tags: data.tags,
          text: data.text
        })
      })
    }
  }, [])

  return (
    <div className={Styles.container}>
      <div className={Styles.addPost__block}>
        <div className={Styles['addPost__block-inner']}>
          <button onClick={() => inputFileRef?.current?.click()}>Загрузить превью</button>
          <input ref={inputFileRef} type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeFile(e)} hidden />
          {
            postState.imageUrl && (
              <>
                <button onClick={deleteFileImage} style={{ backgroundColor: 'red', color: '#fff', border: "none" }}>Удалить</button>
                <img className={Styles.imageUrl} src={`http://localhost:3001${postState.imageUrl}`} alt="" />
              </>
            )
          }
          <div className={Styles.header__block}>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostState(prev => {
                return { ...prev, title: e.target.value }
              })}
              value={postState.title}
              className={Styles.header__article}
              placeholder='Заголовок статьи'
            />
          </div>
          <div className={Styles.tags__block}>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostState(prev => {
                return { ...prev, tags: e.target.value }
              })}
              value={postState.tags}
              className={Styles.tags__articles}
              placeholder='Теги'
            />
          </div>

          <div className={Styles.text__block}>
            <textarea
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPostState(prev => {
                return { ...prev, text: e.target.value }
              })}
              value={postState.text}
              placeholder='Введите текст...' ></textarea>
          </div>

          <div className={Styles.button__menu}>
            {
              id ? <button onClick={fetchPostCreate} className={Styles.fetch__button}>Сохранить</button> : <button onClick={fetchPostCreate} className={Styles.fetch__button}>Опубликовать</button>
            }
            <button onClick={navigate} className={Styles.cancel__button}>Отмена</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPost