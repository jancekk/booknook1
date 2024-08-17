import { Component, OnInit, ViewChild, } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BooksService } from 'src/app/to-read/books.service';
import { PreloadAllModules } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-addbook-modal',
  templateUrl: './addbook-modal.component.html',
  styleUrls: ['./addbook-modal.component.scss'],
})
export class AddbookModalComponent  implements OnInit {
  @ViewChild('f', { static: true }) form!: NgForm;

  genres: string[];
  constructor(private modalCtrl: ModalController, private bookService: BooksService) {
    this.genres = this.bookService.getGenres();
    
   }

  ngOnInit() {
    
  }

  onCancel(){
    this.modalCtrl.dismiss();
  }

  onAddBook(){
    if(!this.form.valid){
      return;
    } else {
      this.modalCtrl.dismiss({bookData:{text: this.form.value['text'], description: this.form.value['description'], author: this.form.value['author'], genre: this.form.value['genre']}}, 'confirm');
    }
  }
}
