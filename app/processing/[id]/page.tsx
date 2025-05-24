'use client';

import { useEffect } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useParking } from '../../context/ParkingContext';

export default function ProcessingPage() {
  const router = useRouter();
  const pathname = usePathname(); // 👈 Preluăm pathname-ul curent
  const { data } = useParking();
  
    const params = useParams();  // folosești useParams
    const id = params.id;        // extragi id din path

  useEffect(() => {
    console.log('Final Parking Data:', data);
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
       if (id) {
      router.push(`/verify/${id}`);  // redirect cu id in path
    } else {
      router.push('/verify');
    }
    }, 40000);
    return () => clearTimeout(timer);
  }, [router]);

  // 👇 Stabilim culoarea pe baza pathname-ului
  const isGreen = pathname.includes('/c1');
  const isBlue = pathname.includes('/q1');

  const spinnerStyle = {
    borderTopColor: isGreen ? '#047857' : isBlue ? '#0172f2' : '#333',
    borderBottomColor: isGreen ? '#047857' : isBlue ? '#0172f2' : '#333',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-8">
      <div
        id="processing-spinner"
        className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 mb-6"
        style={spinnerStyle}
      />
      <h1 className="text-xl font-semibold mb-2">
        Processing your information...
      </h1>
      <p className="text-gray-600 max-w-md">
        We&apos;re finalizing your parking details and securing your payment.
        This will only take a few moments. Thank you for your patience!
      </p>
    </div>
  );
}
