import styled, { createGlobalStyle } from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import * as colors from "./colors";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
    }

    body {
        font-family: 'Nunito Sans', sans-serif;
        background: ${colors.mainBackgroundColor};
        color: ${colors.primaryDarkColor};
    }

    html, body, #root {
        height: 100%;
    }

    button {
        cursor: pointer;
        background: ${colors.primaryColor};
        border: none;
        color: #fff;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: 700;
        transition: all 300ms;
    }

    button:hover{
        filter: brightness(85%);
    }

    a {
        text-decoration: none;
        color: ${colors.primaryColor};
    }

    ul {
        list-style: none;
    }

    #map-container {
        overflow-anchor:none;
    }
`

export const Container = styled.section`
    min-height: 80%;
    max-width: 90%;
    display: grid;
    justify-items: center;
    background: #fff;
    margin: 30px auto;
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`