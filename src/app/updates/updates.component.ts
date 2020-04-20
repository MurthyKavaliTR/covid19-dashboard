import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent implements OnInit {
  data : Array<any>;
  rawData : Array<any>;
  constructor(private http: HttpClient) {  }
  ngOnInit(): void {
    this.http.get('https://api.covid19india.org/updatelog/log.json').subscribe((results:Array<any>) => {
      this.rawData = results;
      this.rawData.sort(function(a, b) {
        return b.timestamp - a.timestamp;
    });
      this.rawData.map(a => {a.date = this.getDate(a.timestamp);a.time = this.getTime(a.timestamp)});
      this.data = Array.from(this.groupBy(this.rawData,pet => pet.date));
    });
  }

  getDate(timestamp :number){
    let d = new Date(timestamp * 1000); 
    return d.toDateString()
  }

  getTime(timestamp :number){
    let d = new Date(timestamp * 1000); 
    return d.toLocaleTimeString();
  }

  groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
          const key = keyGetter(item);
          const collection = map.get(key);
          if (!collection) {
              map.set(key, [item]);
          } else {
              collection.push(item);
          }
      });
      return map;
  }
}
