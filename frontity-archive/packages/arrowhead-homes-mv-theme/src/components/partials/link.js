import React from 'react'
import {connect} from 'frontity'

const Link = ({href, actions, children, className, onMouseEnter, onMouseLeave, clickHandler}) => {
  return(
    <a className={className} href={href ? href : '#'} onClick={e => {
      if(href === '/#') {
        e.preventDefault()
      } else if(href.substr(0, 1) !== '#' && href.substr(1, 2) !== '#') {
        e.preventDefault()

        if(clickHandler) {
          clickHandler()
        }
        
        if(href) {
          actions.router.set(href)
          window.scrollTo(0, 0)
        }
      }
    }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {children}
    </a>
  )
}

export default connect(Link)