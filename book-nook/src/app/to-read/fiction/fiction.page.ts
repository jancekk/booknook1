import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Book, Genre } from '../book.model';
import { ModalController } from '@ionic/angular';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-fiction',
  templateUrl: './fiction.page.html',
  styleUrls: ['./fiction.page.scss'],
})
export class FictionPage implements OnInit {
  /* books: Book[] = [
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
      imageUrl:
        'https://target.scene7.com/is/image/Target/GUEST_3d59fce0-9740-4a9f-a9a6-55b6ba4fa374?wid=488&hei=488&fmt=pjpeg',
      review: '',
      stars: '',
    },
    {
      id: 'c2',
      author: 'Albert Camus',
      text: 'The Myth of Sisyphus',
      genre: Genre.NonFiction,
      description:
        '"The Myth of Sisyphus" by Albert Camus explores the philosophical concept of absurdity through the story of Sisyphus, condemned by the gods to endlessly roll a boulder uphill only to watch it roll back down. ' +
        'Camus examines the human condition in a universe devoid of inherent meaning, yet encourages embracing life\'s challenges with defiance and resilience. ' +
        'This essay challenges traditional views on existentialism and nihilism, offering a provocative perspective on finding purpose and meaning in an indifferent world.',
      imageUrl:
        'https://m.media-amazon.com/images/I/61HFcmUNHuL._AC_UF1000,1000_QL80_.jpg',
      review: '',
      stars: '',
    },
  ]; */
  books : Book[];
  filteredBooks: Book[] = [];
  genres: string[] = []; 
  selectedGenre: string = ''; 


  constructor(private modalCtrl : ModalController, private booksService : BooksService, private cdr: ChangeDetectorRef) {
    this.books = this.booksService.books;
   }

  ngOnInit() {
    this.booksService.getBooks().subscribe((booksData)=> {
      console.log(booksData);
      const books : Book[] = [];

      for(const key in booksData){
        if(booksData.hasOwnProperty(key)) {
          books.push({
            id: key,
            author: booksData[key].author,
            text: booksData[key].text,
            description: booksData[key].description,
            genre: booksData[key].genre,
            userId:'',
            imageUrl: '',
            stars: '',
            review: ''
          });
         
        }
      }
      this.books = books;
      this.genres = [...new Set(this.books.map(book => book.genre))];
      this.filteredBooks = books;
      this.selectedGenre = 'All Books';
    });
  }

  filterBooksByGenre(genre: string) {
    if (this.selectedGenre === 'All Books') {
      this.filteredBooks = this.books.filter(book => !book.review && !book.stars);
    }
    
    else{
    this.filteredBooks = this.books.filter(book =>
      book.genre === genre && !book.review && !book.stars
    );}
    console.log('Selected Genre:', genre);
    console.log('Filtered Books:', this.filteredBooks);
    this.cdr.detectChanges();
  }
  handleCancel() {
    console.log('ionCancel fired');
  }

  handleDismiss() {
    console.log('ionDismiss fired');
  }
}
