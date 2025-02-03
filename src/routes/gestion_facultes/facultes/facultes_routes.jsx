import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../ProtectedRouter";
import FaculteList from "@/pages/gestion_facultes/faculte/FaculteList";

export const facultes_routes_items = {
  facultes: {
    path: "facultes",
    name: "Facultes",
    component: FaculteList
  },

};

let facultes_routes = [];

for (let key in facultes_routes_items) {

  const route = facultes_routes_items[key];

  facultes_routes.push(
    <Route path={route.path} element={<ProtectedRoute><route.component /></ProtectedRoute>} key={route.path} />
  );
}

export default facultes_routes;