import React, { useState } from "react";

import Map from '../../components/Map/map'
import { Container } from "../../styles/GlobalSyles";
import { Form } from "./styled";

export default function Entregas() {
    const [nome, setNome] = useState()
    const [entrega, setEntrega] = useState()
    const [partida, setPartida] = useState()
    const [destino, setDestino] = useState()


    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h1>Realizar entrega</h1>

                <label>Nome do cliente</label>
                <input value={nome} onChange={(e) => setNome(e.target.value)} />

                <label>Data entrega</label>
                <input value={entrega} onChange={(e) => setEntrega(e.target.value)} />

                {/* <label>Local de Partida</label>
                <input value={partida} onChange={(e) => setPartida(e.target.value)} />

                <label>Local de Entrega</label>
                <input value={destino} onChange={(e) => setDestino(e.target.value)} /> */}

                <Map />

                <button>Entregar</button>
            </Form>
        </Container>
    )
}