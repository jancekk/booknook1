import { Component } from '@angular/core';
import { Book } from './book.model';
import { BooksService } from './books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BooksService]
  
})
export class AppComponent {
  addBook(book: Book): void {

  }
  constructor(private booksService: BooksService){}
  books: Book[] = this.booksService.books;
}
