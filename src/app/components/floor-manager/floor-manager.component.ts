import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Floors } from 'src/app/models/floors';
import { CreateFloorComponent } from '../dialog/create-floor/create-floor.component';
import {AddNewTaskComponent} from "../dialog/add-new-task/add-new-task.component";
import {CreateAreaComponent} from "../dialog/create-area/create-area.component";

@Component({
  selector: 'app-floor-manager',
  templateUrl: './floor-manager.component.html',
  styleUrls: ['./floor-manager.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})

export class FloorManagerComponent implements OnInit {
  floors?: MatTableDataSource<Floors>;
  displayedColumn: string[] = ["select", "floor_number", "areas", "expand"];
  selection = new SelectionModel<Floors>(true, [])
  expandedFloor?: Floors

  constructor(private db: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.db.collection<Floors>("floors").valueChanges().subscribe({
      next: (floor) => {
        console.log(floor);
        this.floors = new MatTableDataSource<Floors>(floor)
      }
    })
  }

  async delete() {
    var ref = this.db.collection("floors")
    var selectedData = this.selection.selected

    selectedData.map((value) => {
      console.log(value.id)
      ref.doc(value.id).delete().catch((err) => console.log(err))
    })
  }

  addNewTask(areaIndex: number, floorId: number) {
    const dialogRef = this.dialog.open(AddNewTaskComponent, {
      width: '100%',
      data: {
        areaIndex: areaIndex,
        floorId: floorId
      }
    })
  }

  createArea(floorId: number) {
    const dialogRef = this.dialog.open(CreateAreaComponent, {
      width: '100%',
      data: {
        floorId: floorId
      }
    })
  }

  createFloor() {
    const dialogRef = this.dialog.open(CreateFloorComponent, {
      width: '100%'
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

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} ${row.floor}`
  }

}
