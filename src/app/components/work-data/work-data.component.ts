import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as FileSaver from 'file-saver';
import * as JSZip from 'jszip';
import { Proofs } from 'src/app/models/proofs';
import { Works } from 'src/app/models/works';

@Component({
  selector: 'app-work-data',
  templateUrl: './work-data.component.html',
  styleUrls: ['./work-data.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})

export class WorkDataComponent implements OnInit {

  works?: MatTableDataSource<Works>;
  displayedColumn: string[] = ["pic", "work_start_time", "work_finished_time", "floor", "expand"];
  selection = new SelectionModel<Works>(true, [])
  downloadedImages: ArrayBuffer[] = [];
  expandedWork?: Works
  zip =  new JSZip()

  @ViewChild(MatPaginator) paginator?: MatPaginator

  constructor(private db: AngularFirestore, private http: HttpClient, private datePipe: DatePipe) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.works!.filter = filterValue.trim();

    if (this.works?.paginator) {
      this.works.paginator.firstPage();
    }
  }

  // filePromise = () => new Promise( (resolve) => {
  //   var selectedItem = this.selection.selected

  //   selectedItem.map((value) => {
  //     this.http.get(value.image_url, {
  //       responseType: 'blob',
  //     }).subscribe({
  //       next: (data) => {
  //         console.log(data.type);
  //         data.arrayBuffer().then((val) => {
  //           var filetype = data.type.split("/")[1]
            
  //           this.zip.file(`${this.datePipe.transform(value.created?.toDate(), 'EEEE, MMMM d, y h|mm|ss a')}.${filetype}`, val)
  //         })
  //       }
  //     })
  //   })

  //   setTimeout(() => resolve("test"), 1000)
  // })

  // batchDownload() {
  //   this.createZip()
  // }

  // private async createZip() {
    
  //   await this.filePromise().then(() => {
  //     this.zip.generateAsync({type: "blob"}).then( (blob) => {
  //       FileSaver.saveAs(blob, this.datePipe.transform(Date.now(), 'EEEE, MMMM d, y hh:mm:ss a') + '.zip')
  //     })
  //   })
  // }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length
    const numRows = this.works?.data.length
    return numSelected === numRows
  }

  ngOnInit(): void {
    this.db.collection<Works>("work_data", ref => ref.orderBy("work_finished_time", "desc")).valueChanges().subscribe({
      next: (works) => {
        this.works = new MatTableDataSource<Works>(works)
        this.works.paginator = this.paginator ?? null
      }
    })
  }

  deleteItem() {
    
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear()
      return
    }

    this.selection.select(...this.works!.data)
  }

  // downloadImage(url: string) {
  //   const a = document.createElement('a');
  //   a.href = url
  //   a.download = 'test.png'
  //   document.body.appendChild(a);
  //   a.click();
  // }

  checkboxLabel(row?: Works): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} ${row.data?.floor_cleaned}`
  }

}
