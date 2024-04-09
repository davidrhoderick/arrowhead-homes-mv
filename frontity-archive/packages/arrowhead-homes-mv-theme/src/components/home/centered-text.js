import React from 'react'
import {connect, styled} from 'frontity'

import Link from '../partials/link'

const CenteredText = ({section, state, libraries}) => {
  const Html2React = libraries.html2react.Component
  
  return(
    <CenteredTextContainer theme={state.theme}>
      <h2 dangerouslySetInnerHTML={{__html: section.title}}/>

      <div><Html2React html={section.content} /></div>

      <CallToAction href={libraries.source.normalize(section.cta.url)} theme={state.theme}>{section.cta.title}</CallToAction>
    </CenteredTextContainer>
  )
}

export default connect(CenteredText)

const CenteredTextContainer = styled.section`
  margin: 3rem;
  text-align: center;

  div {
    margin: 2rem auto;
    max-width: 960px;
  }

  &:before, &:after {
    content: '';
    display: block;
    width: 50%;
    height: 1px;
    background: ${props => props.theme.colors.orange};
    margin: 2rem auto;
  }
`
const CallToAction = styled(Link)`
  clear: both;
  display: inline-block;
  ${props => props.theme.buttonStyle}
`