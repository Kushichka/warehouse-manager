import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { Error } from "./pages/Error/Error";
import { Root } from "./components/Root/Root";
import { Warehouse } from "./pages/Warehouse/Warehouse";
import { Employees } from "./pages/Employees/Employees";
import { Authorization } from "./pages/Authorization/Authorization";
import { Welcome } from "./pages/Welcome/Welcome";
import { RequireAuth } from "./hoc/RequireAuth";
import { SkipIfLogged } from "./hoc/SkipIfLogged";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" errorElement={<Error />} element={<Root />}>
            {/* public routes */}
            <Route element={<SkipIfLogged />}>
                <Route index element={<Welcome />} />
                <Route path="registration" element={<Authorization auth='' />} />
                <Route path="login" element={<Authorization auth='login' />} />
            </Route>

            {/* private routes */}
            <Route element={<RequireAuth />}>
                <Route path="warehouse" element={<Warehouse />} />
                <Route path="employees" element={<Employees />} />
            </Route>
        </Route>
    )
);