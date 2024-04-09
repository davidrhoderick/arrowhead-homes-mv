import React from 'react'
import {connect, css} from 'frontity'

import ProjectsList from './partials/projects-list'

const Projects = ({state}) => {
  const data = state.source.get(state.router.link)
  let projects = []
  data.items.map(({id}) => projects.push(id))

  return (
    <>
      <div>
        <h1 css={css`text-align: center; padding: 1rem; margin-bottom: 2rem; background: ${state.theme.colors.darkBlue}; color: #fff; text-transform: uppercase; font-size: 1.5rem;`}>Current Projects</h1>

        <ProjectsList projects={projects} />
      </div>
    </>)
}

export default connect(Projects)