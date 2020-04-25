import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
 

@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.css']
})
export class FactsComponent implements OnInit {
  factoids:Array<any>;
  slide1:Array<any>
  slide2:Array<any>
  slide3:Array<any>
  slide4:Array<any>
  slide5:Array<any>

  //faq:Array<any>
  bannerText:string;


  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('https://api.covid19india.org/website_data.json').
    subscribe(data=>{
      console.log(data)
      this.factoids = data.factoids;
      this.slide1 =  this.factoids.slice(0,5)
      this.slide2 = this.factoids.slice(5,10);
      this.slide3 = this.factoids.slice(10,15);
      this.slide4 = this.factoids.slice(15,20);
      this.slide5 = this.factoids.slice(20,24);
      console.log(this.factoids);
      this.bannerText = this.factoids[1].banner;
    })
  }
}
