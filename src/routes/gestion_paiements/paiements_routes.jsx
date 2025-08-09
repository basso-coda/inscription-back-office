import { Route } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRouter";
import PaiementList from "@/pages/gestion_paiements/PaiementList";

export const paiements_routes_items = {
    paiements: {
        path: "paiements",
        name: "Paiements",
        component: PaiementList
    },

};

let paiements_routes = [];

for (let key in paiements_routes_items) {

  const route = paiements_routes_items[key];

  paiements_routes.push(
    <Route path={route.path} element={<ProtectedRoute><route.component /></ProtectedRoute>} key={route.path} />
  );
}

export default paiements_routes;