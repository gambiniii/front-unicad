import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListaEntregas from "../pages/ListaEntregas/lista";
import Entregas from "../pages/Entregas/entregas";
import LocalMap from "../pages/LocalMap/localMap";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<ListaEntregas />} />
            <Route path="/entregas" element={<Entregas />} />
            <Route path="/mapa" element={<LocalMap />} />
        </Routes>
    )
}