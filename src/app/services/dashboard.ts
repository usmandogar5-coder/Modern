import { Injectable } from '@angular/core';
import { Building, ServiceRequest, Task } from '../models/dashboard';
@Injectable({
  providedIn: 'root',
})
export class Dashboard {
getOccupancyRate(building: Building): number {
    return (building.occupiedUnits / building.totalUnits) * 100;
  }

  getCompletionRate(tasks: Task[]): number {
    const completed = tasks.filter(t => t.status === 'completed').length;
    return (completed / tasks.length) * 100;
  }

  getOpenRequests(requests: ServiceRequest[]): number {
    return requests.filter(r => r.status === 'open').length;
  }

  getAvgResolutionTime(requests: ServiceRequest[]): number {
    const closed = requests.filter(r => r.status === 'closed');

    const totalHours = closed.reduce((acc, r) => {
      const diff =
        (new Date(r.resolvedAt!).getTime() -
          new Date(r.createdAt).getTime()) /
        (1000 * 60 * 60);

      return acc + diff;
    }, 0);

    return closed.length ? totalHours / closed.length : 0;
  }

 

  getRequestsPerResident(
    requests: ServiceRequest[],
    building: Building
  ): number {
    return requests.length / building.residents;
  }

  

  getAgeingBuckets(requests: ServiceRequest[]) {
    const now = new Date();

    return {
      '0-2': requests.filter(r =>
        this.daysBetween(r.createdAt, now) <= 2
      ).length,

      '3-7': requests.filter(r => {
        const d = this.daysBetween(r.createdAt, now);
        return d > 2 && d <= 7;
      }).length,

      '7+': requests.filter(r =>
        this.daysBetween(r.createdAt, now) > 7
      ).length
    };
  }

  private daysBetween(date1: Date, date2: Date): number {
    return (
      (date2.getTime() - date1.getTime()) /
      (1000 * 60 * 60 * 24)
    );
  }

  
  getRiskBuildings(
    buildings: Building[],
    requests: ServiceRequest[],
    tasks: Task[]
  ) {
    return buildings.filter(b => {

      const buildingRequests = requests.filter(
        r => r.buildingId === b.id
      );

      const overdue = buildingRequests.filter(
        r => r.status === 'overdue'
      ).length;

      const buildingTasks = tasks.filter(
        t => t.buildingId === b.id
      );

      const completion = this.getCompletionRate(buildingTasks);

      return overdue > 10 || completion < 70;
    });
  }

}
