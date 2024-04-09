import React, {useState, useRef, useEffect} from 'react'
import {connect, styled} from 'frontity'
import Modal from 'react-modal'
import Slider from 'react-slick'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons'

Modal.setAppElement('#root')

const PrevButton = ({className, style, onClick, theme}) => (
  <CustomSlickButton theme={theme} style={{...style, zIndex: '100'}} className={className} onClick={onClick} icon={faAngleLeft} />
)

const NextButton = ({className, style, onClick, theme}) => (
  <CustomSlickButton theme={theme} style={{...style}} className={className} onClick={onClick} icon={faAngleRight} />
)

const Gallery = ({gallery, state}) => {
  let imageIndex = -1
  let slideshowArray = []
  const slider = useRef(null)
  const [showSlideshow, setSlideshowDisplay] = useState(false)

  gallery.map(({images}) => {
    if(images) {
      images.map((image) => {
        slideshowArray.push(image)
      })
    }
  })

  const settings = {
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextButton theme={state.theme} />,
    prevArrow: <PrevButton theme={state.theme} />
  }

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: '1001'
    },
    content: {
      background: 'transparent',
      marginTop: '2rem',
      border: 'none',
      overflow: 'hidden',
      inset: '0',
      padding: '0'
    }
  }

  const [modalIsOpen, setIsOpen] = useState(false)

  const [currentSlide, setCurrentSlide] = useState(0)

  const openModal = (goToIndex) => {
    setCurrentSlide(goToIndex)
    setIsOpen(true)
  }

  const afterOpenModal = () => {
    slider.current.slickGoTo(currentSlide, true)
    setSlideshowDisplay(true)
  }

  const closeModal = () => {
    setSlideshowDisplay(false)
    setIsOpen(false)
  }

  return (
    <>
      <GalleryContainer theme={state.theme}>
        {gallery.map(({images}, rowIndex) => {
          return (
            <GalleryRow key={rowIndex} length={images.length} theme={state.theme}>
              {images && images.map(({sizes}) => {
                imageIndex++
                const currentIndex = imageIndex

                return (
                  <GalleryImage src={sizes.large} key={imageIndex} onClick={() => openModal(currentIndex)} />
                )
              })}
            </GalleryRow>
          )
        })}
      </GalleryContainer>

      <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Project Gallery"
          style={customStyles}
        >
          <CloseButton onClick={closeModal} theme={state.theme}><WhiteIcon icon={faTimes} theme={state.theme}/></CloseButton>
        
          <CustomSlider {...settings} ref={slider} show={showSlideshow} theme={state.theme}>
            {slideshowArray.map(({sizes}, index) => {
              return (
                <Slide key={index}>
                  <img src={sizes.large} />
                </Slide>
              )
            })}
          </CustomSlider>
        </Modal>
      </>
  )
}

export default connect(Gallery)

const GalleryContainer = styled.div`
  max-width: 1020px;
  margin: 3rem auto;
`

const GalleryRow = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  ${props => props.theme.breakPoints.md} {
    margin-bottom: 1rem;
  }

  ${props => props.theme.breakPoints.sm} {
    margin-bottom: 0;
  }

  img {
    width: calc(100% / ${props => props.length} - 2rem);
  
    ${props => props.theme.breakPoints.md} {
      width: calc(100% / ${props => props.length} - 1rem);
    }

    ${props => props.theme.breakPoints.sm} {
      width: 100%;
      margin: .5rem 1rem;
    }
  }
`

const GalleryImage = styled.img`
  max-width: 100%;
  object-fit: cover;
  margin: 0 auto;
  cursor: pointer;
`

const CloseButton = styled.button`
  background: transparent;
  cursor: pointer;
  position: absolute;
  right: 2rem;
  top: 0rem;
  z-index: 100;

  ${'' /* ${props => props.theme.breakPoints.sm} {
    top: 2rem;
    right: 2rem;
  } */}
`

const WhiteIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 1.5rem;
`

const CustomSlider = styled(Slider)`
  opacity: ${props => props.show ? '1.0' : '0'};

  transition: opacity 0.5s;
  padding-top: 3rem;

  ${props => props.theme.breakPoints.sm} {
    padding-top: 0;
  }

  .slick-prev {
    left: 5%;

    ${props => props.theme.breakPoints.xl} {
      left: .5rem;
    }
  }

  .slick-next {
    right: 5%;

    ${props => props.theme.breakPoints.xl} {
      right: .5rem;
    }
  }
`

const Slide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  overflow: hidden;

  img {
    object-fit: scale-down;
    height: 75vh;
    margin: 0 auto;
  }
`

const CustomSlickButton = styled(FontAwesomeIcon)`
  height: 40px !important;
  width: 20px !important;
  font-size: 1.75rem;
  color: white;
  ${'' /* margin-top: 1rem; */}

  &:hover {
    color: ${props => props.theme.colors.offWhite};
  }
`