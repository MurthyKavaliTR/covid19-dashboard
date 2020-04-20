import { Component, OnInit, ViewChild } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

interface StateData {
  state	: string,
  active : number,
  confirmed: number,
  deaths: number,
  deltaconfirmed: number,
  deltadeaths: number,
  deltarecovered: number,
  lastupdatedtime: string,
  recovered: number,
  statecode: string,
  statenotes: string,
  children?: any,
  district?:string
}

interface DistrictData {
  district: string,
  confirmed: number,
  deltaconfirmed: number,
  lastupdatedtime: string
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class GridComponent implements OnInit {
  stateRawData : any;
  districtRawData : any;
  stateData : StateData[];
  districtData : DistrictData;
  columnsToDisplay = ['State', 'Confirmed', 'Active', 'Recovered','Deceased'];
  columnsToDisplay_child = ['District', 'Confirmed'];
  expandedElement: DistrictData[] | null;
  total : {
    active : number,
    confirmed: number,
    deaths: number,
    deltaconfirmed: number,
    deltadeaths: number,
    deltarecovered: number,
    lastupdatedtime: string,
    recovered: number,
  };
  dataSource: MatTableDataSource<StateData>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private http: HttpClient) { 
    
  }
  
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    let states = this.http.get('https://api.covid19india.org/data.json');
    let districts = this.http.get('https://api.covid19india.org/state_district_wise.json');

    forkJoin([states, districts]).subscribe(results => {
      this.stateRawData = results[0]["statewise"];
      this.districtRawData = results[1];
      
      console.log(this.stateRawData);
      console.log(this.districtRawData);
      this.setData();
      this.total = this.stateRawData[0];
      this.stateRawData = this.stateRawData.filter(item => item.children != undefined);
      this.stateData = this.stateRawData;
      this.dataSource = new MatTableDataSource(this.stateData);
     // this.dataSource.sort = this.sort;
      document.getElementById('spn_total').innerHTML = this.total.confirmed.toString();
      document.getElementById('spn_totalD').innerHTML = this.total.deltaconfirmed.toString();
      document.getElementById('spn_active').innerHTML = this.total.active.toString();
      document.getElementById('spn_recovered').innerHTML = this.total.recovered.toString();
      document.getElementById('spn_recoveredD').innerHTML = this.total.deltarecovered.toString();
      document.getElementById('spn_deceased').innerHTML = this.total.deaths.toString();
      document.getElementById('spn_deceasedD').innerHTML = this.total.deltadeaths.toString();
      document.getElementById('spn_lastUpdated').innerHTML = this.total.lastupdatedtime.toString();
    });
  }

  setData(){
    let keys_state = Object.keys(this.districtRawData);

    keys_state.forEach(state => {
      let arr_dis = this.districtRawData[state]["districtData"];
      let keys_district = Object.keys(arr_dis);
      let dist = [];
      keys_district.forEach(district => {
        dist.push({
          district: district,
          confirmed: arr_dis[district]["confirmed"],
          deltaconfirmed: arr_dis[district]["delta"]["confirmed"],
          lastupdatedtime: arr_dis[district]["lastupdatedtime"]
        });
      });
      dist.sort(function(a, b) {
        return b.confirmed - a.confirmed;
    });
      this.stateRawData.map(a => a.children = a.state == state ? dist :a.children);
    });

  }

  getTotal(type:string) {
    return this.total == undefined ? 0:this.total[type];
  }

}
