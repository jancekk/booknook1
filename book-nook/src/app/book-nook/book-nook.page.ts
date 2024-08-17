import { Component, OnInit } from '@angular/core';
import { AddbookModalComponent } from './addbook-modal/addbook-modal.component';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { BooksService } from '../to-read/books.service';
import { Book } from '../to-read/book.model';

@Component({
  selector: 'app-book-nook',
  templateUrl: './book-nook.page.html',
  styleUrls: ['./book-nook.page.scss'],
})
export class BookNookPage implements OnInit {
  books : Book[]=[];

  constructor(private modalCtrl : ModalController, private booksService : BooksService) {
    
   }

  ngOnInit() {
    this.booksService.getBooks().subscribe((booksData)=> {
      console.log(booksData);
      const books : Book[] = [];

      for (const key in booksData as any) {
        if (booksData.hasOwnProperty(key)) {
            books.push({
                id: key,
                author: (booksData as any)[key].author,
                text: (booksData as any)[key].text,
                description: (booksData as any)[key].description,
                genre: (booksData as any)[key].genre,
                imageUrl: (booksData as any)[key].imageUrl,
                stars: '',
                review: ''
            } as Book); 
        }
    }
      this.books = books;
    });
  }
  onCancel(){
    this.modalCtrl.dismiss();
  }
 openModal(){
  this.modalCtrl.create({
    component: AddbookModalComponent, 
  componentProps: {title: 'Add a book'}}).then((modal : HTMLIonModalElement) => {modal.present();
    return modal.onDidDismiss();
  }).then((resultData : OverlayEventDetail<any> ) =>{
    if (resultData.role === 'confirm') {
      console.log(resultData);
      let {id, author, text, genre, description, imageUrl, userId} = resultData.data.bookData;
      this.booksService.addBook(author, text, genre, description, imageUrl,'','').subscribe(res => {
        console.log('Book added successfully:', res, text);
      }, error => {
        console.error('Error adding book:', error);
      });
    }
  }

  );
  }
 }
