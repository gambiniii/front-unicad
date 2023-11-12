import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Table, TableContainer } from './styled'
import { Container } from "../../styles/GlobalSyles"
import axios from "../../services/axios"

export default function ListaEntregas() {
    const navigate = useNavigate()
    const [entregas, setEntregas] = useState([])


    useState(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            await axios.get('/entregas/').then(
                (response) => {
                    setEntregas(response.data)
                }
            )

        } catch (error) {
            console.log(error)
        }
    }

    function handleClick(entrega) {
        console.log(entrega)

        navigate('mapa', { state: { entrega } })
    }

    return (
        <Container>
            <h1>Lista Entregas</h1>

            <TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Partida</th>
                            <th>Destino</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            entregas.map(
                                (entrega) => {
                                    console.log(entrega)
                                    return (
                                        <tr>
                                            <td>{entrega.id}</td>
                                            <td>{entrega.nome_cliente}</td>
                                            <td>{entrega.ponto_partida}</td>
                                            <td>{entrega.ponto_destino}</td>
                                            <td>
                                                <button onClick={() => handleClick(entrega)}>Editar</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            )
                        }
                    </tbody>
                </Table>
            </TableContainer>

        </Container>
    )
}