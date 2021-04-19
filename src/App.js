import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Documents from "./components/documents";
import NotFound from "./components/notFound";
import DocumentForm from "./components/documentForm";
import NavBar from "./components/navBar";
import Upload from "./components/uploadForm";
import Register from "./components/registerForm";
import Login from "./components/loginForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Dashboard from "./components/dashboard";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <main className="container">
        <NavBar user={user} />
        <ToastContainer />
        <Switch>
          <Route
            path="/documents/:id"
            render={(props) => {
              if (!user) return <Redirect to="/login" />;
              return <DocumentForm {...props} />;
            }}
          />
          <ProtectedRoute path="/documents" component={Documents} />
          <ProtectedRoute path="/upload" component={Upload} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/documents" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
