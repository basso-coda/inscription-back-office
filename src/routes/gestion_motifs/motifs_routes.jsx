import { Route } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRouter";
import MotifList from "@/pages/gestion_motifs/MotifList";

export const motifs_routes_items = {
  motifs: {
    path: "motifs",
    name: "Motifs",
    component: MotifList
  },

};

let motifs_routes = [];

for (let key in motifs_routes_items) {

  const route = motifs_routes_items[key];

  motifs_routes.push(
    <Route path={route.path} element={<ProtectedRoute><route.component /></ProtectedRoute>} key={route.path} />
  );
}

export default motifs_routes;