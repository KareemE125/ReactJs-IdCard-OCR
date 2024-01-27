import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';


export default function App() {


  return (
    <main className='px-2 pt-12 text-white min-h-screen' >
      <Navbar />
      <main className='max-w-5xl m-auto sm:px-16 pt-24'>
        <Home />
      </main>
      <footer className='-mx-2 py-6 bg-black flex justify-between items-center px-24'>
          <p className='text-center text-3xl'>🕊</p>
          <p className='text-center text-lg'>--- Made by <strong>Kareem Ezzat</strong> ---</p>
          <p className='text-center text-3xl'>🕊</p>
      </footer>
    </main>
  );
}

