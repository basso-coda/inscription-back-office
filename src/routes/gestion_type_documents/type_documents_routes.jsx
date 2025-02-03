import { Route } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRouter";
import TypeDocumentList from "@/pages/gestion_type_documents/TypeDocumentList";

export const type_documents_routes_items = {
  type_documents: {
    path: "type_documents",
    name: "type documents",
    component: TypeDocumentList,
  },

};

let type_documents_routes = [];

for (let key in type_documents_routes_items) {

  const route = type_documents_routes_items[key];

  type_documents_routes.push(
    <Route path={route.path} element={<ProtectedRoute><route.component /></ProtectedRoute>} key={route.path} />
  );
}

export default type_documents_routes;