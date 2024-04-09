import React from 'react'
import {connect, styled} from 'frontity'

const Hero = ({image, state}) => <HeroImage theme={state.theme} image={image} />

export default connect(Hero)

const HeroImage = styled.div`
  width: 100%;
  padding-bottom: 40%;
  background-image: url(${props => props.image});
  background-position: center;
  background-size: 100%;
  background-size: cover;
  background-position: center;

  ${props => props.theme.breakPoints.sm} {
    padding-bottom: 67%;
  }
`