import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo.ts';
import './index.css'
import { ROUTE_CONFIG } from './routes/index.ts';
import Page404 from './containers/Page404/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        {ROUTE_CONFIG.map((item) => (
          <Route 
            key={item.key} 
            path={item.path} 
            element={<item.element />} 
          />
        ))}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>,
)
