import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-modal',
  templateUrl: './log-book-modal.component.html'
})
export class LogBookModalComponent {
  @Input() book!: Book;
  @Output() modalClosed = new EventEmitter<void>();

  constructor(
    private modalCtrl: ModalController,
    private bookService: BooksService // Inject your BookService
  ) {}

  async saveChanges() {
    this.modalClosed.emit(); 

    try {
      await this.bookService.editBook(this.book.id, this.book.author, this.book.text, this.book.genre, this.book.description, this.book.imageUrl, this.book.userId,
         this.book.review,
        this.book.stars
      ).toPromise(); 
      
      await this.modalCtrl.dismiss();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
