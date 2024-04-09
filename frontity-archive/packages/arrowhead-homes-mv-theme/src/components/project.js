import React from 'react'
import {connect, styled} from 'frontity'

import Hero from './project/hero'
import Text from './project/text'
import Gallery from './project/gallery'
import TextAfterGallery from './project/text-after-gallery'

const Project = ({state}) => {
  const data = state.source.get(state.router.link)
  const project = state.source[data.type][data.id]
  const featuredImage = state.source.attachment[project.featured_media]

  return (
    <ProjectContainer>
      <Hero image={project.acf.drone_photo ? project.acf.drone_photo.sizes.large : featuredImage.media_details.sizes.full.source_url} />
      <Text project={project}/>
      <Gallery gallery={project.acf.gallery} />
      <TextAfterGallery text={project.acf.text_after_gallery}/>
    </ProjectContainer>
  )
}

export default connect(Project)

const ProjectContainer = styled.section``