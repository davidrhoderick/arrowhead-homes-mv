import React, {useState} from 'react'
import {connect, styled} from 'frontity'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons'

import Image from '@frontity/components/image'

import Link from '../partials/link'
import NavLink from '../partials/nav-link'
import DropdownNavLink from '../partials/dropdown-nav-link'

const MobileNavToggle = ({theme, clickHandler}) => {
  return (
    <StyledMobileNavToggle theme={theme} onClick={clickHandler}>
      <span></span>
      <span></span>
      <span></span>
    </StyledMobileNavToggle>
  )
}

const Header = ({state}) => {
  const {items} = state.source.get('/menus/primary-menu')
  const options = state.source.get('acf-options-page')

  const {name} = (state.source.get('nameAndDescription'))
  const logo = options.acf.logo.navbar
  const areThereLinks = items != null && items.length > 0
  const phoneNumber = options.acf.address.phone_number

  const [mobileMenuShown, toggleMobileMenu] = useState(false)

  return (
    <StyledHeader theme={state.theme}>
      <Link href="/" clickHandler={() => toggleMobileMenu(false)}>{ logo ? <Image src={logo.url} alt={name}/> : <h1 dangerouslySetInnerHTML={{__html:name}} /> }</Link>

      <DesktopNav theme={state.theme}>
        {phoneNumber && <PhoneNumber href={`tel:+1${phoneNumber.replace(/\D/g, '')}`}><OrangeIcon icon={faPhoneAlt} theme={state.theme}/> {phoneNumber}</PhoneNumber>}

        <div>
          {areThereLinks &&
            items.map((item, index) => {
              const {child_items} = item

              if(typeof child_items !== 'undefined' && child_items.length > 0) {
                return <DropdownNavLink navLink={item} key={index} closeMobileMenu={() => toggleMobileMenu(false)} />
              }

              return <NavLink navLink={item} key={index} closeMobileMenu={() => toggleMobileMenu(false)} />
            })}
        </div>
      </DesktopNav>

      <MobileNavToggle theme={state.theme} clickHandler={() => toggleMobileMenu(!mobileMenuShown)} />

      <MobileNav theme={state.theme} showMenu={mobileMenuShown}>
        {areThereLinks &&
          items.map((item, index) => {
            const {child_items} = item

            if(typeof child_items !== 'undefined' && child_items.length > 0) {
              return <DropdownNavLink navLink={item} key={index} closeMobileMenu={() => toggleMobileMenu(false)} />
            }

            return <NavLink navLink={item} key={index} closeMobileMenu={() => toggleMobileMenu(false)} />
          })}


        {phoneNumber && <PhoneNumber href={`tel:+1${phoneNumber.replace(/\D/g, '')}`}><OrangeIcon icon={faPhoneAlt} theme={state.theme}/> {phoneNumber}</PhoneNumber>}
      </MobileNav>
    </StyledHeader>
  )
}

export default connect(Header)

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  position: fixed;
  line-height: 1rem;
  height: 5rem;
  z-index: 1000;

  background: ${props => props.theme.colors.offWhite};

  > a {
    max-width: 20%;

    img {
      max-width: 100%;
      max-height: 3rem;
      padding: .5rem;
    }
  }

  ${props => props.theme.breakPoints.lg} {
    padding: 1rem;
    height: 3.5rem;

    > a {
      max-width: 67%;
    
      img {
        max-width: 75%;
        max-height: 3rem;
      }
    }

    justify-content: space-between;
  }
`

const DesktopNav = styled.nav`
  width: 100%;
  padding-top: .5rem;

  ${props => props.theme.breakPoints.lg} {
    display: none;
  }

  > div {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;

    ${props => props.theme.breakPoints.lg} {
      > div, > a {
        margin: 0 auto;
      }
    }
  }
`

const PhoneNumber = styled.a`
  float: right;
  margin-right: 1rem;
  padding: .5rem;
  font-size: 0.9rem;
`

const OrangeIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.colors.orange};
  font-size: 0.75rem;
  vertical-align: middle;
  margin-right: 0.05rem;
`

const StyledMobileNavToggle = styled.button`
  display: none;

  ${props => props.theme.breakPoints.lg} {
    display: block;

    height: 3rem;
    width: 1.25rem;
    background: transparent;
    outline: none;
    border: none;

    cursor: pointer;
    
    span {
      width: 100%;
      height: 5.5%;
      margin-bottom: 20%;
      display: block;
      background: ${props => props.theme.colors.darkBlue};
      border-radius: 10px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`

const MobileNav = styled.nav`
  display: none;

  ${props => props.theme.breakPoints.lg} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-height: ${props => props.showMenu ? '400px' : '0'};
    transition: max-height 0.25s ease-in-out;

    overflow: hidden;
    
    background: ${props => props.theme.colors.offWhite};

    position: absolute;
    left: 0;
    right: 0;
    top: 3.5rem;

    > div, > a {
      width: auto;
      display: inline-block;
      margin: .5rem;
    }
  }
`