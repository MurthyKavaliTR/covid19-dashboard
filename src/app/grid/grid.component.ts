import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  count1 : number,
  count2 : number,
  children?: FoodNode[];
}

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
  children?: DistrictData[];
}

interface DistrictData {
  district: string;
  confirmed: number,
  deltaconfirmed: number,
  lastupdatedtime: string
}


const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    count1 : 1,
    count2 : 2,
    children: [
      {name: 'Apple',
      count1 : 1,
      count2 : 2},
      {name: 'Banana',count1 : 1,
      count2 : 2},
      {name: 'Fruit loops',count1 : 1,
      count2 : 2},
    ]
  }, {
    name: 'Vegetables',
    count1 : 1,
      count2 : 2,
    children: [
      {
        name: 'Green',
        count1 : 1,
      count2 : 2
      }, {
        name: 'Orange',
        count1 : 1,
      count2 : 2
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  count1 : number;
  count2 : number;
  level: number;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  stateRawData : any;
  districtRawData : any;
  stateData : StateData;
  districtData : DistrictData;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      count1: node.count1,
      count2: node.count2,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private http: HttpClient) { 
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  
  ngOnInit(): void {
    this.getData();
  }

  getData(){


    let states = this.http.get('https://api.covid19india.org/data.json');
    let districts = this.http.get('https://api.covid19india.org/state_district_wise.json');

    forkJoin([states, districts]).subscribe(results => {
      // results[0] is our character
      // results[1] is our character homeworld
      //results[0].homeworld = results[1];
      //this.loadedCharacter = results[0];
      this.stateRawData = results[0]["statewise"];
      this.districtRawData = results[1];
      
      console.log(this.stateRawData);
      console.log(this.districtRawData);
    });
  }

  setData(){
    let keys_state = Object.keys(this.districtRawData);

    keys_state.forEach(element => {
      let keys_district = Object.keys(this.districtRawData[element]);
      
    });


    let state_district = 


    this.stateRawData.forEach(element => {
       let arrDistrict = this.stateRawData.filter
    });
  }

}
