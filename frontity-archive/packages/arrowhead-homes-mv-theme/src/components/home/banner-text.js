import React from 'react'
import {connect, styled} from 'frontity'

const BannerText = ({state, section}) => <BannerTextContainer theme={state.theme}><h2 dangerouslySetInnerHTML={{__html: section.text}} /></BannerTextContainer>

export default connect(BannerText)

const BannerTextContainer = styled.section`
  background: ${props => props.theme.colors.midDarkBlue};
  padding: 1.5rem 1rem;

  h2 {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0;
    color: ${props => props.theme.colors.lightGrey};
  }
`