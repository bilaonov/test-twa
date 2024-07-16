import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@twa-dev/sdk';
import './index.scss';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.ts';

const manifestUrl =
  'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TonConnectUIProvider>
    </I18nextProvider>
  </React.StrictMode>,
);
