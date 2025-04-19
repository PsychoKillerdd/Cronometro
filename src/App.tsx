// CountdownTimer.tsx
// Componente React en TypeScript que muestra una cuenta regresiva de días, horas, minutos y segundos hasta el 16 de noviembre de 2025

import { FC, useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: FC = () => {
  // Fecha objetivo: 16 de noviembre de 2025 a la medianoche
  const targetDate = new Date('2025-11-16T00:00:00');

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4">Cuenta regresiva</h2>
      <div className="flex space-x-4 text-center">
        <div>
          <p className="text-5xl font-bold text-indigo-600">{timeLeft.days}</p>
          <p className="text-sm text-gray-500">días</p>
        </div>
        <div>
          <p className="text-5xl font-bold text-indigo-600">{timeLeft.hours}</p>
          <p className="text-sm text-gray-500">horas</p>
        </div>
        <div>
          <p className="text-5xl font-bold text-indigo-600">{timeLeft.minutes}</p>
          <p className="text-sm text-gray-500">minutos</p>
        </div>
        <div>
          <p className="text-5xl font-bold text-indigo-600">{timeLeft.seconds}</p>
          <p className="text-sm text-gray-500">segundos</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

// Ejemplo de uso en App.tsx
// import { FC } from 'react';
// import CountdownTimer from './CountdownTimer';

// const App: FC = () => (
//   <div className="min-h-screen flex items-center justify-center bg-gray-100">
//     <CountdownTimer />
//   </div>
// );

// export default App;
