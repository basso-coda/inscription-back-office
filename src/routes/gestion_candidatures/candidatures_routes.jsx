import { Route } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRouter";
import CandidaturesListPage from "@/pages/gestion_candidats/CandidaturesListPage";
import ViewDemande from "@/pages/gestion_candidats/ViewDemande";

export const candidatures_routes_items = {
  candidatures: {
    path: "candidatures",
    name: "Candidatures",
    component: CandidaturesListPage,
  },

  voir_candidature: {
    path: "view-demande/:ID_CANDIDATURE",
    name: "Details",
    component: ViewDemande,
  }

};

let candidatures_routes = [];

for (let key in candidatures_routes_items) {

  const route = candidatures_routes_items[key];

  candidatures_routes.push(
    <Route path={route.path} element={<ProtectedRoute><route.component /></ProtectedRoute>} key={route.path} />
  );
}

export default candidatures_routes;