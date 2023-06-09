import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import { Observable } from 'rxjs';

import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './fixed-table.component.html',
  styleUrls: ['./fixed-table.component.scss']
})
export class FixedTableComponent implements OnInit {
  public displayedColumns = ['userId', 'userName', 'progress', 'color'];
  public exampleDatabase = new ExampleDatabase();
  //public dataSource: ExampleDataSource | null;
  public dataSource: any;
  public showFilterTableCode;

  constructor(private document:DocumentService) { }

  ngOnInit():void {
    //this.dataSource = new ExampleDataSource(this.exampleDatabase);
    // this.document.loadDocuments1()
    // .subscribe(data => {
    //   this.dataSource = data;
    //   console.log(this.dataSource);
    // });
  }

}
