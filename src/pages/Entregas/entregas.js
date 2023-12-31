import React, { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate, useLocation } from "react-router-dom"

import Map from '../../components/Map/map'
import { Container } from "../../styles/GlobalSyles"
import { Form, GridDiv, Title } from "./styled"
import { get } from "lodash"
import axios from "../../services/axios"

export default function Entregas() {
    const entrega = get(useLocation(), 'state.entrega', null)

    const [nome, setNome] = useState(entrega ? entrega.nome_cliente : "")
    const [dataEntrega, setDataEntrega] = useState(entrega ? createDate(entrega.data_entrega) : "")
    const [partida, setPartida] = useState(entrega ? entrega.ponto_entrega : "")
    const [destino, setDestino] = useState(entrega ? entrega.destino_entrega : "")

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(event) {
        if (entrega) return false
        const requestToast = toast.loading("Por favor, aguarde")

        let toastContent = {
            render: "Preencha todos os dados solicitados...",
            type: "warning",
            isLoading: false,
            autoClose: 5000
        }

        try {
            event.preventDefault()
            setLoading(true)

            if (!validateForm()) {
                await axios.post('entregas/', {
                    nome_cliente: nome,
                    data_entrega: dataEntrega,
                    ponto_partida: partida,
                    ponto_destino: destino
                })
                    .then(res => {
                        let response = get(res, 'data', "Pedido cadastrado com sucesso!")

                        toastContent = {
                            render: get(response, 'description', "Pedido cadastrado com sucesso!"),
                            type: get(response, 'status', "success!"),
                            isLoading: false,
                            autoClose: 3000
                        }

                        return navigate('/')
                    })
            }

        } catch (error) {
            const errors = get(error, 'response.data.errors', [])

            if (errors.length > 0) {

                toastContent = {
                    render: errors[0],
                    type: "error",
                    isLoading: false,
                    autoClose: 3000
                }

                errors.map(error => {
                    console.log(error)
                    return toast.error(error)
                })

            } else {

                toastContent = {
                    render: "Erro efetuar ação! (Erro desconhecido...)",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000
                }

            }

        } finally {
            setLoading(false)
            toast.update(requestToast, toastContent)
        }
    }

    function validateForm() {
        let hasError = false

        if (!validateName()) hasError = true
        if (!validateDate()) hasError = true
        if (!validateCoordinates()) hasError = true

        return hasError
    }

    function validateName() {
        const regexNome = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([\s'-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/

        if (nome.length < 3 || nome.length > 255) {
            toast.error("O nome deve ter entre 3 e 255 caracteres!")
            return false
        }

        if (!regexNome.test(nome)) {
            toast.error("O nome deve ter conter apenas letras!")
            return false
        }

        return true
    }

    function validateDate() {
        const [ano, mes, dia] = dataEntrega.split('-')


        if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
            toast.error("Data inválida")
            return false
        }

        const newDate = new Date(ano, mes - 1, dia)

        return (
            newDate.getFullYear() == ano &&
            newDate.getMonth() == mes - 1 &&
            newDate.getDate() == dia
        )
    }

    function validateCoordinates() {
        const regexCoordenadas = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|(\d{1,2}))(\.\d+)?)$/

        if (!partida || !destino) {
            toast.error("Informe os pontos de partida e de destino")
            return false
        }

        if (!(regexCoordenadas.test(partida) && regexCoordenadas.test(destino))) {
            toast.error("Coordenadas inválidas")
            return false
        }

        return true
    }

    function createDate(timestamp) {
        const date = new Date(timestamp);

        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const ano = date.getFullYear();

        const diaFormatado = dia < 10 ? `0${dia}` : dia;
        const mesFormatado = mes < 10 ? `0${mes}` : mes;

        return `${ano}-${mesFormatado}-${diaFormatado}`;
    }


    return (
        <Container>
            <Form>
                <GridDiv>
                    <GridDiv>
                        <Title>{!entrega ? "Realizar entrega" : "Detalhes da entrega"}</Title>

                        <label>Nome do cliente</label>
                        <input type="text" name="nome" value={nome} disabled={loading || entrega} onChange={(e) => setNome(e.target.value)} />

                        <label>Data entrega</label>
                        <input type="date" name="data" value={dataEntrega} disabled={loading || entrega} onChange={(e) => setDataEntrega(e.target.value)} />
                    </GridDiv>

                    {
                        !entrega
                            ? <button type="button" onClick={handleSubmit}>Entregar</button>
                            : <button type="button" onClick={() => navigate('/')}>Voltar</button>
                    }
                </GridDiv>

                <Map setPartida={setPartida} setDestino={setDestino} disabled={loading || entrega} />
            </Form>

        </Container>
    )
}