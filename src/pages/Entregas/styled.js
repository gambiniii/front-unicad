import styled from "styled-components";
import * as colors from '../../styles/colors'

export const Form = styled.form`
    width: 75%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    label{
        display:flex;
        flex-direction: column;
        margin-top: 2rem;
    }

    input{
        height: 60px;
        font-size: 24px;
        border: 1px solid #ddd;
        padding: 0 10px;
        border-radius: 4px;
        transition: 0.3s;
        color: #666;
        font-weight: 100 !important;

        &:focus{
            border: 1px solid ${colors.primaryColor};
        }
    }

    button{
        height: 3rem;
        width: 100%;
    }

    div > div{
    }
`

export const FlexDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
`

export const GridDiv = styled.div`
    display: grid;
    align-items: start;
`

export const Title = styled.h1`
    font-size: 3rem;
    margin-top: 3rem;
    font-weight: lighter;
    justify-self: start;
    color: #2CC6F5 !important;
`