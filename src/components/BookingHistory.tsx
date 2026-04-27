import React from 'react';
import { useNavigate } from 'react-router-dom';
import { History, ArrowLeft, Ticket, Calendar, User } from 'lucide-react';
import { BookingDetails } from '../types';
import { motion } from 'motion/react';

interface BookingHistoryProps {
  bookings: BookingDetails[];
}

export const BookingHistory: React.FC<BookingHistoryProps> = ({ bookings }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4" id="history-page">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center">
              <History className="w-8 h-8 mr-3 text-indigo-600" />
              Booking History
            </h2>
            <p className="text-gray-500 mt-1 uppercase text-xs font-bold tracking-widest">Your past reservations and active passes</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-100">
            <Ticket className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No bookings yet</h3>
            <p className="text-gray-500 mt-2">When you book a ticket, it will appear here.</p>
            <button 
              onClick={() => navigate('/book')}
              className="mt-6 inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg"
            >
              Book Your First Ticket
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking, index) => (
              <motion.div 
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 transition-colors">
                      <Ticket className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg leading-tight">{booking.eventName}</h4>
                      <div className="flex items-center text-gray-400 text-xs mt-1 uppercase font-bold tracking-tighter">
                        <span className="text-indigo-600 mr-2 font-mono">#{booking.id.toUpperCase()}</span>
                        <span className="mx-2">•</span>
                        <User className="w-3 h-3 mr-1" /> {booking.userName}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 md:flex items-center gap-8 text-center md:text-right">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Tickets</p>
                      <p className="font-bold text-gray-900">{booking.ticketsQuantity}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Paid</p>
                      <p className="font-bold text-indigo-600">₹{booking.totalAmount}</p>
                    </div>
                    <div className="col-span-1">
                       <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full inline-block">
                         Confirmed
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
