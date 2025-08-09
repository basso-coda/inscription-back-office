import { Route } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRouter";
import EtudiantPageList from "@/pages/gestion_etudiants/EtudiantPageList";
import ScannerCarteEtudiant from "@/pages/gestion_etudiants/ScannerCarteEtudiant";
import ViewEtudiant from "@/pages/gestion_etudiants/ViewEtudiant";

export const etudiants_routes_items = {
  etudiants: {
    path: "etudiants",
    name: "Etudiants",
    component: EtudiantPageList,
  },

  scanner_carte_etudiant: {
    path: "scanner-carte-etudiant",
    name: "Scan Qr Code",
    component: ScannerCarteEtudiant,
  },

  voir_etudiant: {
    path: "voir-etudiant/:ID_ETUDIANT",
    name: "Details",
    component: ViewEtudiant
  }

};

let etudiants_routes = [];

for (let key in etudiants_routes_items) {

  const route = etudiants_routes_items[key];

  etudiants_routes.push(
    <Route path={route.path} element={<ProtectedRoute><route.component /></ProtectedRoute>} key={route.path} />
  );
}

export default etudiants_routes;