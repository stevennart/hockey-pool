import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../login/Login";
import { RegistrationContext } from "../../../context/RegistrationContext";

const NoLayout = () => {
  useEffect(() => {}, []);

  const { registrationPool } = useContext(RegistrationContext);

  if (registrationPool == null) {
    return null;
  }

  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
};

export default NoLayout;
