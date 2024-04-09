import React, {useEffect} from 'react'
import {connect, Global, css, styled} from 'frontity'
import Switch from '@frontity/components/switch'
import {dom, config} from '@fortawesome/fontawesome-svg-core'
import document from 'global/document'

import slickCSS from 'slick-carousel/slick/slick.css'
import slickThemeCSS from 'slick-carousel/slick/slick-theme.css'
import slickEOT from 'slick-carousel/slick/fonts/slick.eot'
import slickSVG from 'slick-carousel/slick/fonts/slick.svg'
import slickTTF from 'slick-carousel/slick/fonts/slick.ttf'
import slickWOFF from 'slick-carousel/slick/fonts/slick.woff'

import Header from './global/header'
import Footer from './global/footer'

import Loading from './loading'
// import Home from './home'
import Post from './post'
import Archive from './archive'
import PageError from './page-error'

config.autoAddCss = false

const Root = ({state}) => {
  const data = state.source.get(state.router.link)

  useEffect(() => {
    (function(d) {
      var config = {
        kitId: 'hpo2gpm',
        scriptTimeout: 3000,
        async: true
      },
      h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
    }(document))
  }, [])

  return (
    <>
      <Global
        styles={css`
          ${dom.css()}

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
          }

          html {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          html, body {
            font-size: 18px;
            font-family: proxima-nova, sans-serif;
            line-height: 1.6;
            font-weight: 400;
            color: ${state.theme.colors.darkBlue};
            background: ${state.theme.colors.offWhite};
          }

          #root {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
          }

          button {
            border: 0;
            outline: 0;
            letter-spacing: 2px;
            line-height: 1.2;

            &::-moz-focus-inner {
              border: 0;
            }
          }

          ul, ol {
            padding-left: 2rem;
          }

          h1, h2, h3, h4, h5, ul, ol, p {
            margin-bottom: 25px;
          }

          h1 {
            font-size: 40px;
            font-weight: 800;
            color: ${state.theme.colors.darkBlue};
            line-height: 1.2;
            margin-top: 0;
            margin-bottom: 10px;
            letter-spacing: 2px;
            word-spacing: 0;
            text-transform: uppercase;
          }

          h2 {
            font-size: 24px;
            font-weight: 600;
            color: ${state.theme.colors.midDarkBlue};
            line-height: 1.2;
            margin-top: 25px;
            margin-bottom: 20px;
            text-transform: uppercase;
          }

          h3, h4 {
            font-size: 18px;
            font-weight: 600;
            line-height: 1.4;
            margin-top: 5px;
            margin-bottom: 5px;
          }

          h3 {
            ${'' /* color: ${state.theme.colors.blue}; */}
          }

          h4 {
            ${'' /* color: ${state.theme.colors.darkBlue}; */}
          }

          a {
            text-decoration: none;
            transition: 0.125s all ease-in-out;
            color: ${state.theme.colors.midDarkBlue};
            font-weight: bold;

            &:visited {
              color: ${state.theme.colors.midDarkBlue};
            }

            &:active, &:hover, &:focus {
              color: ${state.theme.colors.orange};
            }
            
            cursor: pointer;
          }

          img {
            display: block;
            max-width: 100%;
          }

          ${css(slickCSS)}
          ${css(slickThemeCSS)}

          @font-face {
            font-family: 'slick';
            src: url('${slickEOT}');
            src: url('${slickEOT}?#iefix') format('embedded-opentype'), url('${slickWOFF}') format('woff'), url('${slickTTF}') format('truetype'), url('${slickSVG}#slick') format('svg');
          }
        `}
      />

      <Header />

      <SiteContent theme={state.theme}>
        <Switch>
          <Loading when={data.isFetching} />
          {/* <Home when={data.isHome} /> */}
          <Post when={data.isPostType} />
          <Archive when={data.isArchive || data.isHome} />
          <PageError when={data.isError} />
        </Switch>
      </SiteContent>
      
      <Footer />
    </>
  )
}

export default connect(Root)

const SiteContent = styled.main`
  margin-top: 5rem;
  flex: 1;

  ${props => props.theme.breakPoints.md} {
    margin-top: 3.5rem;
  }
`