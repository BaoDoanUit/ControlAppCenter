import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/sharedComponent/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  constructor(private spinnerService: SpinnerService) {}

  loading = false;

  ngOnInit(): void {
    this.spinnerService
      .getSpinnerControl()
      .subscribe(control => (this.loading = control));
  }
}
