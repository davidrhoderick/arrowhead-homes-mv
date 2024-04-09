import React from 'react'
import {connect, styled} from 'frontity'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const Loading = ({state}) => {
  return (
    <LoadingPage>
      <Loader type="Bars" color={state.theme.colors.midDarkBlue} height={80} width={80} />
    </LoadingPage>
  )
}

export default connect(Loading)

const LoadingPage = styled.div`
  margin: 10rem auto;
  text-align: center;
`