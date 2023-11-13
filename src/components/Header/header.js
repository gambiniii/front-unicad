import React from "react";
import { Link } from "react-router-dom";
import { PiHouseLight, PiTruckLight, PiGlobeLight } from 'react-icons/pi'

import Logo from '../../svg/grupoUnicadLogo.svg'
import { Nav } from "./styled";

export default function Header() {
    return (
        <Nav>
            <div>
                <Link to="/">
                    <span> Página Inicial </span>
                    <PiHouseLight size={30} />
                </Link>

                <Link to="/entregas">
                    <span> Entregas </span>
                    <PiTruckLight size={30} />
                </Link>

                <Link to="/mapa">
                    <span> Mapa </span>
                    <PiGlobeLight size={30} />
                </Link>
            </div>

            <img src={Logo} height={100} />
        </Nav>
    )
}