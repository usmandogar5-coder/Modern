export interface Building {
  id: string;
  name: string;
  totalUnits: number;
  occupiedUnits: number;
  residents: number;
}

export interface ServiceRequest {
  buildingId: string;
  createdAt: Date;
  resolvedAt?: Date;
  status: 'open' | 'closed' | 'overdue';
}

export interface Task {
  buildingId: string;
  status: 'completed' | 'pending' | 'overdue';
}

export interface Booking {
  buildingId: string;
  date: Date;
  hoursBooked: number;
  totalHours: number;
}

export interface Delivery {
  buildingId: string;
  date: Date;
}
