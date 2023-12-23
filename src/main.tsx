import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GlobalProvider } from './provider/GlobalProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
);
