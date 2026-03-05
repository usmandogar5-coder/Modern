import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Overview {
constructor() {}

getOverviewData():Observable<{confirmed:number,pending:number,cancelled:number}> {
 const fakeResponse = {
      confirmed: 40,
      pending: 30,
      cancelled: 30
    };
    return of(fakeResponse);
  };
}
