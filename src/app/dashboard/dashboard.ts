import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Overview } from '../services/overview';
@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, CommonModule,FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})





export class Dashboard implements AfterViewInit {
   @ViewChild('occupancyChart') occupancyChartRef!: ElementRef<HTMLCanvasElement>;

  constructor(private overviewService: Overview) {}
  isEventFormOpen = false;
  isEventsCalendarOpen = false;
  events: any[] = [];
  isCalendarOpen = false;
  isTasksPageOpen = false;
  isCommunityBoxOpen = false;
  isTaskOpen = false;
  isCommunityOpen = false;
  isEventOpen = false;
  floors = ['Floor 1', 'Floor 2', 'Floor 4'];
selectedFloor = 'Floor 4';
staffList = ['Maintenance Team', 'Electrical Team', 'Surveillance Team'];
selectedStaff = '';
isAssignOpen = false;
currentDefect: any = null;
selectedDefect: any = null;
showAnnouncementModal = false;



communityMessage: string = '';

newEvent = {
  title: '',
  time: '',
  participants: '',
  floor: 'All'
};
  userMessage: string = '';
  messages: { text: string, sender: 'user' | 'bot' }[] = [];
  confirmedPercent = 0;
  pendingPercent = 0;
  cancelledPercent = 0;

  inProgress = 9;
  outstanding = 12;
  completed = 24;



   ngAfterViewInit(): void {
  if (typeof window !== 'undefined') {
    const ctx = this.occupancyChartRef.nativeElement.getContext('2d');
    if (!ctx) return;
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
          label: 'Occupancy %',
          data: [80, 75, 90, 60, 70, 95, 85, 92, 50, 65, 78, 88],
          backgroundColor: '#00b294'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true, max: 100 } }
      }
    });
  }
}

  
   
   sendMessage() {if(!this.userMessage.trim()) return;
    this.messages.push({ text: this.userMessage, sender: 'user' });
    const userText=this.userMessage;
    this.userMessage = '';
    setTimeout(() => {
      const response=this.generateresponse(userText);
      this.messages.push({ text: response, sender: 'bot' });
    }, 850);
  }
  
 generateresponse(userText: string): string {
  const text = userText.toLowerCase();

  if (text.includes('occupancy'))
    return 'The current occupancy rate is 85%.';

  if (text.includes('hello') || text.includes('hi'))
    return 'Hello! How can I assist you today?';

  if (text.includes('check in') || text.includes('check out'))
    return 'Check-in time is 3 PM and check-out time is 11 AM.';

  if (text.includes('amenities'))
    return 'We offer free Wi-Fi, a fitness center, and a swimming pool.';

  if (text.includes('booking'))
    return 'You can book a room through our website or by calling our front desk.';

    if (text.includes('occupancy rate this month'))
    return 'The occupancy rate this month is 85%.';

  
  if (text.includes('show today\'s maintenance tasks'))
    return 'Today\'s maintenance tasks are: 1. Elevator inspection, 2. Pool cleaning, 3. HVAC filter replacement.';

  if(text.includes('urgent complaints summary'))
    return 'There are 3 urgent complaints: 1. Elevator malfunction, 2. Pool water quality, 3. HVAC system failure.';

    if(text.includes('is this free?'))
    return 'Yes, all our services are free of charge.';

    if(text.includes('how do I create an account?'))
      return 'You can create an account by visiting our website and clicking on the "Sign Up" button.';

    if(text.includes('what is the cancellation policy?'))
      return 'Our cancellation policy allows you to cancel your reservation up to 24 hours before your scheduled check-in time without any penalty.';

    if(text.includes('can I get a late check-out?'))
      return 'Late check-out is subject to availability and may incur an additional fee. Please contact our front desk for more information.';

    if(text.includes('what are the dining options?'))
      return 'We offer a variety of dining options including a full-service restaurant, a coffee bar, and room service.';

    if(text.includes('do you have parking facilities?'))
      return 'Yes, we have a secure parking lot available for our guests. Parking fees may apply.';

    if(text.includes('how do I change my profile'))
      return 'You can change your profile information by logging into your account on our website and navigating to the "Profile" section.';
  
    return "I'm sorry, I don't have that information. Please contact our support team for assistance.";
}
 bookingList = [
    { name: 'Gym', value: 42 },
    { name: 'Party room', value: 38 },
    { name: 'Roof top', value: 31 },
    { name: 'Game room', value: 25 },
    { name: 'Study room', value: 18 },
    { name: 'Pool', value: 12 }
  ];

    upcomingEvents = [
    { title: 'New resident welcome', time: '2:00 PM', day: 'Today' },
    { title: 'Fire safety drill', time: '11:00 AM', day: 'Tomorrow' },
    { title: 'Community BBQ', time: '6:00 PM', day: 'Saturday' }
  ];


  allEvents = [
    { title: 'Building inspection', date: '2026-03-03', time: '10:00 AM' },
    { title: 'New resident welcome', date: '2026-03-03', time: '2:00 PM' },
    { title: 'Fire safety drill', date: '2026-03-04', time: '11:00 AM' },
    { title: 'Community BBQ', date: '2026-03-06', time: '6:00 PM' }
  ];

  tasks = [
    {
      id: 1,
      title: 'Fix elevator on 12th floor',
      user: 'Mike T.',
      status: 'Critical',
      time: 'Today'
    },
    {
      id: 2,
      title: 'Replace gym equipment',
      user: 'Lisa M.',
      status: 'Medium',
      time: 'Tomorrow'
    },
    {
      id: 3,
      title: 'Pool maintenance check',
      user: 'Alex R.',
      status: 'Completed',
      time: 'Yesterday'
    }
  ];
  ngOnInit(){
 this.filteredDefects = this.defects;
  this.overviewService.getOverviewData().subscribe(res => {
  const total=res.confirmed+res.pending+res.cancelled;
  if(total>0){
    this.confirmedPercent=(res.confirmed/total)*100;
    this.pendingPercent=(res.pending/total)*100;
    this.cancelledPercent=(res.cancelled/total)*100;
  }
});
  }


  get totalTasks() {
    return this.inProgress + this.outstanding + this.completed;
  }

  get inProgressPercent() {
    return (this.inProgress / this.totalTasks) * 100;
  }

  get outstandingPercent() {
    return (this.outstanding / this.totalTasks) * 100;
  }

  get completedPercent() {
    return (this.completed / this.totalTasks) * 100;
  }

 

  

  openCalendar() { this.isCalendarOpen = true; }
  closeCalendar() { this.isCalendarOpen = false; }
  getColor(status: string) {
    if (status === 'confirmed') return 'green';
    if (status === 'pending') return 'orange';
    if (status === 'cancelled') return 'red';
    return 'gray';
  }


  

  assignTask(task: any, user: string) {
    task.user = user;
    task.status = 'Assigned';
  }


  event = [
    { title: 'Inspection', time: '10 AM' },
    { title: 'Fire Drill', time: '11 AM' }
  ];
  

  openEvents() { this.isEventsCalendarOpen = true; }
  closeEvents() { this.isEventsCalendarOpen = false; }


  communityFeed: string[] = [];
  openCommunity() { 
    this.isCommunityBoxOpen = false; 
  }
  submitCommunity() {
    if(this.communityMessage.trim()) {
      this.communityFeed.unshift(this.communityMessage);
      this.communityMessage = '';
      this.isCommunityBoxOpen = false;
    }
  }

  
  closeBookingCalendar() {
    this.isCalendarOpen = false;
  }

 
 
openBookingCalendar(){
    this.isCalendarOpen = true;
    
}



  




openCommunityBox() {
  this.isCommunityBoxOpen = true;
}

closeCommunityBox() {
  this.isCommunityBoxOpen = false;
}


openEventForm() {
  this.isEventFormOpen = true;
}

closeEventForm() {
  this.isEventFormOpen = false;
}


 modals: { [key: string]: boolean } = {
    bookingCalendar: false,
    viewAllTasks: false,
    eventsCalendar: false,
    communityBox: false,
    eventForm: false
  };


  booking = [
    { id: 1, title: 'Meeting Room', status: 'confirmed' },
    { id: 2, title: 'Gym Slot', status: 'pending' },
    { id: 3, title: 'Event Hall', status: 'cancelled' }
  ];

 defects = [
  {
    id: 1,
    floor: 'Floor 4',
    title: 'Surveillance camera drift',
    priority: 'Critical',
    description: 'Camera misalignment events increase by 40%',
    category: 'Equipment',
    lastOccurrence: '2 hours ago',
    assignedTo: '',
    confidence: '95%',
    impact: '-15%',
    cost: '$2,400',
    recommendation: 'Schedule preventive maintenance'
  },
  {
    id: 2,
    floor: 'Floor 4',
    title: 'Ceiling lights',
    priority: 'Critical',
    description: 'Multiple flickering lights reports',
    category: 'Equipment',
    lastOccurrence: '1 min ago',
    assignedTo: 'Surveillance Team',
    confidence: '89%',
    impact: '-8%',
    cost: '$800',
    recommendation: 'Retrain model with recent data'
  }
];


  task = [
    { id: 1, title: 'Fix Light', status: 'In Progress', user: 'Ali', time: '10:00 AM' },
    { id: 2, title: 'Clean Lobby', status: 'Completed', user: 'Ahmed', time: '12:00 PM' },
    { id: 3, title: 'Repair AC', status: 'Outstanding', user: 'Sara', time: '02:00 PM' }
  ];
   taskList = [
    { name: 'Prepare Report', status: 'completed', value: 100 },
    { name: 'Team Meeting', status: 'in-progress', value: 60 },
    { name: 'Client Call', status: 'pending', value: 0 }
  ];




  allData = [
    { floor: 'Floor 1', task: 'Fix Door', user: 'Ali' },
    { floor: 'Floor 2', task: 'Clean Hall', user: 'Ahmed' }
  ];



  openModal(modalName: string) {
    this.modals[modalName] = true;
  }

  closeModal(modalName: string) {
    this.modals[modalName] = false;
  }

  

 
  submitCommunityUpdate() {
    if (this.communityMessage.trim()) {
      this.communityFeed.unshift(this.communityMessage);
      this.communityMessage = '';
      this.closeModal('communityBox');
    }
  }

  addEvent() {
    if (this.newEvent.title && this.newEvent.time) {
      this.events.push({ ...this.newEvent });
      this.newEvent = { title: '', time: '', participants: '', floor: 'All' };
      this.closeModal('eventForm');
    }

  }

 

  getEventsByFloor() {
    if (this.selectedFloor === 'All') return this.events;
    return this.events.filter(e => e.floor === this.selectedFloor);
  }
  bookingcalendar(){
  console.log('clicked')
  this.isCalendarOpen = !this.isCalendarOpen;
  }


  getBookingStatusColor(status: string) {
    if (status === 'confirmed') return 'green';
    if (status === 'pending') return 'orange';
    if (status === 'cancelled') return 'red';
    return 'black';
  }
   getTaskStatusColor(status: string) {
    if (status === 'completed') return 'green';
    if (status === 'in-progress') return 'orange';
    if (status === 'pending') return 'red';
    return 'black';
  }
  
openAllTasks() {
    this.isTaskOpen = true; 
  }

  closeTaskModal() {
    this.isTaskOpen = false; 
  }
   

  
  postList = [
    { text: 'Community Post 1' },
    { text: 'Community Post 2' }
  ];

  eventList = [
    { title: 'Event 1', date: '2026-03-05', time: '10:00 AM' },
    { title: 'Event 2', date: '2026-03-10', time: '02:00 PM' }
  ];


  openCommunityModal() { 
    this.isCommunityOpen = true; 
  }
  closeCommunityModal() { 
    this.isCommunityOpen = false; 
  }

  openEventModal() { 
    this.isEventOpen = true; 
  }
  closeEventModal() { 
    this.isEventOpen = false; 
  }



  openCalendarModal() { this.isCalendarOpen = true; }
  closeCalendarModal() { this.isCalendarOpen = false; }









  filteredDefects = [...this.defects];
  onFloorChange(floor: string) {
    this.filteredDefects = this.defects.filter(d => d.floor === floor);
  }

openAssignModal() {
    this.isAssignOpen = true;
  }

 
  confirmAssign() {
    if (!this.selectedStaff) {
      alert('Please select a staff member!');
      return;
    }
    console.log('Assigned staff:', this.selectedStaff);


    
  }

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







