import styled from "styled-components";
import { primaryColor } from "../../styles/colors";

export const Nav = styled.nav`
    background: ${primaryColor};
    padding: 1rem 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    a{
        display: flex;
        align-items: center;
        margin: 0 5rem 0 0;
        color: #fff;
        font-weight: bold;

        span{
            margin-right: 0.5rem;
        }
    }
    
    div{
        display: flex;
        justify-content: center;
    }
`