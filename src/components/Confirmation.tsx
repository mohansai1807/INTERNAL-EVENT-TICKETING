import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, QrCode, ArrowRight, History } from 'lucide-react';
import { BookingDetails } from '../types';
import { motion } from 'motion/react';

interface ConfirmationProps {
  booking: BookingDetails | null;
}

export const Confirmation: React.FC<ConfirmationProps> = ({ booking }) => {
  const navigate = useNavigate();

  if (!booking) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">No booking record found.</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 text-indigo-600 font-semibold underline"
        >
          Go to Event Details
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4" id="confirmation-page">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-50"
      >
        <div className="bg-emerald-500 p-8 text-center text-white">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12 }}
            className="inline-block p-4 bg-white/20 rounded-full mb-4"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-3xl font-black tracking-tight mb-2">Booking Confirmed!</h2>
          <p className="text-emerald-100 font-medium tracking-wide uppercase text-sm">Thank you for your reservation</p>
        </div>

        <div className="p-8 md:p-12 relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-[radial-gradient(circle_at_center,_#10b981_1px,_transparent_1px)] bg-[length:12px_12px] opacity-10" />
          
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Attendee</p>
              <p className="text-xl font-bold text-gray-900">{booking.userName}</p>
              <p className="text-sm text-gray-500">{booking.email}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Conf ID</p>
              <p className="text-xl font-mono font-bold text-indigo-600">#{booking.id.toUpperCase()}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-12">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Event</p>
                <p className="font-bold text-gray-900">{booking.eventName}</p>
              </div>
              <QrCode className="w-12 h-12 text-gray-300" />
            </div>

            <div className="border-t border-dashed border-gray-200 pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tickets Quantity</span>
                <span className="font-bold text-gray-900">{booking.ticketsQuantity} Pack</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Department</span>
                <span className="font-bold text-gray-900">{booking.department}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-gray-900">Total Paid</span>
                <span className="text-2xl font-black text-indigo-600">₹{booking.totalAmount}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              className="flex-1 py-4 px-6 border-2 border-indigo-600 text-indigo-600 rounded-2xl font-bold flex items-center justify-center hover:bg-indigo-50 transition-colors"
              onClick={() => navigate('/history')}
            >
              <History className="w-5 h-5 mr-2" />
              Booking History
            </button>
            <button 
              className="flex-1 py-4 px-6 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              onClick={() => navigate('/')}
            >
              Return Home
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
