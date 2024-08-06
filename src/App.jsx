import React, { useState, useRef } from 'react'
import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig'
import { Router, Link, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Home from './home/Home'

const history = createBrowserHistory({ window });

export default function App() {
  const eventSource = useRef(null);
  const [count, setCount] = useState(0)

  return (
    <div ref={eventSource} className="page-container">
      <GlobalCanvas />
      <SmoothScrollbar>
        {() => (
          <>
            <BrowserRouter history={history}>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </BrowserRouter>
          </>
        )}
      </SmoothScrollbar>
    </div>
  )
}

export function BrowserRouter({ children, history }) {
  let [state, dispatch] = React.useReducer((_, action) => action, {
    action: history.action,
    location: history.location
  });

  React.useLayoutEffect(() => history.listen(dispatch), [history]);

  return (
    <Router
      children={children}
      action={state.action}
      location={state.location}
      navigator={history}
    />
  );
}
