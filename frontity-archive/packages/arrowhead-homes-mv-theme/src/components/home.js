import React from 'react'
import {connect} from 'frontity'
import Switch from '@frontity/components/switch'

import HeroGallery from './home/hero-gallery'
import Testimonials from './home/testimonials'
import CenteredText from './home/centered-text'
import FeaturedProjects from './home/featured-projects'
import About from './home/about'
import BannerText from './home/banner-text'
import Map from './home/map'

const Home = ({state}) => {
  const data = state.source.get(state.router.link)
  const post = state.source[data.type][data.id]

  return (
    <>
      {post.acf.content.map((section, index) =>
        <Switch key={index}>
          <HeroGallery when={section.acf_fc_layout === 'hero_gallery'} section={section} />
          <Testimonials when={section.acf_fc_layout === 'testimonials'} section={section} />
          <CenteredText when={section.acf_fc_layout === 'centered_text'} section={section} />
          <FeaturedProjects when={section.acf_fc_layout === 'featured_projects'} section={section} />
          <About when={section.acf_fc_layout === 'about'} section={section} />
          <BannerText when={section.acf_fc_layout === 'banner_text'} section={section} />
          <Map when={section.acf_fc_layout === 'map'} section={section} />
        </Switch>
      )}
    </>
  )
}

export default connect(Home)