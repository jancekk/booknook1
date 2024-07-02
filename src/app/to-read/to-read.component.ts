import { Component } from '@angular/core';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-to-read',
  templateUrl: './to-read.component.html',
  styleUrl: './to-read.component.css'
})
export class ToReadComponent {
  books: Book[];
  constructor(private booksService: BooksService){
    this.books = this.booksService.books;
  }
}
