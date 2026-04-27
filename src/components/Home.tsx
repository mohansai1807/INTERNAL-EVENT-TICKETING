import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Building2, Ticket, Users } from 'lucide-react';
import { EventDetails } from '../types';
import { motion } from 'motion/react';

interface HomeProps {
  event: EventDetails;
  availableTickets: number;
}

export const Home: React.FC<HomeProps> = ({ event, availableTickets }) => {
  const navigate = useNavigate();
  const isSoldOut = availableTickets <= 0;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4" id="home-page">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className="relative h-64 bg-indigo-600 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 gap-4 transform -rotate-12 scale-150">
              {[...Array(64)].map((_, i) => (
                <Ticket key={i} className="text-white" />
              ))}
            </div>
          </div>
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl md:text-5xl font-black text-white text-center px-6 relative z-10 tracking-tight"
          >
            {event.name}
          </motion.h1>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <Building2 className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Department</p>
                  <p className="text-lg font-bold text-gray-900">{event.department}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Date & Time</p>
                  <p className="text-lg font-bold text-gray-900">{event.dateTime}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Venue</p>
                  <p className="text-lg font-bold text-gray-900">{event.venue}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <Ticket className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Price per Ticket</p>
                  <p className="text-lg font-bold text-gray-900">₹{event.ticketPrice}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Available Slots</p>
                  <p className={`text-lg font-bold ${isSoldOut ? 'text-red-500' : 'text-emerald-600'}`}>
                    {isSoldOut ? 'Sold Out' : `${availableTickets} Remaining`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={!isSoldOut ? { scale: 1.02 } : {}}
            whileTap={!isSoldOut ? { scale: 0.98 } : {}}
            onClick={() => navigate('/book')}
            disabled={isSoldOut}
            className={`w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-lg ${
              isSoldOut 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200'
            }`}
            id="book-now-button"
          >
            {isSoldOut ? 'Waitlist Only' : 'Book Your Ticket Now'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
