import React from 'react'
import {connect, styled} from 'frontity'

import Image from '@frontity/components/image'

import Link from '../partials/link'

const About = ({state, section, libraries}) => {
  const Html2React = libraries.html2react.Component

  return(
    <AboutContainer theme={state.theme}>
      <AboutRow>
        <AboutColumn>
          <h2 dangerouslySetInnerHTML={{__html: section.title}} />

          <Html2React html={section.content} />

          <CallToAction theme={state.theme} href={libraries.source.normalize(section.cta.url)}>{section.cta.title}</CallToAction>
        </AboutColumn>

        <AboutColumn>
          <Image src={section.image.sizes.medium_large} />
        </AboutColumn>
      </AboutRow>
    </AboutContainer>
  )
}

export default connect(About)

const AboutContainer = styled.section`
  padding: 3rem 1rem;
  background: ${props => props.theme.colors.lightGrey};
`

const AboutRow = styled.div`
  display: flex;
  max-width: 1020px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`

const AboutColumn = styled.div`
  width: calc(60% - 1rem);

  &:first-of-type {
    width: calc(40% - 1rem);
  }
`

const CallToAction = styled(Link)`
  ${props => props.theme.buttonStyle}
  display: inline-block;
  margin-top: 1rem;
`