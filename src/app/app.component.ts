import { Component } from '@angular/core';
// Import Materialize
import M from "materialize-css";

interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covid19-dashboard';

  
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  ngAfterViewInit(): void {
    (<any>window).twttr.widgets.load();

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var options = {};
      var instances = M.Sidenav.init(elems, options);
    });
  }

  scrollToView(divId:string) {
    if(divId == 'div_home'){
      window.scrollTo(0,0);
    }
    else{
      var elmnt = document.getElementById(divId);
      elmnt.scrollIntoView();
    }
        
    let element: HTMLElement = document.getElementsByClassName('sidenav-overlay')[0] as HTMLElement;
    element.click();
  }

}
