'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname , useParams} from 'next/navigation';
import { useParking } from '../../context/ParkingContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export default function VehiclePage() {
  const { data, setData } = useParking();
  const [plate, setPlate] = useState(data.licensePlate || "");
  const [locationId, setLocationId] = useState(data.locationId || "");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams(); // folosești useParams
  const id = params.id; // extragi id din path
 

  // Detectare culoare în funcție de id-ul din URL
  const isGreen = pathname.includes('/c1');
  const isBlue = pathname.includes('/q1');

  const buttonStyle = {
    backgroundColor: isGreen ? '#047857' : isBlue ? '#0172f2' : '#333',
  };

  const footerStyle = {
    backgroundColor: isGreen ? '#047857' : isBlue ? '#0172f2' : '#333',
  };

  const handleContinue = () => {
    setData({ licensePlate: plate , locationId});
    
     if (id) {
      router.push(`/payment/${id}`);  // redirect cu id in path
    } else {
      router.push('/payment');
    }
  };

  useEffect(() => {
    console.log('Parking Context Data:', data);
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Breadcrumbs */}
      <div className="p-4 text-sm text-gray-600">
        <Breadcrumbs />
      </div>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center text-center px-4 flex-1">
        <h1 className="text-xl font-bold mb-4">Add your license plate</h1>

        <div className="w-full max-w-md">
          <label className="block text-left mb-1 font-semibold">
            License plate No.
          </label>
          <input
            type="text"
            placeholder="License plate No."
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            className="w-full border rounded p-2 mb-4"
          />
          <input
            type="text"
          placeholder="Location ID"
          value={locationId}
          onChange={(e) => setLocationId(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          />

          {/* Continue button */}
          <button
            onClick={handleContinue}
            className="w-full text-white py-2 rounded hover:brightness-90 transition duration-200"
            style={buttonStyle}
          >
            Continue
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-white text-center text-sm py-2"
        style={footerStyle}
      >
        Copyright © EasyPark AB 2025
      </footer>
    </div>
  );
}
