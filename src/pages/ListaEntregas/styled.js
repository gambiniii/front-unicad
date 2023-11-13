import styled from "styled-components";
import * as colors from '../../styles/colors'

export const TableContainer = styled.div`
    display: grid;
    width: 80%;
    padding: 0.5rem;
    max-height: 30rem;
    overflow: auto;
    
    &::-webkit-scrollbar {
        width: 7px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${colors.secondaryColor}; 
        border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
        margin: 1rem;
        background-color: ${colors.mainBackgroundColor};
    }
`

export const Table = styled.table`
    width: 100%;
    max-height: 10rem;
    border-collapse: collapse;
    font-weight: 300;

    th, td, tr{
        height: 3rem;
        margin: 1rem 0;
        font-size: 1.2rem;
        text-align: start;
        padding-left: 1rem;
    }

    th{
        background-color: ${colors.mainBackgroundColor};
    }
    
    tr + tr{
        border-top: 1px solid #ccc;
    }

    button{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-size: 1.2rem;
        font-weight: 100 !important;
        border-radius: 0;

        span {
            margin-right: 0.5rem;
        }
    }
`

export const Title = styled.h1`
    font-size: 3rem;
    margin: 3rem 0 3rem 10rem;
    font-weight: lighter;
    justify-self: start;
    color: #2CC6F5 !important;
`