import React, { useRef, useEffect, useState} from "react";
import { useLocation, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ProtectedRoute from "./utils/ProtectedRoute";
import ScrollReveal from "./utils/ScrollReveal";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";

//import Forums from "./pages/Forums";
//import PostCompose from "./pages/PostCompose";
//import TopicDetail from "./pages/TopicDetail";

import PostDetail from "./pages/forum/PostDetail";
import Forums from "./pages/forum/Forums";
import ForumHome from "./pages/forum/ForumHome";

import AcupuntureData from "./store/AcupuntureData";
import FormulaData from "./store/FormulaData";
import MateriaMedica from "./store/MateriaMedica";
import ClinicsData from "./store/ClinicData";
// Pages
import Home from "./pages/homes/Home";
import CommonHomePage from "./pages/blogs/CommonHomePage";
import AboutUs from "./pages/homes/AboutUs";

// import BlogGrid from "./pages/blogs/BlogGrid";
// import BlogLeftSidebar from "./pages/blogs/BlogLeftSidebar";
// import BlogRightSidebar from "./pages/blogs/BlogRightSidebar";
import CommonSecondaryPage from "./pages/blogs/CommonSecondaryPage";
import Error from "./pages/Error";
import "./assets/css/customcss.css";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
// import SalonProfilePage from './pages/blogs/SalonProfilePage';
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import TermOfUse from "./pages/TermOfUse";
import Form2 from "./pages/Form2";
import CookieBanner from "./pages/CookieBanner";
import Dashboard from "./pages/dashboard/Dashboard";
import authservice from "./services/authservice";
import NoteDetail from "./pages/forum/PostDetail";


const store = configureStore();

const App = () => {
  const childRef = useRef();
  let location = useLocation();
  const [loggedId, setLoggedIn] = useState(false);
  useEffect(() => {
    if (authservice.getJwt()) {
      setLoggedIn(true);
    }
    document.body.classList.add("is-loaded");
    childRef.current.init();
  }, [location]);
  return (
    <>
      <Provider store={store}>
        <ScrollReveal
          ref={childRef}
          children={() => (
            <Switch>
              <AppRoute
                exact
                path="/"
                component={Home}
                layout={LayoutDefault}
              />

              <AppRoute path="/about-us" component={AboutUs} />
              <AppRoute path="/contact-us" component={Contact} />
              <AppRoute path="/form2" component={Form2} />
              <AppRoute
                path="/cookie-acceptance-banner"
                component={CookieBanner}
              />

              <AppRoute
                path="/salon-profile/:name"
                component={(event) => (
                  <div>
                    <CommonSecondaryPage datalink="/abc" name={event} />
                  </div>
                )}
              />

              <AppRoute
                path="/acupunctures/:name"
                component={(event) => (
                  <div>
                    <CommonSecondaryPage
                      datalink="/acupunctures"
                      name={event}
                    />
                  </div>
                )}
              />

              <AppRoute
                path="/acupunctures"
                component={() => (
                  <CommonHomePage
                    datalink="/acupunctures"
                    headingdata={AcupuntureData}
                  />
                )}
              />

              <AppRoute
                path="/formulas/:name"
                component={(event) => (
                  <div>
                    <CommonSecondaryPage datalink="/formulas" name={event} />
                  </div>
                )}
              />

              <AppRoute
                path="/formulas"
                component={() => (
                  <CommonHomePage
                    datalink="/formulas"
                    headingdata={FormulaData}
                  />
                )}
              />

              <AppRoute
                path="/formulas/:name"
                component={(event) => (
                  <div>
                    <CommonSecondaryPage datalink="/formulas" name={event} />
                  </div>
                )}
              />

              <AppRoute
                path="/materiamedica"
                component={() => (
                  <CommonHomePage
                    datalink="/materiamedica"
                    headingdata={MateriaMedica}
                  />
                )}
              />

              <AppRoute
                path="/clinics/:name"
                component={(event) => (
                  <div>
                    <CommonSecondaryPage datalink="/clinicsolo" name={event} />
                  </div>
                )}
              />

              <AppRoute
                path="/clinics"
                component={() => (
                  <CommonHomePage
                    datalink="/clinicsolo"
                    headingdata={ClinicsData}
                  />
                )}
              />
              <AppRoute
                path="/salon-profile/:name"
                component={(event) => (
                  <CommonSecondaryPage datalink="/salon" name={event} />
                )}
              />

              <AppRoute path="/termofuse" component={TermOfUse} />
              <AppRoute
                path="/signup"
                component={() => <SignUp authMethod="SignUp" />}
              />
              <AppRoute
                path="/login"
                component={() => <SignUp authMethod="Login" />}
              />

              {loggedId && <AppRoute path="/dashboard" component={Dashboard} />}

              {/* <AppRoute path="/forums" component={Forums} />
              <AppRoute path="/post-compose" component={PostCompose} />*/}
              <AppRoute path="/forum/topic/:topicId" component={NoteDetail} /> 
              <ProtectedRoute
                path="/forum/:name/:postId"
                component={PostDetail}
              />
              <ProtectedRoute path="/forum/:forum_id" component={Forums} exact />
              <AppRoute path="/forum" component={ForumHome} exact />

              <AppRoute
                path="/categories/:forum_cat_id"
                component={ForumHome}
              />

              <AppRoute component={Error} />
            </Switch>
          )}
        />
      </Provider>
    </>
  );
};

export default App;
