import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { Sidenav } from "../sidenav/sidenav";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
 searchQuery: string = '';
  showNotifications: boolean = false;
  notifications: string[] = []; 
   showCreateModal = false;
  newAnnouncementTitle: string = '';
  newAnnouncementDescription: string = '';
  activeModal: string | null = null;
filteredData: any[] = [];
originalData: any[] = [];

   items: { title: string; description: string }[] = [
    { title: 'New Feature', description: 'Added dark mode' },
    { title: 'Server Update', description: 'Server will be down at 10 PM' },
    { title: 'Bug Fix', description: 'Fixed login issue' },
    { title: 'Maintenance Alert', description: 'Scheduled maintenance tomorrow' }
  ];

  filteredItems: { title: string; description: string }[] = [...this.items];

 
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }



  
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification') && !target.closest('.notification-panel')) {
      this.showNotifications = false;
    }
  }
openCreateAnnouncement() {
    this.showCreateModal = true;
  }

  closeCreateAnnouncement() {
    this.showCreateModal = false;
    this.newAnnouncementTitle = '';
    this.newAnnouncementDescription = '';
  }


  createAnnouncement() {
    if (this.newAnnouncementTitle.trim() && this.newAnnouncementDescription.trim()) {
      const newItem = {
        title: this.newAnnouncementTitle.trim(),
        description: this.newAnnouncementDescription.trim()
      };
      this.items.unshift(newItem);          
      this.filteredItems = [...this.items]; 
      this.notifications.unshift(`New announcement: ${newItem.title}`);
      this.closeCreateAnnouncement();       
    } else {
      alert('Please enter title and description!');
    }
  }


  openModal(type: string) {
    this.activeModal = type;
  }

  closeModal() {
    this.activeModal = null;
  }

  onSearch() {
  if (!this.searchQuery) {
    this.filteredData = this.originalData;
    return;
  }

  this.filteredData = this.originalData.filter(item =>
    item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}

}
