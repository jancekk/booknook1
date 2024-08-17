import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BooksService } from '../to-read/books.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-myprofile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  user: { name: string; surname: string; email: string } = { name: '', surname: '', email: '' }; // Adjust based on actual user data structure
  totalBooksToRead: number = 0;
  totalBooksRead: number = 0;
  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private booksService: BooksService
  ) {}

  ngOnInit() {
    this.loadBookStatistics();
  }

  

  private loadBookStatistics() {
    this.booksService.getBooks().pipe(
      switchMap(books => {
        return this.authService.getUserId.pipe(
          switchMap(userId => {
            const userBooks = books.filter(book => book.userId === userId);
            this.totalBooksToRead = userBooks.filter(book => !book.review || !book.stars).length;
            this.totalBooksRead = userBooks.filter(book => book.review && book.stars).length;
            return of(null); 
          })
        );
      })
    ).subscribe(
      () => {
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching books:', error);
        this.isLoading = false;
      }
    );
  }
}
