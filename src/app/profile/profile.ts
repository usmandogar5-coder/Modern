import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";


@Component({
  selector: 'app-profile',
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
    userName: string = 'James';
    isCalendarOpen=false;
    isBookCalendarOpen=false;
    showDeliveryModal = false;
    deliveries: any[] = [];
    showAnnouncementModal = false;



  constructor(private router: Router) {}
 booking = [
    { id: 1, title: 'Meeting Room', status: 'confirmed' },
    { id: 2, title: 'Gym Slot', status: 'pending' },
    { id: 3, title: 'Event Hall', status: 'cancelled' }
  ];


 
  buildings = [
    { id: 1, name: 'Building A', residents: 100, occupied: 90, totalUnits: 100 },
    { id: 2, name: 'Building B', residents: 80, occupied: 60, totalUnits: 100 },
    { id: 3, name: 'Building C', residents: 120, occupied: 110, totalUnits: 120 }
  ];


  requests = [
    { buildingId: 1, status: 'open', daysOld: 1 },
    { buildingId: 1, status: 'overdue', daysOld: 10 },
    { buildingId: 2, status: 'open', daysOld: 3 },
    { buildingId: 3, status: 'overdue', daysOld: 8 },
    { buildingId: 3, status: 'open', daysOld: 2 }
  ];


  tasks = [
    { buildingId: 1, status: 'completed' },
    { buildingId: 1, status: 'pending' },
    { buildingId: 2, status: 'completed' },
    { buildingId: 3, status: 'pending' }
  ];
eliveries = [
    { title: 'Package A', date: '2025-03-05' },
    { title: 'Package B', date: '2025-03-06' },
    { title: 'Package C', date: '2025-03-07' }
  ];

   allEvents = [
    { title: 'Building inspection', date: '2026-03-03', time: '10:00 AM' },
    { title: 'New resident welcome', date: '2026-03-03', time: '2:00 PM' },
    { title: 'Fire safety drill', date: '2026-03-04', time: '11:00 AM' },
    { title: 'Community BBQ', date: '2026-03-06', time: '6:00 PM' }
  ];


  get totalOpenRequests() {
    return this.requests.filter(r => r.status === 'open').length;
  }

  get totalOverdueRequests() {
    return this.requests.filter(r => r.status === 'overdue').length;
  }

  get taskCompletionRate() {
    const completed = this.tasks.filter(t => t.status === 'completed').length;
    return Math.round((completed / this.tasks.length) * 100);
  }

  

  getBuildingData(building: any) {

    const buildingRequests =
      this.requests.filter(r => r.buildingId === building.id);

    const requestsPerResident =
      buildingRequests.length / building.residents;

    const occupancy =
      (building.occupied / building.totalUnits) * 100;

    return {
      occupancy: Math.round(occupancy),
      requestsPerResident: requestsPerResident.toFixed(2)
    };
  }



  get riskBuildings() {
    return this.buildings.filter(b => {

      const overdueCount =
        this.requests.filter(r =>
          r.buildingId === b.id && r.status === 'overdue'
        ).length;

      return overdueCount > 1; 
    });
  }

 

  get aiSummary() {
    return `
    Open Requests: ${this.totalOpenRequests}
    Overdue Requests: ${this.totalOverdueRequests}
    Task Completion: ${this.taskCompletionRate}%
    `;
  }

 
logout(){
  this.router.navigate(['/login']);
}

activeModal: string | null = null;

  openModal(type: string) {
    this.activeModal = type;
  }

  closeModal() {
    this.activeModal = null;
  }
   closeBookingCalendar() {
    this.isBookCalendarOpen = false;
  }

  getBookingStatusColor(status: string) {
    if (status === 'confirmed') return 'green';
    if (status === 'pending') return 'orange';
    if (status === 'cancelled') return 'red';
    return 'black';
  }


openDeliveryModal(){
  this.showDeliveryModal = true;
}

closeDeliveryModal(){
  this.showDeliveryModal = false;
}
 
openBookingCalendar(){
    this.isBookCalendarOpen = true;
}
   openCalendarModal() { this.isCalendarOpen = true; }
  closeCalendarModal() { this.isCalendarOpen = false; }

  announcements: any[] = [];

openAnnouncementModal() {
  this.showAnnouncementModal = true;

  this.announcements = [
    { title: 'Maintenance Notice', date: '2025-03-10' },
    { title: 'Community Meeting', date: '2025-03-12' },
    { title: 'Water Supply Update', date: '2025-03-15' }
  ];
}

closeAnnouncementModal() {
  this.showAnnouncementModal = false;
}

}
