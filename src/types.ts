export interface EventDetails {
  id: string;
  name: string;
  department: string;
  dateTime: string;
  venue: string;
  ticketPrice: number;
  totalTickets: number;
}

export interface BookingDetails {
  id: string;
  userName: string;
  email: string;
  department: string;
  ticketsQuantity: number;
  totalAmount: number;
  eventName: string;
}
