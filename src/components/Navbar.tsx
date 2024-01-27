import aimation from "../assets/Animation - 1706312547196.json";
import Lottie from 'lottie-react';

export default function Navbar() {
  return (
    <nav className='rounded-full px-12 h-10 bg-teal-600 flex flex-col md:flex-row items-center justify-between gap-20'>
    <div className='hidden md:block w-24 h-24 bg-teal-600 rounded-full -p-8 relative'>
      <div className='absolute -top-4 md:-left-6 lg:-left-4 w-32'>
        <Lottie animationData={aimation} loop={false}/>
      </div>
    </div>
    <div className="rounded-full bg-teal-600 py-3 -mt-3 md:mt-0 px-16">
      <p className="text-3xl sm:text-4xl font-semibold text-center">ID CARD EXTRACTOR</p>
    </div> 
    <div className='w-32 hidden md:block'>
    </div>     
  </nav>
  )
}
