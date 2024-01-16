import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  textColor: string = "rgb(0,0,0)";
  backgroundColor: string = "rgb(256, 256, 256)";
  selectedTextColor: string = "";
  selectedBackgroundColor: string = "";
  contrastRatio: number =  0;
  l1: number = 0;
  l2: number = 0;

  ngOnInIt() {
    this.l1 = this.pullColorValues(this.textColor);
    this.l2 = this.pullColorValues(this.backgroundColor);
    if(this.l1 > this.l2) {
      this.contrastRatio = (this.l2 + 0.05) / (this.l1 + 0.05);
    } else {
      this.contrastRatio = (this.l1 + 0.05) / (this.l2 + 0.05);
    }
  }

  onFirstSelectorOpen(color: string) {
    this.selectedTextColor = color;
    this.l1 = this.pullColorValues(this.selectedTextColor);
    if(this.l1 > this.l2) {
      this.contrastRatio = (this.l2 + 0.05) / (this.l1 + 0.05);
    } else {
      this.contrastRatio = (this.l1 + 0.05) / (this.l2 + 0.05);
    }
  }

  onSecondSelectorOpen(color: string) {
    this.selectedBackgroundColor = color;
    this.l2 = this.pullColorValues(this.selectedBackgroundColor);
    if(this.l1 > this.l2) {
      this.contrastRatio = (this.l2 + 0.05) / (this.l1 + 0.05);
    } else {
      this.contrastRatio = (this.l1 + 0.05) / (this.l2 + 0.05);
    }
  }

  pullColorValues(rgb: string) {
      //  L = 0.2126 * R + 0.7152 * G + 0.0722 * B
    var colorArr = rgb.slice( 
      rgb.indexOf("(") + 1,  
      rgb.indexOf(")") 
  );
    let arr = colorArr.split(',');
    var RsRgb = parseInt(arr[0]) / 255;
    console.log(RsRgb);
    if(RsRgb <= 0.03928) {
      var r = RsRgb / 12.92
    } else {
      var r = ((RsRgb + 0.055)/1.055) ** 2.4;
    }
    var GsRgb = parseInt(arr[1]) / 255;
    console.log(GsRgb);
    if(GsRgb <= 0.03928) {
      var g = GsRgb / 12.92
    } else {
      var g = ((GsRgb + 0.055)/1.055) ** 2.4;
    }
    var BsRgb = parseInt(arr[2]) / 255;
    console.log(BsRgb);
    if(BsRgb <= 0.03928) {
      var b = BsRgb / 12.92
    } else {
      var b = ((BsRgb + 0.055)/1.055) ** 2.4;
    }
    var l = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
    // 0.3467047   0.07370942
    // 0.09302109  .06652926
    // .0033388    .00024106
    // .14047974 ending calculated value

    return l;
  }

}
