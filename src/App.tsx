import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';


export default function App() {


  return (
    <main className='px-2 pt-12 text-white min-h-screen' >
      <Navbar />
      <main className='max-w-5xl m-auto sm:px-16 pt-24'>
        <Home />
      </main>
      <Footer />
    </main>
  );
}

