import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import { get } from 'lodash'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, StandaloneSearchBox } from '@react-google-maps/api'

import { MapInput } from './styled';

export default function Map(props) {
    const containerStyle = {
        width: '35rem',
        height: '35rem'
    }

    const center = {
        lat: -23.618007242521216,
        lng: -46.578886604151016
    }

    let entrega = get(useLocation(), 'state.entrega', null)

    const [origin, setOrigin] = useState(entrega ? entrega.ponto_partida : {})
    const [destination, setDestination] = useState(entrega ? entrega.ponto_destino : {})

    const [originInput, setOriginInput] = useState(null)
    const [destinationInput, setDestinationInput] = useState(null)

    const [map, setMap] = useState(null)
    const [response, setResponse] = useState(null)


    function getCoordinates(coordinates) {
        if (!coordinates) return null

        const { lat, lng } = coordinates

        return new window.google.maps.LatLng(lat, lng)
    }


    function onOriginChanged() {
        try {
            const places = originInput.getPlaces()

            if (places.length > 0) {
                let coordinates = {
                    lat: places[0].geometry.location.lat(),
                    lng: places[0].geometry.location.lng()
                }

                setResponse(null)
                setOrigin(null)
                setOrigin(coordinates)
                if (get(props, 'setPartida', false)) props.setPartida(`${coordinates.lat}, ${coordinates.lng}`)
            }

        } catch (error) {
            console.log(error)
        }
    }


    function onDestinationChanged() {
        try {
            const places = destinationInput.getPlaces()

            if (places.length > 0) {
                let coordinates = {
                    lat: places[0].geometry.location.lat(),
                    lng: places[0].geometry.location.lng()
                }

                setResponse(null)
                setDestination(null)
                setDestination(coordinates)
                if (get(props, 'setDestino', false)) props.setDestino(`${coordinates.lat}, ${coordinates.lng}`)
            }

        } catch (error) {
            console.log(error)
        }
    }


    const onUnmount = useCallback(() => {
        setMap(null)
    }, [])


    const directionsServiceOptions = useMemo(() => {
        return {
            origin,
            destination,
            travelMode: "DRIVING"
        }
    }, [origin, destination])


    const directionsCallback = useCallback((res) => {
        if (res.status !== null && res.status === "OK") {
            setResponse(res)
        }
    }, [])


    const directionsRendererOptions = useMemo(() => {
        return {
            directions: response
        }
    }, [response])


    useEffect(() => {
        try {
            console.log(origin)
            if (map) map.panTo(getCoordinates(origin))
        } catch (error) {
            console.log(error)
        }
    }, [origin]);


    useEffect(() => {
        try {
            console.log(destination)
            if (map) map.panTo(getCoordinates(destination))
        } catch (error) {
            console.log(error)
        }
    }, [destination]);


    return (
        <div className='map'>
            <LoadScript
                googleMapsApiKey='AIzaSyCzE2zuHNAF9X1WBU3EXkqGmrYsgRxCADY'
                libraries={['places']}
            >

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    onUnmount={onUnmount}
                    onLoad={(map) => setMap(map)}
                >

                    {
                        entrega
                            ? null
                            : <>
                                <StandaloneSearchBox onLoad={(box) => setOriginInput(box)} onPlacesChanged={onOriginChanged}>
                                    <MapInput
                                        type="text"
                                        placeholder="Local de partida"
                                        disabled={get(props, 'disabled', false)}
                                    />
                                </StandaloneSearchBox>

                                <StandaloneSearchBox onLoad={(box) => setDestinationInput(box)} onPlacesChanged={onDestinationChanged}>
                                    <MapInput
                                        type="text"
                                        placeholder="Local de destino"
                                        style={{ marginTop: '5rem' }}
                                        disabled={get(props, 'disabled', false)}
                                    />
                                </StandaloneSearchBox>
                            </>
                    }


                    {
                        origin && destination && (
                            <DirectionsService
                                options={directionsServiceOptions}
                                callback={directionsCallback}
                            />
                        )
                    }

                    {
                        response && (
                            <DirectionsRenderer
                                options={directionsRendererOptions}
                            />
                        )
                    }

                </GoogleMap>
            </LoadScript>
        </div>
    )
}