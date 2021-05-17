import { Redirect, Route } from "react-router";

export default function ProtectedRoute({component: Component, ...props}) {

    return (
        <Route>
            {
                () => props.loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
            }
        </Route>
    );
}