

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, take, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Book } from './book.model';
import { AuthService } from '../auth/auth.service';
import { catchError} from 'rxjs/operators'; 

interface BookData {
  id: string;
  author: string;
  text: string;
  genre: Genre;
  description: string;
  imageUrl: string;
  userId: string;
  review: string;
  stars: string;
}

export enum Genre {
  Fiction = 'Fiction',
  NonFiction = 'Non-Fiction',
  Fantasy = 'Fantasy',
  ScienceFiction = 'Science Fiction',
  Mystery = 'Mystery',
  Romance = 'Romance',
  Thriller = 'Thriller',
  Biography = 'Biography',
  History = 'History',
  SelfHelp = 'Self-Help',
  Philosophy = 'Philosophy',
  Drama = 'Drama',
  AllBooks = 'All Books'
}




@Injectable({
  providedIn: 'root'
})
export class BooksService {
   books = new BehaviorSubject<Book[]>([]);
   myBooks = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

 
  


addBook(author: string, text: string, genre: Genre, description: string, imageUrl: string, review: string, stars: string){
  let newBook: Book = {
    id: '',
    author,
    text,
    genre,
    description,
    userId: '', 
    imageUrl: '',
    stars: '',
    review: ''
  };

  return this.authService.getUserId.pipe(
    take(1),
    switchMap(userId => {
      newBook.userId = userId ?? ''; 

      return this.authService.token.pipe(
        take(1),
        switchMap(token => {
          return this.http.post<{ name: string }>(`https://booknook-dc570-default-rtdb.firebaseio.com/books.json?auth=${token}`, newBook);
        }),
        switchMap(response => {
          newBook.id = response.name; 
          return this.myBooks.pipe(
            take(1),
            map(books => books.concat(newBook))
          );
        }),
        tap(updatedBooks => {
          this.myBooks.next(updatedBooks); 
        })
      
      );
    })
  );

}
 
editBook(
  id: string | null,
  author: string,
  text: string,
  genre: Genre,
  description: string,
  imageUrl: string,
  userId: string,
  review: string,
  stars: string
) {
  if (!id) {
    throw new Error('Book ID is required');
  }

  
  const updatedBook: Book = { id, author, text, genre, description, imageUrl, userId, review, stars };

  
return this.authService.token.pipe(
  take(1),
  switchMap(token => {
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    
    return this.http.put(`https://booknook-dc570-default-rtdb.firebaseio.com/books/${id}.json?auth=${token}`, updatedBook);
  }),
  switchMap(() => {
   
    return this.myBooks.pipe(take(1));
  }),
  map(books => {
   
    const updatedBooks = books.map(b => b.id === id ? { ...b, ...updatedBook, id } : b);
    return updatedBooks;
  }),
  tap(updatedBooks => {
    
    this.myBooks.next(updatedBooks);
  }),
  switchMap(() => this.getBooks()), 
      tap(() => {
        
      }),
  catchError(error => {
    
    console.error('Error updating book:', error);
    return throwError(error);
  })
);
}


deleteBook(id: string | null) {
  return this.authService.token.pipe(
    take(1),
    switchMap(token => {
      return this.http.delete<{ name: string }>(`https://booknook-dc570-default-rtdb.firebaseio.com/books/${id}.json?auth=${token}`);
    }),
    switchMap(() => {
      return this.myBooks;
    }),
    take(1),
    tap(books => {
      const updatedBooks = books.filter(b => b.id !== id);
      this.myBooks.next(updatedBooks);
    })
  );
}


  getBooks() : Observable<Book[]>{
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        const url = `https://booknook-dc570-default-rtdb.firebaseio.com/books.json?auth=${token}`; 

        
        return this.http.get<{ [key: string]: BookData }>(url);
      }),
      map((booksData: { [key: string]: BookData }) => {
        const books: Book[] = [];
        for (const key in booksData) {
          if (booksData.hasOwnProperty(key)) {
            const bookData = booksData[key];
            const book: Book = {
              id: key,
              author: bookData.author,
              text: bookData.text,
              genre: bookData.genre,
              description: bookData.description,
              userId: bookData.userId,
              imageUrl: bookData.imageUrl,
              review: bookData.review,  
              stars: bookData.stars
            };
            books.push(book);
          }
        }
        return books;
      }),
      tap(books => {
        console.log('Updating books:', books);
        this.books.next(books); 
      })
    );
  }
  
  getBook(id: string){
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        
        const url = `https://booknook-dc570-default-rtdb.firebaseio.com/books/${id}.json?auth=${token}`;
        
     
        return this.http.get<BookData>(url);
      }),
      map((resData) => {
        
        return {
          id,
          author: resData.author,
          text: resData.text,
          genre: resData.genre,
          description: resData.description,
          userId: resData.userId,
          imageUrl: resData.imageUrl,
          review: resData.review,  
          stars: resData.stars    
        } as Book;
      })
    );
  }

  

  get book(): Observable<Book[]> {
    return this.books.asObservable();
  }

  get mybook(): Observable<Book[]> {
    return this.myBooks.asObservable();
  }

  getGenres(): string[] {
    return Object.values(Genre);
  }

  
}
