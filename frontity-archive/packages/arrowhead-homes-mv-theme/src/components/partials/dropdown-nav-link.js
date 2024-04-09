import React, {useState} from 'react'
import {connect, styled} from 'frontity'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'

import NavLink from './nav-link'

const DropdownNavLink = ({navLink, state, closeMobileMenu}) => {
  const {title, child_items} = navLink
  const [dropdownShown, toggleDropdown] = useState(false)

  return (
    <StyledDropdownContainer theme={state.theme}
      onClick={() => toggleDropdown(!dropdownShown)}
      onMouseEnter={() => toggleDropdown(true)}
      onMouseLeave={() => toggleDropdown(false)}
      showDropdown={dropdownShown}
      theme={state.theme}
    >
      <DropdownParent theme={state.theme} showDropdown={dropdownShown} onClick={() => toggleDropdown(!dropdownShown)}>{title} <FontAwesomeIcon icon={faAngleDown} /></DropdownParent>

      <Dropdown theme={state.theme} show={dropdownShown}>{child_items.map((navLink, index) => (
        <NavLink key={index} navLink={navLink} closeMobileMenu={closeMobileMenu}>{title}</NavLink>))}
      </Dropdown>
    </StyledDropdownContainer>
  )
}

export default connect(DropdownNavLink)

const DropdownParent = styled.button`
  color: ${props => props.showDropdown ? props.theme.colors.orange : props.theme.colors.darkBlue} !important;
  transition: all 0.125s linear !important;

  ${props => props.theme.breakPoints.md} {
    margin: .5rem;
  }
`

const StyledDropdownContainer = styled.div`
  display: inline-block;
  position: relative;
`

const Dropdown = styled.div`
  position: absolute;
  padding: .5rem;
  display: ${props => props.show ? 'flex' : 'none'};
  flex-direction: column;
  background: ${props => props.theme.colors.offWhite};

  ${props => props.theme.breakPoints.md} {
    display: flex;
    padding: 0 0 0 0.5rem;
    overflow: hidden;
    position: relative;
    max-height: ${props => props.show ? '200px' : '0'};
    transition: max-height 0.5s ease-in-out;
  }
`