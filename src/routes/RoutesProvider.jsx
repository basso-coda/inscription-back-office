import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/welcome/LoginPage";
import NotFound from '../pages/NotFoundPage';
import { AppLayout } from "@/components/app/AppLayout";
import DashboardGlobalPage from "@/pages/dashboard/DashboardGlobalPage";
import { ProtectedRoute } from "./ProtectedRouter";

import utilisateurs_routes from "./administrations/utilisateurs_routes";
import profils_routes from "./administrations/profils_routes";
import roles_routes from "./administrations/roles_routes";
import auth_routes from "./auth_routes";
import ForbiddenPage from "@/pages/ForbiddenPage";
import absences_routes from "./pointage/absences_routes";
import presences_routes from "./pointage/presences_routes";
import type_partenaires_routes from "./type_partenaires/type_partenaire_routes";
import partenaires_routes from "./partenaires/partenaires_routes";
import nutriments_routes from "./gestion_lapin/nutriment/nutriment_routes";
import categorie_lapins_routes from "./gestion_lapin/categorie_lapin/categorie_lapin_routes";
import carriere_routes from "./Carrieres";
import cotation_routes from "./Cotations";
import evaluation_routes from "./Evaluation";
import contribution_routes from "./Contribution";
import lapins_routes from "./gestion_lapin/lapin/lapin_routes";
import plan_nutritionnels_routes from "./gestion_lapin/plan_nutritionnel/plan_nutritionnels_routes";
import regimes_routes from "./gestion_lapin/regime/regime_routes";
import maladies_routes from "./gestion_lapin/maladie/maladie_routes";
import categories_routes from "./stock/categories_routes";
import article_routes from "./stock/articles_routes";
import Facture_routes from "./Facture";
import Paiement_routes from "./Facture/Paiement";
import stock_routes from "./stock/stock_routes";
import accouplement_routes from "./gestion_lapin/accouplement";
import Vaccination_routes from "./gestion_lapin/vaccination";
import VaccinationLapin_routes from "./gestion_lapin/vaccination/VaccinationLapin";
import Depense_routes from "./Depense";
import statut_traitements_routes from "./gestion_lapin/statut_traitement/statut_traitement_routes";
import Contrat_routes from "./Contrat";
import statut_regimes_routes from "./gest_alimentation/statut_regime/statut_regime_routes";
import demande_lapin_routes from "./gestion_lapin/demande_lapin/demande_lapin_routes";
import Demande_routes from "./DemandeProcess";



import RapportStatusLapin_routes from "./Dashboard/rapportStatus";
import statusEmployees_routes from "./Dashboard/status_employes";


export default function RoutesProvider() {
  return (
    <Routes>

      {/* <Route index element={<Homepage />} /> */}

      <Route path="/" element={< AppLayout />}>
        {auth_routes}
        {utilisateurs_routes}
        {profils_routes}
        {roles_routes}
        {absences_routes}
        {presences_routes}
        {type_partenaires_routes}
        {partenaires_routes}
        {nutriments_routes}
        {categorie_lapins_routes}
        {carriere_routes}
        {cotation_routes}
        {evaluation_routes}
        {contribution_routes}
        {lapins_routes}
        {plan_nutritionnels_routes}
        {regimes_routes}
        {maladies_routes}
        {categories_routes}
        {article_routes}
        {Facture_routes}
        {Paiement_routes}
        {stock_routes}
        {accouplement_routes}
        {Vaccination_routes}
        {VaccinationLapin_routes}
        {RapportStatusLapin_routes}
        {Depense_routes}
        {statut_traitements_routes}
        {statut_regimes_routes}
        {demande_lapin_routes}
        {statusEmployees_routes}

        {Contrat_routes}
        {Demande_routes}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardGlobalPage /></ProtectedRoute>} />
        <Route path="/forbidden" element={<ProtectedRoute><ForbiddenPage /></ProtectedRoute>} />
      </Route>

      <Route path="/" index element={<LoginPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
