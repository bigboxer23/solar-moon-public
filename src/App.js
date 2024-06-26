import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import About from './components/about/About';
import AccountActivationError from './components/account/AccountActivationError';
import AccountVerified from './components/account/AccountVerified';
import Docs from './components/docs/Docs';
import Footer from './components/Footer';
import Home from './components/home/Home';
import Navbar2 from './components/nav/Navbar';
import PricingPage from './components/pricing/PricingPage';
import PrivacyPolicy from './components/tos/PrivacyPolicy';
import TermsOfService from './components/tos/TermsOfService';

function App() {
  return (
    <Router>
      <div className='App dark:bg-gray-950' id='scroll'>
        <Navbar2 />
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<PricingPage />} path='/pricing' />
          <Route element={<Docs />} path='/docs' />
          <Route element={<Docs />} path='/docs/:docName' />
          <Route element={<About />} path='/about' />
          <Route element={<TermsOfService />} path='/tos' />
          <Route element={<PrivacyPolicy />} path='/privacy' />
          <Route element={<AccountVerified />} path='/verified' />
          <Route
            element={<AccountActivationError />}
            path='/accountActivationError'
          />
          <Route element={<Navigate to='/' />} path='*' />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
