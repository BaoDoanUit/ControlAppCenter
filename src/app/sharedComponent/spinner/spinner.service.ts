import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  spinnerControl: Subject<boolean>;

  constructor() {
    this.spinnerControl = new Subject<boolean>();
  }

  show(): void {
    this.spinnerControl.next(true);
  }

  hide(): void {
    this.spinnerControl.next(false);
  }

  getSpinnerControl(): Observable<boolean> {
    return this.spinnerControl as Observable<boolean>;
  }
}
