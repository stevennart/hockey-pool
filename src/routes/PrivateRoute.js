import React, { useContext, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {

    const { currentUser } = useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("loggedInUser"))
    // console.log(typeof ())
    return (
        <Route
            {...rest}
            render={(routeProps) => {
                return (
                    //!! means it converts an object to boolean (true or false) and check if its true before routing to /admin route.
                    (isAuthenticated || !!currentUser) ? (<RouteComponent {...routeProps} />) : (<Redirect to={"/login"} />)
                );
            }}
        />
    );
};

export default PrivateRoute;