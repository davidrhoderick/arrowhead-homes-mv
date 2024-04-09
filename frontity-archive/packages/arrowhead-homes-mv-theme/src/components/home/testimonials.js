import React from 'react'
import {connect, styled} from 'frontity'
import Slider from 'react-slick'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons'

const PrevButton = ({className, style, onClick, theme}) => (
  <CustomSlickButton theme={theme} style={{...style, left: '8.33%', zIndex: '100'}} className={className} onClick={onClick} icon={faAngleLeft} />
)

const NextButton = ({className, style, onClick, theme}) => (
  <CustomSlickButton theme={theme} style={{...style, right: '8.33%'}} className={className} onClick={onClick} icon={faAngleRight} />
)

const Testimonials = ({section, state}) => {
  const settings = {
    nextArrow: <NextButton theme={state.theme} />,
    prevArrow: <PrevButton theme={state.theme} />
  }

  return(
    <TestimonialsContainer theme={state.theme}>
      <Slider {...settings}>
        {section.testimonials.map(({quote, citation}, index) => (
          <Testimonial key={index}>
            <Quote>{quote}</Quote>
            <Citation>{citation}</Citation>
          </Testimonial>
        ))}
      </Slider>
    </TestimonialsContainer>
  )
}

export default connect(Testimonials)

const TestimonialsContainer = styled.section`
  background: ${props => props.theme.colors.lightGrey};
  padding: 4.5rem 0;
`

const CustomSlickButton = styled(FontAwesomeIcon)`
  height: 40px !important;
  width: 20px !important;
  font-size: 1.75rem;
  color: ${props => props.theme.colors.orange};

  &:hover {
    color: ${props => props.theme.colors.darkBlue};
  }
`

const Testimonial = styled.div`
  text-align: center;
  padding: 0 16.67%;
`

const Quote = styled.p`
  font-size: 1.25rem;
`

const Citation = styled.p`
  font-size: .9rem
`