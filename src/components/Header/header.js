import React from "react";
import { Link } from "react-router-dom";
import { TbTruckDelivery, TbHome, TbWorld } from 'react-icons/tb'

import Logo from '../../svg/grupoUnicadLogo.svg'
import { Nav } from "./styled";

export default function Header() {
    return (
        <Nav>
            <div>
                <Link to="/">
                    <span> Página Inicial </span>
                    <TbHome size={28} />
                </Link>

                <Link to="/entregas">
                    <span> Entregas </span>
                    <TbTruckDelivery size={28} />
                </Link>

                <Link to="/mapa">
                    <span> Mapa </span>
                    <TbWorld size={28} />
                </Link>
            </div>

            <img src={Logo} height={100} />
        </Nav>
    )
}