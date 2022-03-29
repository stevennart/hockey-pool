import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FirebaseAuthProvider } from "./assets/config/FirebaseAuthProvider";
import { RegistrationProvider } from "./providers/RegistrationProvider";
import HasLayout from "./components/has-layout/HasLayout";
import NoLayout from "./components/no-layout/NoLayout";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <FirebaseAuthProvider>
      <RegistrationProvider>
        <Router>
          <Switch>
            <Route path="/login" component={NoLayout} />
            <Route path="/" component={HasLayout} />
          </Switch>
        </Router>
      </RegistrationProvider>
    </FirebaseAuthProvider>
  );
}

export default App;
