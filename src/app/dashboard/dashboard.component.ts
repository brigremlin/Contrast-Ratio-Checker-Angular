import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  selectedTextColor: string = "rgb(0, 0, 0)";
  selectedBackgroundColor: string = "rgb(255, 255, 255)";
  contrastRatio: number =  0;
  l1: number = 0;
  l2: number = 0;
  ratio: string = '';
  contrast: number = 0;

  ngOnInit(): void {
    this.computeRatio();
  }

  onFirstSelectorOpen(color: string) {
    this.selectedTextColor = color;
    this.computeRatio();
  }

  onSecondSelectorOpen(color: string) {
    this.selectedBackgroundColor = color;
    this.computeRatio();
  }

  computeRatio() {
    this.l1 = this.pullColorValues(this.selectedTextColor);
    this.l2 = this.pullColorValues(this.selectedBackgroundColor);
    if(this.l1 > this.l2) {
      this.contrastRatio = (this.l1 + 0.05) / (this.l2 + 0.05);
    } else {
      this.contrastRatio = (this.l2 + 0.05) / (this.l1 + 0.05);
    }
    this.ratio = this.formatRatio(this.contrastRatio);
    console.log(this.ratio);
  }

  pullColorValues(rgb: string) {
    let numberArray:any = [];
      //  L = 0.2126 * R + 0.7152 * G + 0.0722 * B
    var colorArr = rgb.slice( 
      rgb.indexOf("(") + 1,  
      rgb.indexOf(")") 
    );
    let arr = colorArr.split(',');
    arr.forEach(element => {
      numberArray.push(parseFloat(element));
    });
    var newR = (numberArray[0] / 255).toFixed(3);
    let RsRgb = parseFloat(newR);
    var r;
    (RsRgb <= 0.03928) ? r = RsRgb / 12.92 : r = ((RsRgb + 0.055)/1.055) ** 2.4;
    var newG = (numberArray[1] / 255).toFixed(3);
    let GsRgb = parseFloat(newG);
    var g;
    (GsRgb <= 0.03928) ? g = GsRgb / 12.92 : g = ((GsRgb + 0.055)/1.055) ** 2.4;
    var newB = (numberArray[2] / 255).toFixed(3);
    let BsRgb = parseFloat(newB);
    var b;
    (BsRgb <= 0.03928) ? b = RsRgb / 12.92 : b = ((BsRgb + 0.055)/1.055) ** 2.4;
    var l = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
    return l;
  }

  formatRatio(ratio: number) {
    this.contrast = ratio;
    let ratioAsFloat = ratio.toFixed(2);
    let isInteger = Number.isInteger(parseFloat(ratioAsFloat));
    let number = isInteger ? Math.floor(ratio) : ratioAsFloat;
    return number + " : 1";
  }

  convertToHex(value: number) {
    let hex = value.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  convertRgbToHex(r: number, g: number, b: number) {
    return "#" + this.convertToHex(r) + this.convertToHex(g) + this.convertToHex(b);
  }

}
