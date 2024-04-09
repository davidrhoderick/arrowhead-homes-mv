import Root from './components/index'
import image from '@frontity/html2react/processors/image'
import {css} from 'frontity'

const menuHandler = {
  name: 'menus',
  priority: 10,
  pattern: '/menus/:slug',
  func: async ({ route, params, state, libraries }) => {
    const { api } = libraries.source
    const { slug } = params

    const response = await api.get({
      endpoint: `/menus/v1/locations/${slug}`
    })

    const items = await response.json()
    const currentPageData = state.source.data[route]

    Object.assign(currentPageData, {
      slug,
      items: items.items,
      isMenu: true
    })
  }
}

const acfOptionsHandler = {
  pattern: 'acf-options-page',
  func: async ({ route, state, libraries }) => {
    const response = await libraries.source.api.get({
      endpoint: `/acf/v3/options/options`
    })
    const option = await response.json()

    const data = state.source.get(route)
    Object.assign(data, { ...option, isAcfOptionsPage: true })
  }
}

const themeColors = {
  darkBlue: '#22292f',
  midDarkBlue: '#44555d',
  blue: '#658995',
  lightBlue: '#eef2f2',
  offWhite: '#f7f7f5',
  lightGrey: '#e8e8e8',
  orange: '#ec7141',
  midDarkGrey: '#909497',
  darkGrey: '#6d6d6d'
}

const buttonStyle = css`
  font-family: proxima-nova, sans-serif;
  border: 1px solid ${themeColors.orange};
  padding: .75em 1.25em;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  color: ${themeColors.midDarkBlue};

  transition: all .125s linear;

  &:focus,
  &:hover {
    color: ${themeColors.offWhite};
    background: ${themeColors.orange};
  }
`

export default {
  name: 'arrowhead-homes-mv-theme',
  roots: {
    theme: Root
  },
  state: {
    theme: {
      colors: themeColors,
      breakPoints: {
        sm: `@media (max-width: 576px)`,
        md: `@media (max-width: 768px)`,
        lg: `@media (max-width: 992px)`,
        xl: `@media (max-width: 1200px)`,
        xxl: `@media (min-width: 1400px)`
      },
      buttonStyle: buttonStyle,
      formStyle: css`
        form {
          > p {
            text-align: right;
            margin-bottom: 0;
          }

          label {
            position: absolute;
            left: -10000px;
            overflow: hidden;
            width: 1px;
            height: 1px;
            top: auto;
          }
        
          input, textarea {
            padding: .75rem;
            width: 100%;
          }
        
          input[type="submit"] {
            ${buttonStyle};
            width: auto !important;

            margin-top: .75rem;
        
            background: ${themeColors.midDarkBlue};
            border: ${themeColors.midDarkBlue};
            color: ${themeColors.offWhite};
          }
        }
      `
    }
  },
  actions: {
    theme: {
      beforeSSR: async ({ libraries, actions }) => {
        await actions.source.fetch('/menus/primary-menu')
        await actions.source.fetch('/menus/footer-menu')
        await actions.source.fetch('acf-options-page')
        await actions.source.fetch('/projects')

        libraries.html2react.processors.push(image)

        libraries.source.handlers.push({
          name: 'nameAndDescription',
          priority: 10,
          pattern: 'nameAndDescription',
          func: async ({ route, state, libraries }) => {
            const response = await libraries.source.api.get({
              endpoint: '/'
            })
      
            const { name, description } = await response.json();
      
            state.source.data[route].name = name;
            state.source.data[route].description = description;
          }
        })

        await actions.source.fetch('nameAndDescription')
      },
      beforeCSR: async ({ libraries }) => {
        libraries.html2react.processors.push(image)
      }
    }
  },
  libraries: {
    html2react: {
      processors: [image]
    },
    source: {
      handlers: [menuHandler, acfOptionsHandler]
    }
  }
}