import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="relative">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
