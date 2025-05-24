'use client';

import { useState } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useParking } from '../../context/ParkingContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export default function ParkingPage() {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(15);

    const router = useRouter();
    const pathname = usePathname();
    const { setData } = useParking();
    const params = useParams();  // folosești useParams
    const id = params.id;        // extragi id din path

    const calculatePrice = () => {
        const totalMinutes = hours * 60 + minutes;
        const pricePer15Min = 0.25;
        return ((totalMinutes / 15) * pricePer15Min).toFixed(2);
    };

      const handleContinue = () => {
    setData({
      hours,
      minutes,
      price: calculatePrice(),
    });

    if (id) {
      router.push(`/vehicle/${id}`);  // redirect cu id in path
    } else {
      router.push('/vehicle');
    }
  };

    const isGreen = pathname.includes('/c1');
    const isBlue = pathname.includes('/q1');



        
 const footerStyle = {
        backgroundColor: isGreen ? '#047857' : isBlue ? '#0172f2' : '#333',
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            {/* Top navigation */}
            <header className="p-4 border-b text-sm text-gray-600">
                <Breadcrumbs />
            </header>
            {/* Main content */}
               
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
                 <img
    src="https://pbs.twimg.com/profile_images/1582081543413141504/Sb9o-mV7_400x400.jpg"
    alt="Logo"
    className="header-image"
    width="90px"
    height="90px"
    
  />
                <h1 className="text-xl font-bold mb-2">How long do you want to park?</h1>
                <p className="text-sm text-gray-600 mb-6">Select your parking time by the hour and the minute.</p>

                <div className="flex gap-4 mb-4">
                    {/* Hours dropdown */}
                    <select
                        className="border p-2 rounded"
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                    >
                        {Array.from({ length: 24 }, (_, i) => (
                            <option key={i} value={i}>{i} Hours</option>
                        ))}
                    </select>

                    {/* Minutes dropdown */}
                    <select
                        className="border p-2 rounded"
                        value={minutes}
                        onChange={(e) => setMinutes(Number(e.target.value))}
                    >
                        {[0, 15, 30, 45].map((m) => (
                            <option key={m} value={m}>{m} Minutes</option>
                        ))}
                    </select>
                </div>

                {/* Price */}
                <p className="mb-1 text-md font-semibold">
                    Price: <span className="text-purple-700">{calculatePrice()} USD</span>
                </p>
                <p className="text-xs text-gray-500 mb-6">Estimated cost. You’ll see the final cost before you pay.</p>

                {/* Continue button */}

                {/* Green version */}
                {/* <button
                    onClick={handleContinue}
                    className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
                >
                    Continue
                </button> */}



                {/* Blue version */}
                <button
  onClick={handleContinue}
  style={{
    backgroundColor: isGreen ? '#047857' : isBlue ? '#0172f2' : '#333',
    color: '#fff', // text alb
  }}
  className="px-6 py-2 rounded font-medium hover:opacity-90 transition"
>
  Continue
</button>

            </main>

            {/* Footer */}
            {/* Green version */}
            {/* <footer className="bg-green-800 text-white text-center text-sm py-2"
            style={{ backgroundColor: '#0172f2' }}>
                Copyright © EasyPark AB 2025
            </footer> */}


            {/* Blue version */}
              <footer className="text-white text-center text-sm py-2" style={footerStyle}>
                Copyright © EasyPark AB 2025
            </footer>

        </div>
    );
}
