import React from 'react'
import {connect, styled} from 'frontity'

import Link from './partials/link'

const PageError = ({state, libraries}) => (
  <PageErrorContainer theme={state.theme}>
    <h1>Oops!</h1>

    <h2>Looks like you're a bit lost...</h2>

    <p>Maybe try a link in the header above or in the site map at the bottom of the page.</p>
    
    <p>If you think you got to this page and the mistake is on our end, please use the contact form in the footer or on our <Link href={libraries.source.normalize('/contact-us/')}>Contact Us page</Link> to send us an email or give us a call.  In the email, let us know what you were trying to find and what you expected to see.</p>
  </PageErrorContainer>
)

export default connect(PageError)

const PageErrorContainer = styled.div`
  max-width: 1240px;
  padding: 0 3rem;
  margin: 2rem 0 4rem;

  ${props => props.theme.breakPoints.sm} {
    margin-top: 1rem;
    padding: 0 1rem;
  }

  h1 {
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;

    color: ${props => props.theme.colors.orange};
  }
`