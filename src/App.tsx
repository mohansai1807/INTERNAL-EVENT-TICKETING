/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { BookingForm } from './components/BookingForm';
import { Confirmation } from './components/Confirmation';
import { EventDetails, BookingDetails } from './types';

import { BookingHistory } from './components/BookingHistory';

const INITIAL_EVENT: EventDetails = {
  id: 'ev-001',
  name: 'Annual Tech Symposium 2026',
  department: 'Strategic Technology Division',
  dateTime: 'May 14, 2026 @ 10:00 AM',
  venue: 'Main Auditorium, North Campus',
  ticketPrice: 3500,
  totalTickets: 50,
};

export default function App() {
  const [availableTickets, setAvailableTickets] = useState(INITIAL_EVENT.totalTickets);
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [lastBookingId, setLastBookingId] = useState<string | null>(null);

  const handleBookingComplete = (booking: BookingDetails) => {
    setAvailableTickets(prev => Math.max(0, prev - booking.ticketsQuantity));
    setBookings(prev => [booking, ...prev]);
    setLastBookingId(booking.id);
  };

  const currentBooking = bookings.find(b => b.id === lastBookingId) || null;

  return (
    <Router>
      <div className="min-h-screen bg-[#FDFDFF] font-sans text-gray-900" id="app-container">
        <Navbar />
        
        <main className="container mx-auto py-8">
          <Routes>
            <Route 
              path="/" 
              element={<Home event={INITIAL_EVENT} availableTickets={availableTickets} />} 
            />
            <Route 
              path="/book" 
              element={
                <BookingForm 
                  event={INITIAL_EVENT} 
                  availableTickets={availableTickets} 
                  onBookingComplete={handleBookingComplete} 
                />
              } 
            />
            <Route 
              path="/confirmation" 
              element={<Confirmation booking={currentBooking} />} 
            />
            <Route 
              path="/history" 
              element={<BookingHistory bookings={bookings} />} 
            />
          </Routes>
        </main>

        <footer className="py-12 text-center text-gray-400 text-sm font-medium border-t border-gray-50 mt-auto">
          &copy; 2026 HR Operations Division &bull; Internal Events Only
        </footer>
      </div>
    </Router>
  );
}

