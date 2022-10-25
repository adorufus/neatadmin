import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Floors } from 'src/app/models/floors';

@Component({
  selector: 'app-floor-manager',
  templateUrl: './floor-manager.component.html',
  styleUrls: ['./floor-manager.component.scss']
})

export class FloorManagerComponent implements OnInit {
  floors?: MatTableDataSource<Floors>;
  displayedColumn: string[] = ["select", "floor_number", "areas"];
  selection = new SelectionModel<Floors>(true, [])

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection<Floors>("floors").valueChanges().subscribe({
      next: (floor) => {
        this.floors = new MatTableDataSource<Floors>(floor)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.floors!.filter = filterValue.trim();

    if(this.floors?.paginator) {
      this.floors.paginator.firstPage();
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length
    const numRows = this.floors?.data.length
    return numSelected === numRows
  }

  toggleAllRows() {
    if(this.isAllSelected()){
      this.selection.clear()
      return
    }

    this.selection.select(...this.floors!.data)
  }

  checkboxLabel(row?: Floors): string {
    if(!row) {
      return `${this.isAllSelected() ? 'deselect': 'select'} all`
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} ${row.floorData?.floor}`
  }

}
