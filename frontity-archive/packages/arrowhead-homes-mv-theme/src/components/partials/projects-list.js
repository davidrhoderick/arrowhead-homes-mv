import React from 'react'
import {connect, styled} from 'frontity'

import Link from './link'

const ProjectsList = ({state, projects, libraries}) => {
  const Html2React = libraries.html2react.Component
  const data = state.source.get('/projects')
  data.items.map(({id, type}) => state.source[type][id])
  
  return (
    <ProjectsContainer>
      {projects.map((project, index) => {
        const projectObj = state.source['project'][project]
  
        const featuredImage = state.source.attachment[projectObj.featured_media]

        return (
          <Project theme={state.theme} key={index}>
            <ProjectImage image={featuredImage.media_details.sizes.medium_large.source_url} />
            
            <ProjectTitle dangerouslySetInnerHTML={{__html: projectObj.title.rendered}} theme={state.theme} />

            <Excerpt>
              <Html2React html={projectObj.excerpt.rendered} />
            </Excerpt>

            <CallToAction href={projectObj.link} theme={state.theme}>Read More</CallToAction>
          </Project>
        )
      })}
    </ProjectsContainer>
  )
}

export default connect(ProjectsList)

const ProjectsContainer = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: wrap;

  padding: 0 1rem;
`

const Project = styled.div`
  max-width: calc(50% - 5rem);
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 3rem;
  margin: 0.5rem auto 3rem;
  
  ${props => props.theme.breakPoints.lg} {
    max-width: calc(50% - 2rem);
  }

  ${props => props.theme.breakPoints.sm} {
    max-width: 100%;
  }
`

const Excerpt = styled.div`
  margin-bottom: 2rem;
`

const ProjectImage = styled.div`
  width: 100%;
  padding-bottom: 150%;
  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: 100%;
  background-size: cover;
  background-position: center;
`

const ProjectTitle = styled.h3`
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  margin-top: 4.5rem;
  letter-spacing: 1px;
  font-size: 1.25rem;
  font-style: normal;
  color: ${props => props.theme.colors.darkBlue};
`

const CallToAction = styled(Link)`
  display: inline-block;
  ${props => props.theme.buttonStyle}
  margin-top: auto;
  margin-bottom: 0;
`