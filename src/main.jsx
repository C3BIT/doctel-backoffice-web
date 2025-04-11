import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { persistor, store } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { WebSocketProvider } from './providers/WebSocketProvider';
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WebSocketProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </WebSocketProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
