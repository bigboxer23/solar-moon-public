import { IntlProvider } from 'react-intl';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import About from './components/about/About';
import Docs from './components/docs/Docs';
import Footer from './components/Footer';
import Home from './components/home/Home';
import Navbar2 from './components/nav/Navbar';
import PricingPage from './components/pricing/PricingPage';
import PrivacyPolicy from './components/tos/PrivacyPolicy';
import TermsOfService from './components/tos/TermsOfService';

function App() {
  document.getElementsByTagName('body')[0].style.backgroundColor = '#eef2f9';

  return (
    <IntlProvider locale={navigator.language}>
      <Router>
        <div className='App' id='scroll'>
          <Navbar2 />
          <Routes>
            <Route element={<Home />} path='/' />
            <Route element={<PricingPage />} path='/pricing' />
            <Route element={<Docs />} path='/docs' />
            <Route element={<About />} path='/about' />
            <Route element={<TermsOfService />} path='/tos' />
            <Route element={<PrivacyPolicy />} path='/privacy' />
            <Route element={<Navigate to='/' />} path='*' />
          </Routes>
          <Footer />
        </div>
      </Router>
    </IntlProvider>
  );
}

export default App;
