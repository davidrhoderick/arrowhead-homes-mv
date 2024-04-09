import React from 'react'
import {connect, styled, css} from 'frontity'

const Page = ({state, libraries, theme}) => {
  const Html2React = libraries.html2react.Component
  const data = state.source.get(state.router.link)
  const post = state.source[data.type][data.id]

  return (
    <PageContainer theme={state.theme}>
      <h1 dangerouslySetInnerHTML={{__html: post.title.rendered}} />

      <Html2React html={post.content.rendered} />
    </PageContainer>
  )
}

export default connect(Page)

const PageContainer = styled.div`
  max-width: 1240px;
  padding: 0 2rem;
  margin: 1rem auto 2rem;
  

  h1 {
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    margin-bottom: 1rem;
  }

  ${props => props.theme.formStyle}

  form {
    max-width: 960px;
    margin: 0 auto;
  }  
`