import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/welcome/LoginPage";
import NotFound from '../pages/NotFoundPage';
import { AppLayout } from "@/components/app/AppLayout";
import { ProtectedRoute } from "./ProtectedRouter";
import utilisateurs_routes from "./administrations/utilisateurs_routes";
import profils_routes from "./administrations/profils_routes";
import roles_routes from "./administrations/roles_routes";
import auth_routes from "./auth_routes";
import ForbiddenPage from "@/pages/ForbiddenPage";
import DashboardGlobalPage from "@/pages/dashboard/DashboardGlobalPage";
import type_documents_routes from "./gestion_type_documents/type_documents_routes";
import motifs_routes from "./gestion_motifs/motifs_routes";
import type_paiements_routes from "./gestion_paiements/type_paiements_routes";
import facultes_routes from "./gestion_facultes/facultes/facultes_routes";
import departements_routes from "./gestion_facultes/departements/departements_routes";
import classes_routes from "./gestion_facultes/classes/classes_routes";
import candidatures_routes from "./gestion_candidatures/candidatures_routes";
import etudiants_routes from "./gestion_etudiants/etudiants_routes";
import paiements_routes from "./gestion_paiements/paiements_routes";



export default function RoutesProvider() {
  return (
    <Routes>

      {/* <Route index element={<Homepage />} /> */}

      <Route path="/" element={< AppLayout />}>
        {auth_routes}
        {utilisateurs_routes}
        {profils_routes}
        {roles_routes}
        {type_documents_routes}
        {motifs_routes}
        {type_paiements_routes}
        {facultes_routes}
        {departements_routes}
        {classes_routes}
        {candidatures_routes}
        {etudiants_routes}
        {paiements_routes}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardGlobalPage /></ProtectedRoute>} />
        <Route path="/forbidden" element={<ProtectedRoute><ForbiddenPage /></ProtectedRoute>} />
      </Route>

      <Route path="/" index element={<LoginPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
