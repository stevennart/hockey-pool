import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Layout from "../Layout";
import Homepage from "../homepage/Homepage";
import Closed from "../closed/Closed";
import Sponsors from "../sponsors/Sponsors";
import Prizes from "../prizes/Prizes";
import Rules from "../rules/Rules";
import Congratulations from "../congrats/Congrats";
import Admin from "../admin/Admin";
import NotFound from "../not-found/NotFound";
import PrivateRoute from "../../../routes/PrivateRoute";
import { RegistrationContext } from "../../../context/RegistrationContext";

const HasLayout = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const { registrationPool } = useContext(RegistrationContext);

  useEffect(() => {}, []);

  // dont render the whole screen if the registrationPool data has not been loaded entirely.
  if (registrationPool == null) {
    return null;
  }

  return (
    <>
      <Layout year={year}>
        <Switch>
          <Route exact path="/">
            <Homepage year={year} />
          </Route>
          <Route exact path="/sponsors">
            <Sponsors />
          </Route>
          <Route exact path="/prizes">
            <Prizes />
          </Route>
          <Route exact path="/rules-scoring">
            <Rules />
          </Route>
          <Route exact path="/closed">
            <Closed />
          </Route>
          <Route exact path="/congratulations">
            <Congratulations year={year} />
          </Route>
          <PrivateRoute exact path="/admin" component={Admin}></PrivateRoute>
          {/* When route doesn't match any, show page not found */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </>
  );
};

export default HasLayout;
