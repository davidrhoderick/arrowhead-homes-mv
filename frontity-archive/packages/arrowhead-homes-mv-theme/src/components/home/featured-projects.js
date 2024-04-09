import React from 'react'
import {connect, styled} from 'frontity'

import ProjectsList from '../partials/projects-list'

const FeaturedProjects = ({state, section}) => {
  let projects = []
  section.featured_projects.map(({project}) => projects.push(project))

  return(
    <FeaturedProjectsContainer theme={state.theme}>
      <h2>Featured Projects</h2>

      <ProjectsList projects={projects} />
    </FeaturedProjectsContainer>
  )
}

export default connect(FeaturedProjects)

const FeaturedProjectsContainer = styled.section`
  padding: 3rem 1rem;
  
  h2 {
    text-align: center;
  }
`
