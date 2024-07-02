import { Component, EventEmitter, Output } from "@angular/core";
import { Book } from "../book.model";
import { BooksService } from "../books.service";

@Component({
    selector:'app-book-form',
    templateUrl: './book-form.component.html',
    styleUrls: ['./book-form.component.css']
})

export class BookFormComponent{
    text = '';
    author = '';
    fullBook = '';
    description = '';
    genre = '';
    @Output() addedBook = new EventEmitter<Book>();

    constructor(private booksService: BooksService){

    }

    onAddBook(): void {
       console.log('Book added');
       this.fullBook = `${this.text} - ${this.author}`;
       /* this.addedBook.emit(new Book(this.text, this.author,this.description)) */
       this.booksService.addBook(new Book(this.text, this.author,this.description, this.genre));
    }
}