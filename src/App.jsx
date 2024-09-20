import React, { useRef } from 'react'
import { PropTypes } from 'prop-types'
import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig'
import { Router, Route, Routes } from "react-router-dom"
import { createBrowserHistory } from "history"
import Footer from './components/footer/Footer'
import ScrollToTop from './components/ScrollToTop'
import './App.scss'

import Error404 from "./components/Error404"
import Home from './routes/home/Home'
import About from './routes/about/About'
import Lab from './routes/lab/Lab'
import CaseStudy from './routes/caseStudy/CaseStudy'
import CreativeDirector from './routes/creativeDirector/CreativeDirector'

const history = createBrowserHistory({ window });

export default function App() {
  const eventSource = useRef(null);

  return (
    <div ref={eventSource} className="page-container">
      <GlobalCanvas style={{ pointerEvents: 'none' }}>
      </GlobalCanvas>
      <SmoothScrollbar>
        {() => (
          <>
            <BrowserRouter history={history}>
              <Routes>
                <Route path='*' element={<Error404 />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/lab" element={<Lab />} />
                <Route path="/case-study/:id" element={<CaseStudy />} />
                <Route path="/creative-director/:id" element={<CreativeDirector />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </>
        )}
      </SmoothScrollbar>
    </div>
  )
}

BrowserRouter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  history: PropTypes.any
}

export function BrowserRouter({ children, history }) {
  let [state, dispatch] = React.useReducer((_, action) => action, {
    action: history.action,
    location: history.location
  });

  React.useLayoutEffect(() => history.listen(dispatch), [history]);

  return (
    <Router
      action={state.action}
      location={state.location}
      navigator={history}
    >
      <ScrollToTop />
      {children}
    </Router>
  );
}
