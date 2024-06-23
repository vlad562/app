import React, { FC } from 'react'
import Styles from './tags.module.sass'
import { ITags } from '../../interface/tags/tags'



const Tags: FC<ITags> = (props) => {
  const tags: string[] = props.tags

  return (
      <div className={Styles.tags__block}>
        <h6 className={Styles.header}>Теги</h6>
        {
          tags.length 
          &&
          <ul className={Styles['tags__block-items']}>
            {tags.map((elem, idx) => (
              <li key={idx}><a href="#"><span style={{fontSize: '30px', color: 'rgba(0, 0, 0, 0.54)'}}>#</span>{elem}</a></li>
            ))}
          </ul>
            
        }
    </div>
  )
}

export default Tags