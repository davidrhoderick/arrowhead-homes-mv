import React from 'react'
import {connect} from 'frontity'
import Switch from '@frontity/components/switch'

import Project from './project'
import Page from './page'

const Post = ({state}) => {
  const data = state.source.get(state.router.link)
  const post = state.source[data.type][data.id]

  return (
    <Switch>
      <Project when={post.type === 'project'} />
      <Page />
    </Switch>
  )
}

export default connect(Post)