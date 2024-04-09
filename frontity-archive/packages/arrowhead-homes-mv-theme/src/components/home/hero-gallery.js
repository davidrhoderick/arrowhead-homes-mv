import React, {useState, useEffect} from 'react'
import {connect, styled} from 'frontity'

import Link from '../partials/link'

const HeroGallery = ({section, state, libraries}) => {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const slide = setTimeout(() => {
                    setActiveSlide((activeSlide === section.images.length - 1 ? 0 : activeSlide + 1))
                  }, 5000)

    return () => clearTimeout(slide)
  })

  return(
    <HeroGalleryContainer>
      <GallerySlideshow>
        {section.images.map((image, index) => (
          <GalleryImage key={index} image={image.url} activeSlide={index === activeSlide} previousSlide={index === activeSlide - 1} />  
        ))}
      </GallerySlideshow>

      <TextContainer theme={state.theme}>
        <div>
          {section.logo.url && <Image src={section.logo.url} alt={section.logo.alt} />}
          <h1>{section.tagline}</h1>
          <Link href={libraries.source.normalize(section.cta.url)}>{section.cta.title}</Link>
        </div>
      </TextContainer>
    </HeroGalleryContainer>
  )
}

export default connect(HeroGallery)

const HeroGalleryContainer = styled.section`
  position: relative;
`

const GallerySlideshow = styled.div`
  position: relative;
  padding-bottom: 40%;
`

const GalleryImage = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-size: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.image});
  transition: opacity 0.5s;
  z-index: 0;
  opacity: 0;

  ${props => props.activeSlide ? `opacity: 1; z-index: 1;` : ``}

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background: rgba(255, 255, 255, 0.5);
  }
`

const TextContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 75%;
    text-align: center;

    img {
      max-width: 50%;
      margin: 0 auto;
      max-height: 7rem;
    }

    h1 {
      text-transform: uppercase;
      font-size: 1.5rem;
      margin: 0.5em 0 1em;
    }

    a {
      ${props => props.theme.buttonStyle}

      border-color: ${props => props.theme.colors.darkBlue};
      color: ${props => props.theme.colors.offWhite};
      background: ${props => props.theme.colors.darkBlue};

      &:hover {
        background: ${props => props.theme.colors.orange};
        border-color: ${props => props.theme.colors.orange};
      }
    }
  }
`