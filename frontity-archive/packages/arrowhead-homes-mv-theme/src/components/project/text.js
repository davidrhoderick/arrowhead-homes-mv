import React from 'react'
import {connect, styled} from 'frontity'

const Text = ({project, state, libraries}) => {
  const Html2React = libraries.html2react.Component

  return (
    <TextContainer theme={state.theme}>
      <div>
        <h1 dangerouslySetInnerHTML={{__html: project.title.rendered}} />

        <Html2React html={project.content.rendered} />
      </div>
    </TextContainer>
  )
}

export default connect(Text)

const TextContainer = styled.div`
  background: ${props => props.theme.colors.lightGrey};

  padding: 3rem 1rem;

  ${props => props.theme.breakPoints.md} {
    padding: 1rem;
  }

  > div {
    max-width: 1020px;
    margin: 0 auto;

    p {
      margin: 1.5rem 0;
    }

    ${props => props.theme.breakPoints.sm} {
      h1 {
        font-size: 1.67rem;
      }
      
      h2 {
        font-size: 1.33rem;
      }

      h3 {
        font-size: 1.17rem;
      }
    }
  }
`