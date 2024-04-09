import React, {useState} from 'react'
import {connect, styled} from 'frontity'
import {GoogleMap, LoadScriptNext, Marker, InfoWindow} from '@react-google-maps/api'

import Link from '../partials/link'

const Map = ({state, section, libraries}) => {
  const Html2React = libraries.html2react.Component
  const options = state.source.get('acf-options-page')
  const googleMapsApiKey = options.acf.google_maps_api_key
  const data = state.source.get('/projects')
  data.items.map(({id, type}) => state.source[type][id])

  let locations = []

  section.projects.forEach((projectID) => {
    const project = state.source['project'][projectID]
    const {lat, lng} = project.acf.location
    if(project.acf.location) {
      const projectLocation = {
        name: project.title.rendered,
        location: {
          lat: lat,
          lng: lng
        },
        link: project.link
      }

      locations.push(projectLocation)
    }
  })

  const mapStyles = {
    height: '67vh',
    width: '100%'
  }

  const mapStyle = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#523735"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f1e6"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#c9b2a6"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#dcd2be"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#a8927e"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e3dbc3"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#93817c"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b9c196"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#81a174"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f1e6"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f8c967"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#e9bc62"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e98d58"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#db8555"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fdfcf8"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#806b63"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8f7d77"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#bfdddd"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#92998d"
            }
        ]
    }
  ]
  
  const defaultCenter = {lat: 41.3921913, lng: -70.6425}

  const [selected, setSelected] = useState({});
  
  const onSelect = item => {
    setSelected(item);
  }

  return (
    <MapsContainer>
      <MapsColumn>
        <LoadScriptNext googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap mapContainerStyle={mapStyles} options={{
              styles          : mapStyle,
              gestureHandling : 'none',
              zoomControl     : false,
              disableDefaultUI: true
            }} zoom={11} center={defaultCenter}>
            {locations.map(item => {
              return (
                <Marker key={item.name} position={item.location} onClick={() => onSelect(item)}/>
              )
            })}
            {selected.location && (
              <InfoWindow position={{lat: selected.location.lat + .02, lng: selected.location.lng}} clickable={true} onCloseClick={() => setSelected({})}>
                <Link href={selected.link}><Html2React html={selected.name} /></Link>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScriptNext>
      </MapsColumn>

      <MapsColumn>
        <Text theme={state.theme}>
          <h2 dangerouslySetInnerHTML={{__html: section.title}} />

          <Html2React html={section.content} />

          <CallToAction theme={state.theme} href={libraries.source.normalize(section.cta.url)}>{section.cta.title}</CallToAction>
        </Text>
      </MapsColumn>
     </MapsContainer>
  )
}

export default connect(Map)

const MapsContainer = styled.section`
  display: flex;
  align-items: stretch;
`

const MapsColumn = styled.div`
  width: 40%;

  &:first-of-type {
    width: 60%;
  }
`

const Text = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  background: ${props => props.theme.colors.lightGrey};
  padding: 1rem 3rem;
`

const CallToAction = styled(Link)`
  display: inline-block;
  ${props => props.theme.buttonStyle}
`