import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatGridList } from '@angular/material/grid-list';

@Component({
  selector: 'app-proof-image',
  templateUrl: './proof-image-dialog.component.html',
  styleUrls: ['./proof-image.component.scss']
})
export class ProofImageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data["images"])
  }

}
