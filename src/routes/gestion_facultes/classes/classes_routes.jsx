import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../ProtectedRouter";
import ClasseList from "@/pages/gestion_facultes/classe/ClasseList";

export const classes_routes_items = {
    classes: {
        path: "classes",
        name: "Classes",
        component: ClasseList
    },

};

let classes_routes = [];

for (let key in classes_routes_items) {

  const route = classes_routes_items[key];

  classes_routes.push(
    <Route path={route.path} element={<ProtectedRoute><route.component /></ProtectedRoute>} key={route.path} />
  );
}

export default classes_routes;