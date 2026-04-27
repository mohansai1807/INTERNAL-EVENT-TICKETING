import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Building, Ticket, ArrowLeft, RotateCcw } from 'lucide-react';
import { ErrorMessage } from './ErrorMessage';
import { BookingDetails, EventDetails } from '../types';
import { motion } from 'motion/react';

interface BookingFormProps {
  event: EventDetails;
  availableTickets: number;
  onBookingComplete: (booking: BookingDetails) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ event, availableTickets, onBookingComplete }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    tickets: 1,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    
    if (formData.tickets < 1) {
      newErrors.tickets = 'Quantity must be at least 1';
    } else if (formData.tickets > availableTickets) {
      newErrors.tickets = `Only ${availableTickets} tickets remaining`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', department: '', tickets: 1 });
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const booking: BookingDetails = {
        id: Math.random().toString(36).substr(2, 9),
        userName: formData.name,
        email: formData.email,
        department: formData.department,
        ticketsQuantity: formData.tickets,
        totalAmount: formData.tickets * event.ticketPrice,
        eventName: event.name,
      };
      onBookingComplete(booking);
      navigate('/confirmation');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4" id="booking-page">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
      >
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Event
        </button>

        <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Reserve Tickets</h2>
        <p className="text-gray-500 mb-8">SECURE YOUR SPOT FOR THE {event.name.toUpperCase()}</p>

        <form onSubmit={handleSubmit} className="space-y-6" id="booking-form">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block ml-1 uppercase tracking-wider">Full Name</label>
            <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all ${errors.name ? 'border-red-200 bg-red-50' : 'border-gray-100 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-50'}`}>
              <User className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="John Doe"
                className="bg-transparent border-none outline-none w-full text-gray-900 placeholder:text-gray-300"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <ErrorMessage message={errors.name} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block ml-1 uppercase tracking-wider">Work Email</label>
            <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all ${errors.email ? 'border-red-200 bg-red-50' : 'border-gray-100 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-50'}`}>
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="email" 
                placeholder="john@department.com"
                className="bg-transparent border-none outline-none w-full text-gray-900 placeholder:text-gray-300"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <ErrorMessage message={errors.email} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block ml-1 uppercase tracking-wider">Department</label>
            <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all ${errors.department ? 'border-red-200 bg-red-50' : 'border-gray-100 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-50'}`}>
              <Building className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="Engineering / HR"
                className="bg-transparent border-none outline-none w-full text-gray-900 placeholder:text-gray-300"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>
            <ErrorMessage message={errors.department} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 block ml-1 uppercase tracking-wider">Tickets</label>
              <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all ${errors.tickets ? 'border-red-200 bg-red-50' : 'border-gray-100 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-50'}`}>
                <Ticket className="w-5 h-5 text-gray-400 mr-3" />
                <input 
                  type="number" 
                  min="1"
                  className="bg-transparent border-none outline-none w-full text-gray-900"
                  value={formData.tickets}
                  onChange={(e) => setFormData({ ...formData, tickets: parseInt(e.target.value) || 0 })}
                />
              </div>
              <ErrorMessage message={errors.tickets} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 block ml-1 uppercase tracking-wider text-right">Estimated Total</label>
              <div className="px-4 py-3 text-right">
                <span className="text-2xl font-black text-indigo-600">₹{(formData.tickets || 0) * event.ticketPrice}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <button 
              type="button"
              onClick={handleReset}
              className="px-6 py-4 border-2 border-gray-100 rounded-2xl flex items-center text-gray-500 font-bold hover:bg-gray-50 transition-colors"
              id="reset-button"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </button>
            <button 
              type="submit"
              className="flex-1 bg-indigo-600 text-white rounded-2xl py-4 font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              id="submit-booking"
            >
              Complete Reservation
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
