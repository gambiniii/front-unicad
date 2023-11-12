import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import { get } from 'lodash'
import { GoogleMap, Marker, LoadScript, DirectionsService, DirectionsRenderer, StandaloneSearchBox } from '@react-google-maps/api'

import { MapInput } from './styled';

export default function Map(props) {
    const containerStyle = {
        width: '400px',
        height: '400px'
    }

    const center = {
        lat: -23.618007242521216,
        lng: -46.578886604151016
    }

    let location = useLocation();

    console.log(location)


    const [origin, setOrigin] = useState(get(location, 'state.entrega.ponto_partida', {}))
    const [destination, setDestination] = useState(get(location, 'state.entrega.ponto_destino', {}))

    const [map, setMap] = useState(null)
    const [directionsService, setDirectionsService] = useState(null);
    const [response, setResponse] = useState(null)


    const [originInput, setOriginInput] = useState()
    const [destinationInput, setDestinationInput] = useState()


    function getCoordinates(coordinates) {
        if (!coordinates) return null

        const { lat, lng } = coordinates

        return new window.google.maps.LatLng(lat, lng)
    }


    const onOriginChanged = () => {
        try {

            const places = originInput.getPlaces()
            console.log(places)


            if (places.length > 0) {
                let coordinates = {
                    lat: places[0].geometry.location.lat(),
                    lng: places[0].geometry.location.lng()
                }

                setResponse(null)
                setOrigin(null)
                setOrigin(coordinates)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const onDestinationChanged = () => {
        try {

            const places = destinationInput.getPlaces()
            console.log(places)


            if (places.length > 0) {
                let coordinates = {
                    lat: places[0].geometry.location.lat(),
                    lng: places[0].geometry.location.lng()
                }

                setResponse(null)
                setDestination(null)
                setDestination(coordinates)
            }

        } catch (error) {
            console.log(error)
        }
    }


    const onMapLoad = (map) => {
        console.log(map)

        const directionsServiceInstance = new window.google.maps.DirectionsService();
        setDirectionsService(directionsServiceInstance);

        getDistance(origin, destination)
        generateRoute()


        setMap(map)
    }

    const onOriginInputLoad = (box) => {
        setOriginInput(box)
    }


    const onDestinationInputLoad = (box) => {
        setDestinationInput(box)
    }


    const onUnmount = useCallback(function callback(map) {
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


    function generateRoute() {
        try {
            console.log(map)
            if (!directionsService) {
                console.error('DirectionsService não inicializado');
                return;
            }

            if (origin, destination) {
                directionsService.route(
                    {
                        origin: origin,
                        destination: destination,
                        travelMode: 'DRIVING'
                    },
                    callback
                );
            }

            function callback(response, status) {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setResponse(response);
                } else {
                    console.log(response)
                    console.log(status)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }


    function getDistance(origin, destination) {
        const distanceService = new window.google.maps.DistanceMatrixService()

        distanceService.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: 'DRIVING',
                avoidTolls: true,
            },
            callback
        )

        function callback(response, status) {
            console.log(response)
            console.log(status)
        }
    }

    useEffect(() => {
        try {
            console.log(origin)
            if (map) map.panTo(getCoordinates(origin))

            if (destination) {

            }
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
                    onUnmount={onUnmount}
                    onLoad={onMapLoad}
                    zoom={15}
                >


                    <StandaloneSearchBox onLoad={onOriginInputLoad} onPlacesChanged={onOriginChanged}>
                        <MapInput
                            type="text"
                            placeholder="Local de partida"
                        />
                    </StandaloneSearchBox>

                    <StandaloneSearchBox onLoad={onDestinationInputLoad} onPlacesChanged={onDestinationChanged}>
                        <MapInput
                            type="text"
                            placeholder="Local de destino"
                            style={{ marginTop: '5rem' }}
                        />
                    </StandaloneSearchBox>

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