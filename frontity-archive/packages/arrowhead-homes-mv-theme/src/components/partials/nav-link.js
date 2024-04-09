import React from 'react'
import {connect, styled} from 'frontity'

import Link from './link'

const NavLink = ({navLink, closeMobileMenu, state, libraries}) => {
  const {url, title} = navLink
  const link = libraries.source.normalize(url)

  return (
    <StyledNavLink
      href={link}
      theme={state.theme}
      clickHandler={closeMobileMenu}
      active={state.router.link === link}
      aria-current={state.router.link === link ? 'page' : undefined}
    >
      {title}
    </StyledNavLink>
  )
}

export default connect(NavLink)

const StyledNavLink = styled(Link)`
  display: inline-block;
  padding: 0.5rem;
  margin: 0 1rem;
  text-decoration: none;
  cursor: pointer;
  font-weight: 400;
  position: relative;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: bold;

  &:visited {
    colors: ${props => props.theme.colors.darkBlue} !important;
  }
  
  ${props => props.active && `color: ${props.theme.colors.darkBlue};`}
`