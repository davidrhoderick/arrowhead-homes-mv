import React from 'react'
import {connect} from 'frontity'
import Switch from '@frontity/components/switch'

import Projects from './projects'

const Archive = ({state}) => {
  const data = state.source.get(state.router.link)

  return (
    <Switch>
      <Projects when={data.type == 'project'} />
    </Switch>
  )
}

export default connect(Archive)