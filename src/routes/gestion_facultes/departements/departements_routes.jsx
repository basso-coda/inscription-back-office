import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../ProtectedRouter";
import DepartementList from "@/pages/gestion_facultes/departement/DepartementList";

export const departements_routes_items = {
    departements: {
        path: "departements",
        name: "Departements",
        component: DepartementList
    },

};

let departements_routes = [];

for (let key in departements_routes_items) {

  const route = departements_routes_items[key];

  departements_routes.push(
    <Route path={route.path} element={<ProtectedRoute><route.component /></ProtectedRoute>} key={route.path} />
  );
}

export default departements_routes;