import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PiListMagnifyingGlassBold } from 'react-icons/pi'

import { Table, TableContainer, Title } from './styled'
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

        navigate('entregas', { state: { entrega } })
    }

    function createDate(timestamp) {
        const date = new Date(timestamp);

        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const ano = date.getFullYear();

        const diaFormatado = dia < 10 ? `0${dia}` : dia;
        const mesFormatado = mes < 10 ? `0${mes}` : mes;

        return `${diaFormatado}/${mesFormatado}/${ano}`;
    }


    return (
        <Container>
            <Title>Lista de Entregas</Title>

            <TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <th>Nome do Cliente</th>
                            <th>Data da Entrega</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            entregas.map(
                                (entrega) => {
                                    return (
                                        <tr>
                                            <td>{entrega.nome_cliente}</td>
                                            <td>{createDate(entrega.data_entrega)}</td>
                                            <td>
                                                <button onClick={() => handleClick(entrega)}>
                                                    <span>Detalhes</span>
                                                    <PiListMagnifyingGlassBold />
                                                </button>
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