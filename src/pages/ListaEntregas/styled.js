import styled from "styled-components";
import * as colors from '../../styles/colors'

export const TableContainer = styled.div`
    width: 100%;
`

export const Table = styled.table`
    width: 100%;
    outline: 1px solid black;

    thead, th, td, tbody, tr{
        outline: 1px solid black;
    }

    button{
        width: 100%;
        border-radius: 0;
    }
`