import styled from "styled-components";
import * as colors from '../../styles/colors'

export const Form = styled.form`
    display: grid;
    width: 80%;

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

        &:focus{
            border: 1px solid ${colors.primaryColor};
        }
    }

    button{
        margin-top: 1.5rem;
        height: 3rem;
    }
`
