import React from 'react';
import { useRoutes } from 'hookrouter';
import routes from './routes';

import ErrorPage from './pages/Error';
import Header from './components/Header';

const App = () => {
  const match = useRoutes(routes);

  return match ? (
    <>
      <Header />
      {match}
    </>
  ) : (
    <>
      <ErrorPage />
    </>
  );
};

export default App;
