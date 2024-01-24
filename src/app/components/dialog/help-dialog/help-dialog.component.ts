import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialogComponent implements OnInit {

  helpItems: any[] = [
    {
      imgUrl: 'assets/help/ss1.png',
      desc: `Menambahkan & menghapus\n

      untuk menambahkan lantai, pencet tombol add floor dan ikuti langkah berikutnya\n
      
      untuk menghapus lantai, pertama centang lantai yang ingin di hapus, llalu pencet delete`
    },
    {
      imgUrl: 'assets/help/ss2.png',
      desc: `Setelah memencet tombol add floor, maka selanjutnya kita akan menambahkan nomor lantai dan beberapa area\n

      untuk menambahkan area tekan tombol Plus (bukan tombol subscribe), nanti akan di sediakan form untuk mengisi nama area dan task di area tersebut (pencet tombol plus lagi untuk menambahkan area lain)`
    },
    {
      imgUrl: 'assets/help/ss3.png',
      desc: `Ini adalah popup untuk menambahkan area, cara kerjanya sama seperti menambahkan floor, setelah semua di isi tekan tombol create di pocok kanan bawah.\n

      setelah itu akan di redirect kembali ke popup create floor, setelah semua area yang ingin di masukan sudah sesuai, maka pencet lagi tombol create di popup create floornya`
    },
    {
      imgUrl: 'assets/help/ss4.png',
      desc: `di popup ini, kita akan memasukan nama area dan memasukan checklist, sangat simple, intuitive dan straightforward aje ini mah. \n
      setelah semua sudah sesuai lalu klik create dan akan di redirect kembali ke popup create floor seperti penjelasan sebelumnya`
    },
    {
      imgUrl: 'assets/help/ss5.png',
      desc: `disini ada 2 utility button\n

      1.⁠ ⁠Expanded button: berfungsi untuk melihat detail dari floor tersebut, disini kita bisa lihat detail dari floor, area, dan checklist tasksnya\n
      2.⁠ ⁠Add area [+]: ini berfungsi jika kita ingin menambahkan area baru di floor tersebut`
    },
    {
      imgUrl: 'assets/help/ss6.png',
      desc: `Lalu di bawah sini ada tombol add task dan delete area

      self explainatory, pokoknya simple, intuitive dan straightforward`
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
