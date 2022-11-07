import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Proofs } from 'src/app/models/proofs';
import * as FileSaver from 'file-saver'
import * as JSZip from 'jszip';
import { CollectionReference, Query, Timestamp } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-proof-image',
  templateUrl: './proof-image.component.html',
  styleUrls: ['./proof-image.component.scss']
})
export class ProofImageComponent implements OnInit {

  proofs?: MatTableDataSource<Proofs>;
  displayedColumn: string[] = ["select", "image", "pic", "created_date", "task_name", "area_name", "floor", "options"];
  selection = new SelectionModel<Proofs>(true, [])
  downloadedImages: ArrayBuffer[] = [];
  zip =  new JSZip()

  resultsLength = 0;
  pageSize = 5;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator?: MatPaginator 

  constructor(private db: AngularFirestore, private http: HttpClient, private datePipe: DatePipe) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.proofs!.filter = filterValue.trim();

    if (this.proofs?.paginator) {
      this.proofs.paginator.firstPage();
    }
  }

  filePromise = () => new Promise( (resolve) => {
    var selectedItem = this.selection.selected

    selectedItem.map( async (value) => {
      this.http.get(value.image_url, {
        responseType: 'blob',
      }).subscribe({
        next: (data) => {
          console.log(data.type);
          data.arrayBuffer().then((val) => {
            var filetype = data.type.split("/")[1]
            
            this.zip.file(`${this.datePipe.transform(value.created?.toDate(), 'EEEE, MMMM d, y h|mm|ss a')}.${filetype}`, val)
          })
        }
      })
    })

    setTimeout(() => resolve("test") , 1000)
  })

  batchDownload() {
    if(this.selection.selected.length > 0){
      this.createZip()
    } else {
      alert("Pilih dulu dong itemnya, baru bisa download")
    }
  }

  private async createZip() {
    
    await this.filePromise()

    this.zip.generateAsync({type: "blob"}).then( (blob) => {
      FileSaver.saveAs(blob, this.datePipe.transform(Date.now(), 'dd-MM-yyyy | hh:mm:ss a') + '.zip')
    })
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length
    const numRows = this.proofs?.data.length
    return numSelected === numRows
  }

  ngOnInit(): void {
    this.db.collection<Proofs>("task_data", ref => {
      let query : firebase.default.firestore.Query = ref
      query = query.orderBy("created", "desc")

      return query
    }).valueChanges().subscribe({
      next: (proofs) => {
        this.proofs = new MatTableDataSource<Proofs>(proofs)
        this.resultsLength = proofs.length

        this.proofs!.paginator = this.paginator ?? null
      }
    })
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear()
      return
    }

    this.selection.select(...this.proofs!.data)
  }

  // downloadImage(url: string) {
  //   const a = document.createElement('a');
  //   a.href = url
  //   a.download = 'test.png'
  //   document.body.appendChild(a);
  //   a.click();
  // }

  checkboxLabel(row?: Proofs): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} ${row.task_name}`
  }

}
