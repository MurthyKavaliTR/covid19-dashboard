import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
 

@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.css']
})
export class FactsComponent implements OnInit {
  factoids:Array<any>;
  faq:Array<any>
  bannerText:string;


  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('https://api.covid19india.org/website_data.json').
    subscribe(data=>{
      console.log(data)
      this.factoids = data.factoids;
      this.faq = data.faq;
      this.bannerText = this.factoids[1].banner;
    })
  }
  

}
