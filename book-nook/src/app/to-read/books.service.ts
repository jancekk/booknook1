import { Injectable } from '@angular/core';
import { Book, Genre } from './book.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { take, switchMap, BehaviorSubject, tap, map, Observable } from 'rxjs';


interface BookData {
  author: string;
  text: string;
  genre: Genre;
  description: string;
  userId: string;
  imageUrl: string;
}


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: Book[] = [
  ];
  private _books = new BehaviorSubject<Book[]>([]);

  oldBooks: Book[] = [
    {
      id: 'c1',
      author: 'Sylvia Plath',
      text: 'The Bell Jar',
      genre: Genre.Fiction,
      description:
        '"The Bell Jar" by Sylvia Plath is a semi-autobiographical novel that delves into ' +
        'the mental health struggles of its protagonist, Esther Greenwood. Set in the 1950s, ' +
        'it follows Esther\'s descent into depression and her experiences with societal expectations, ' +
        'relationships, and the treatment of women. Plath\'s poignant narrative explores themes ' +
        'of identity, alienation, and the pressures of conformity in a vivid and introspective manner.',
        userId: '', 
      imageUrl:
        'https://target.scene7.com/is/image/Target/GUEST_3d59fce0-9740-4a9f-a9a6-55b6ba4fa374?wid=488&hei=488&fmt=pjpeg',
      review: '',
      stars: ''
    },
  ]

  constructor(private http: HttpClient, private authService: AuthService){

  }


  addBook(author: string, text: string, genre: Genre, description: string) {
    let newBook: Book = {
      id: '',
      author,
      text,
      genre,
      description,
      userId: '', // Initialize userId
      imageUrl: '',
      stars: '',
      review: ''
    };

    // Retrieve user ID from AuthService
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        newBook.userId = userId ?? ''; // Assign userId to newBook

        // Retrieve authentication token from AuthService
        return this.authService.token.pipe(
          take(1),
          switchMap(token => {
            const headers = { Authorization: `Bearer ${token}` }; // Include token in headers

            // Make HTTP POST request to Firebase with the new book data and headers
            return this.http.post<{ name: string }>('https://booknook-dc570-default-rtdb.firebaseio.com/books.json', newBook, { headers });
          }),
          tap(resData => {
            newBook.id = resData.name; // Assign generated ID to newBook
            this.books.push(newBook); // Add newBook to local books array
          })
        );
      })
    );
  }


  getBooks(){
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        const url = `https://booknook-dc570-default-rtdb.firebaseio.com/books.json?auth=${token}`; // Interpolate token in URL

        // Make HTTP GET request to Firebase with token-authenticated URL
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
              review: '',  
              stars: ''
            };
            books.push(book);
          }
        }
        return books;
      }),
      tap(books => {
        this._books.next(books); // Update BehaviorSubject with fetched books
      })
    );
  }


  public getBook(id: string){
    return this.oldBooks.find((b:Book)=> b.id === id);
  }

  getGenres(): string[] {
    return Object.values(Genre);
  }

  
}
