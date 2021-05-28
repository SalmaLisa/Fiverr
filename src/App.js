import React, { useRef, useEffect } from 'react';
import { useLocation, Switch, useParams } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';


// Layouts
import LayoutDefault from './layouts/LayoutDefault';

import Forums from './pages/Forums';
import PostCompose from './pages/PostCompose';
import TopicDetail from './pages/TopicDetail';

import AcupuntureData from "./store/AcupuntureData"
import FormulaData from "./store/FormulaData"
import MateriaMedica from "./store/MateriaMedica"
import ClinicsData from "./store/ClinicData"
// Pages
import Home from "./pages/homes/Home";
import CommonHomePage from "./pages/blogs/CommonHomePage";
// import BlogGrid from "./pages/blogs/BlogGrid";
// import BlogLeftSidebar from "./pages/blogs/BlogLeftSidebar";
// import BlogRightSidebar from "./pages/blogs/BlogRightSidebar";
import CommonSecondaryPage from "./pages/blogs/CommonSecondaryPage";
import Error from "./pages/Error";
import "./assets/css/customcss.css"
import { Provider } from 'react-redux';
import configureStore from "./redux/configureStore"

const store = configureStore();

const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    document.body.classList.add('is-loaded')
    childRef.current.init();
  }, [location]);
  return (
    <>
    <Provider store={store}>
      <ScrollReveal
        ref={childRef}
        children={() => (
          <Switch>
            <AppRoute exact path="/" component={Home} layout={LayoutDefault} />

              <AppRoute path="/acupunctures/:name" component={(event)=> 
                <div>
                  <CommonSecondaryPage 
                    datalink="/acupunctures" 
                    name={event}/>
                  </div>} 
                />

              <AppRoute path="/acupunctures" component={()=> 
                  <CommonHomePage 
                    datalink="/acupunctures"
                    headingdata={AcupuntureData}/>} 
                />

              <AppRoute path="/formulas/:name" component={(event)=> 
                <div>
                  <CommonSecondaryPage 
                    datalink="/formulas" 
                    name={event}/>
                  </div>} 
                />

              <AppRoute path="/formulas" component={()=> 
                  <CommonHomePage 
                    datalink="/formulas"
                    headingdata={FormulaData}/>} 
                />

              <AppRoute path="/formulas/:name" component={(event)=> 
                <div>
                  <CommonSecondaryPage 
                    datalink="/formulas" 
                    name={event}/>
                  </div>} 
                />

              <AppRoute path="/materiamedica" component={()=> 
                  <CommonHomePage 
                    datalink="/materiamedica"
                    headingdata={MateriaMedica}/>} 
                />

              <AppRoute path="/clinics/:name" component={(event)=> 
                <div>
                  <CommonSecondaryPage 
                    datalink="/clinicsolo" 
                    name={event}/>
                  </div>} 
                />

              <AppRoute path="/clinics" component={()=> 
                  <CommonHomePage 
                    datalink="/clinicsolo"
                    headingdata={ClinicsData}/>} 
                />
			  
              {/* <AppRoute path="/blog-grid" component={BlogGrid} />
              <AppRoute path="/blog-left-sidebar" component={BlogLeftSidebar} />
              <AppRoute path="/blog-right-sidebar" component={BlogRightSidebar} />
              <AppRoute path="/login" component={Login} />
              <AppRoute path="/sign-up" component={SignUp} /> */}
              <AppRoute path="/forums" component={Forums} /> 
              <AppRoute path="/post-compose" component={PostCompose} />
              <AppRoute path="/post-detail" component={TopicDetail} />
              <AppRoute component={Error} />
          </Switch>
        )} />
      </Provider>
    </>
  );
}

export default App;