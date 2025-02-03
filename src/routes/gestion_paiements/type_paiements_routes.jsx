import { Route } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRouter";
import TypePaiementList from "@/pages/gestion_paiements/TypePaiementList";

export const type_paiements_routes_items = {
  type_paiements: {
    path: "type_paiements",
    name: "Type paiements",
    component: TypePaiementList
  },

};

let type_paiements_routes = [];

for (let key in type_paiements_routes_items) {

  const route = type_paiements_routes_items[key];

  type_paiements_routes.push(
    <Route path={route.path} element={<ProtectedRoute><route.component /></ProtectedRoute>} key={route.path} />
  );
}

export default type_paiements_routes;