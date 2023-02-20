import * as React from "react";
import { Router } from "@reach/router";
import Layout from "../../components/layout";
import Login from "../../components/login";
import Profile from "../../components/profile";

const Default = () => (
  <div>Hi</div>
);

const App = () => (
  <Layout>
    <Router basepath="/app">
        <Profile path="/profile" username="DrDano" email="danielharned@gmail.com" />
        <Login path="/login" url="/auth/login" />
        <Default path="/" />
    </Router>
  </Layout>
);

export default App;