import React from 'react'
import {connect, styled, css} from 'frontity'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhoneAlt, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faFacebookSquare, faLinkedin, faInstagramSquare, faYoutubeSquare, faTwitterSquare, faPinterestSquare} from '@fortawesome/free-brands-svg-icons'

import Image from '@frontity/components/image'

import Link from '../partials/link'

const Footer = ({state, libraries}) => {
  const {items} = state.source.get('/menus/footer-menu')
  const options = state.source.get('acf-options-page')
  
  const Html2React = libraries.html2react.Component

  const {name} = (state.source.get('nameAndDescription'))
  const logo = options.acf.logo.footer
  const footerText = options.acf.footer_text
  const footerForm = options.acf.footer_form
  const phone = options.acf.address.phone_number
  const email = options.acf.address.email
  const areThereLinks = items != null && items.length > 0
  const socialMedia = options.acf.social_media

  return (
    <FooterContainer theme={state.theme}>
      <FooterRow theme={state.theme}>
        <FooterColumn theme={state.theme}>
          <Image src={logo.url} alt={name} />

          <p>{footerText}</p>

          <OrangeHardRule theme={state.theme} />

          <div><a css={css`font-weight: normal;`} href={`+1${phone.replace(/[^\d]/g, '')}`}><OrangeIcon icon={faPhoneAlt} theme={state.theme} css={css`margin-right: .5rem;`}/><ContactText theme={state.theme}> {phone}</ContactText></a></div>
          <div css={css`margin-top: .5rem;`}><a css={css`font-weight: normal;`} href={`mailto:${email}`} target="_blank" rel="nofollow noreferrer"><OrangeIcon icon={faEnvelope} theme={state.theme} css={css`margin-right: .5rem;`}/><ContactText theme={state.theme}> {email}</ContactText></a></div>
        </FooterColumn>

        <FooterColumn theme={state.theme}>
          <h3>Social Media</h3>
          {socialMedia.youtube && <SocialMediaLink target="_blank" rel="nofollow noreferrer" href={socialMedia.youtube}><FontAwesomeIcon icon={faYoutubeSquare} /></SocialMediaLink>}
          {socialMedia.instagram &&<SocialMediaLink target="_blank" rel="nofollow noreferrer" href={socialMedia.instagram}><FontAwesomeIcon icon={faInstagramSquare} /></SocialMediaLink>}
          {socialMedia.facebook &&<SocialMediaLink target="_blank" rel="nofollow noreferrer" href={socialMedia.facebook}><FontAwesomeIcon icon={faFacebookSquare} /></SocialMediaLink>}
          {socialMedia.linkedin && <SocialMediaLink target="_blank" rel="nofollow noreferrer" href={socialMedia.linkedin}><FontAwesomeIcon icon={faLinkedin} /></SocialMediaLink>}
          {socialMedia.twitter && <SocialMediaLink target="_blank" rel="nofollow noreferrer" href={socialMedia.twitter}><FontAwesomeIcon icon={faTwitterSquare} /></SocialMediaLink>}
          {socialMedia.pinterest && <SocialMediaLink target="_blank" rel="nofollow noreferrer" href={socialMedia.pinterest}><FontAwesomeIcon icon={faPinterestSquare} /></SocialMediaLink>}

          <h3 css={css`margin-top: 3rem`}>Site Map</h3>

          {areThereLinks &&
            <nav>
              <UnstyledList>
                {items.map(({title, url}, index) => (
                    <li key={index}>
                      <Link href={libraries.source.normalize(url)}>{title}</Link>
                    </li>
                  )
                )}
              </UnstyledList>
            </nav>
          }
        </FooterColumn>
        
        <FooterColumn theme={state.theme}>
          <FooterForm theme={state.theme}>
            <h3 dangerouslySetInnerHTML={{__html: `Contact ${name}`}} />
            <Html2React html={footerForm} />
          </FooterForm>
        </FooterColumn>
      </FooterRow>
    </FooterContainer>
  )
}

export default connect(Footer)

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.darkBlue};
  padding: 3rem;
  color: ${props => props.theme.colors.offWhite};

  ${props => props.theme.breakPoints.sm} {
    padding: 3rem 0.5rem;
  }

  img {
    max-width: 33%;
    margin: 0 auto 1rem;
  }

  a {
    &, &:visited {
      color: ${props => props.theme.colors.offWhite};
    }

    &:hover,
    &:focus {
      color: ${props => props.theme.colors.orange};
    }
  }

  h3 {
    text-transform: uppercase;
    font-size: 85%;
  }
`

const FooterRow = styled.div`
  display: flex;
  max-width: 1240px;
  margin: 0 auto;
  justify-content: space-around;
  flex-wrap: wrap;

  ${props => props.theme.breakPoints.lg} {
    flex-direction: column-reverse;
    justify-content: center;
    text-align: center;
  }
`

const FooterColumn = styled.div`
  width: calc(33% - 1rem);

  ${props => props.theme.breakPoints.lg} {
    width: calc(67% - 2rem);
    margin: .5rem auto;
  }

  ${props => props.theme.breakPoints.md} {
    width: calc(100% - 2rem);
    margin: 1rem auto;
  }
`

const OrangeHardRule = styled.hr`
  margin: 3rem 0;
  border: 0;
  height: 0;
  border-top: 1px solid ${props => props.theme.colors.orange};
`

const OrangeIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.colors.orange};
`

const ContactText = styled.span`
  ${props => props.theme.breakPoints.sm} {
    font-size: 0.67rem;
  }
`

const UnstyledList = styled.ul`
  list-style: none;
  padding-left: 0;

  a {
    font-weight: normal;
  }
`

const SocialMediaLink = styled.a`
  font-size: 2rem;
  margin: 0.5rem;
`

const FooterForm = styled.div`
  ${props => props.theme.formStyle}
`