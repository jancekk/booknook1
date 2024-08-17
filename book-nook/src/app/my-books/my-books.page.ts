import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Book } from '../to-read/book.model';
import { BooksService } from '../to-read/books.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.page.html',
  styleUrls: ['./my-books.page.scss'],
})
export class MyBooksPage implements OnInit, OnDestroy {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  genres: string[] = []; 
  selectedGenre: string = 'All Books';

  private bookSub!: Subscription;

  constructor(private booksService: BooksService, private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.bookSub = this.booksService.books.subscribe((books) => {
      this.books = books;
      this.updateGenres();
      this.filterBooksByGenre(this.selectedGenre); 
    });
  }

  ionViewWillEnter() {
    this.booksService.getBooks().subscribe(); 
  }

  updateGenres() {
    this.genres = [...new Set(this.books.map(book => book.genre))];
  }

  filterBooksByGenre(genre: string) {
    console.log('Filtering books:', this.books); 
    if (genre === 'All Books') {
      this.filteredBooks = this.books.filter(book =>
        (book.review && book.review.trim() !== '') &&
        (book.stars && book.stars.trim() !== '')
      );
    } else {
      this.filteredBooks = this.books.filter(book =>
        book.genre === genre &&
        (book.review && book.review.trim() !== '') &&
        (book.stars && book.stars.trim() !== '')
      );
    }
    console.log('Filtered Books:', this.filteredBooks); 
    this.cdr.detectChanges(); 
  }

  handleCancel() {
    console.log('ionCancel fired');
  }

  handleDismiss() {
    console.log('ionDismiss fired');
  }

  ngOnDestroy() {
    if (this.bookSub) {
      this.bookSub.unsubscribe();
    }
  }
}
