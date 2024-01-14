import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  defaultColor1: string = "#2889e9";
  defaultColor2: string = "#fa761e";

  onSelectorOpen(color: string) {
    console.log(color);
  }

}
