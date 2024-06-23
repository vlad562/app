import React, { useEffect, useState } from 'react'
import Styles from './mainScreen.module.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchPost } from '../../redux/store/reducers/postSlice'
import { fetchTags } from '../../redux/store/reducers/tagsSlice'
import Post from '../post/Post'
import Tags from '../tags/Tags'

const MainScreen = () => {
  const [state, setState] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const { posts } = useAppSelector(state => state.postsReducer)
  const { tags } = useAppSelector(state => state.tagsReducer)
  const data = useAppSelector(state => state.isAuthReducer.isAuth)

  useEffect(() => {
    dispatch(fetchPost())
    dispatch(fetchTags())
  },[])
  
  return (
    <div className={Styles.container}>
      <div className={Styles.navMenu}>
        {
          state ? (
            <>
              <div className={Styles.navMenu__block}>
                <p className={Styles.new__post}>Новые</p>
                <span></span>
              </div>
              <div className={Styles.navMenu__block} >
                <p onClick={() => setState(!state)} className={Styles.populate__post}>Популярные</p>
              </div>
            </>

          ) : (
            <>
              <div className={Styles.navMenu__block}>
                <p onClick={() => setState(!state)} className={Styles.new__post}>Новые</p>

              </div>
              <div className={Styles.navMenu__block}>
                <p className={Styles.populate__post}>Популярные</p>
                <span></span>
              </div>
            </>
          )
        }

      </div>
      <div className={Styles.main__mid}>
        <div className={Styles['main__mid__post-block']} >
          {
            posts && posts.map((elem, idx) => (
              <Post
                key={idx}
                title={elem.title}
                imageUrl={elem.imageUrl}
                user={elem.user}
                tags={elem.tags}
                text={elem.text}
                viewCount={elem.viewCount}
                commentCount={elem.comments.length}
                userId={data?._id}
                postId={elem?._id}
                comments={elem.comments}
              />
            ))
          }
        </div>
        <div className={Styles.tags__block}>
          {
            tags.length !== 0 && <Tags tags={tags[0]} />
          }
        </div>

      </div>
    </div>
  )
}

export default MainScreen

