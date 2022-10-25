import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Proofs } from 'src/app/models/proofs';

@Component({
  selector: 'app-proof-image',
  templateUrl: './proof-image.component.html',
  styleUrls: ['./proof-image.component.scss']
})
export class ProofImageComponent implements OnInit {

  proofs?: MatTableDataSource<Proofs>;
  displayedColumn: string[] = ["select", "image", "pic", "created_date", "task_name", "area_name", "floor", "options"];
  selection = new SelectionModel<Proofs>(true, [])

  constructor(private db: AngularFirestore, private http: HttpClient) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.proofs!.filter = filterValue.trim();

    if (this.proofs?.paginator) {
      this.proofs.paginator.firstPage();
    }
  }

  downloadFile() {
    var selectedItem = this.selection.selected
    let images: [];

    for(var i = 0; i < selectedItem.length; i++) {
      this.http.get(selectedItem[i].image_url, {
        responseType: 'blob',
      }).subscribe({
        next: (data) => {
          console.log(data);
        }
      })
    }
  }

  batchDownload() {
    this.downloadFile()
  }

  private async crateZip(files: any[]) {
    const blob = new Blob(files, {
      type: 'application/zip'
    })

    console.log(blob.size);

    const url = window.URL.createObjectURL(blob)
    window.open(url)
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length
    const numRows = this.proofs?.data.length
    return numSelected === numRows
  }

  ngOnInit(): void {
    this.db.collection<Proofs>("task_data", ref => ref.limit(10)).valueChanges().subscribe({
      next: (proofs) => {
        this.proofs = new MatTableDataSource<Proofs>(proofs)
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

  downloadImage(url: string) {
    const a = document.createElement('a');
    a.href = url
    a.download = 'test.png'
    document.body.appendChild(a);
    a.click();
  }

  checkboxLabel(row?: Proofs): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} ${row.task_name}`
  }

}
