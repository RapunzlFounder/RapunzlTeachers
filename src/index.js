import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor} from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import ReactDOM from 'react-dom/client';
import PageVisibility from 'react-page-visibility';

import App from './App';

//import reportWebVitals from './reportWebVitals';

// NOTE:  The following wrappers are created so that we can retrieve URL parameters when using class components with react router 6

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PageVisibility>
          <App />
        </PageVisibility>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
