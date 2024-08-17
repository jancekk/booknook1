import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Book, Genre } from '../book.model';
import { BooksService } from '../books.service';
import { LogBookModalComponent } from '../log-book-modal/log-book-modal.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
})
export class BookDetailsPage implements OnInit {
  
  presentingElement = undefined;
  canDismiss: boolean = true;
  book!: Book;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const bookId = paramMap.get('bookId');
      if (bookId) {
        this.fetchBook(bookId);
      }
    });
  }

  async fetchBook(bookId: string) {
    this.isLoading = true;
    try {
      const fetchedBook = await this.booksService.getBook(bookId).toPromise();
      if (fetchedBook) {
        this.book = fetchedBook;
      } else {
        throw new Error(`Book with id '${bookId}' not found!`);
      }
    } catch (error) {
      console.error('Error fetching book:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async deleteBook() {
    const alert = await this.alertCtrl.create({
      header: 'Delete Book',
      message: 'Are you sure you want to delete this book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: async () => {
            try {
              await this.booksService.deleteBook(this.book.id).toPromise();
              // Optionally navigate away or update UI
              console.log('Book deleted successfully');
            } catch (error) {
              console.error('Error deleting book:', error);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async editBook() {
    const alert = await this.alertCtrl.create({
      header: 'Edit Book',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Title',
          value: this.book.text
        },
        {
          name: 'author',
          type: 'text',
          placeholder: 'Author',
          value: this.book.author
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Description',
          value: this.book.description
        },
        {
          name: 'genre',
          type: 'text',
          placeholder: 'Genre',
          value: this.book.genre
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Edit',
          handler: async (data) => {
            try {
            this.book.text = data.title;
            this.book.author = data.author;
            this.book.description = data.description;
            this.book.genre = data.genre;
            
            await this.booksService.editBook(this.book.id, this.book.author, this.book.text, this.book.genre, this.book.description, this.book.imageUrl, this.book.userId, this.book.review, this.book.stars).toPromise();
            
              console.log('Book updated successfully');
            } catch (error) {
              console.error('Error updating book:', error);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async editReview() {
    const alert = await this.alertCtrl.create({
      header: 'Edit Review',
      inputs: [
        {
          name: 'review',
          type: 'textarea',
          placeholder: 'Review',
          value: this.book.review
        },
        {
          name: 'stars',
          type: 'text',
          placeholder: 'Stars',
          value: this.book.stars
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: async (data) => {
            try {
              this.book.review = data.review;
              this.book.stars = data.stars;
              await this.booksService.editBook(this.book.id, this.book.author, this.book.text, this.book.genre, this.book.description, this.book.imageUrl, this.book.userId, this.book.review, this.book.stars).toPromise();
       
              console.log('Review updated successfully');
            } catch (error) {
              console.error('Error updating review:', error);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteReview() {
    const alert = await this.alertCtrl.create({
      header: 'Delete Review',
      message: 'Are you sure you want to delete the review?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: async () => {
            try {
              this.book.review = '';
              this.book.stars = '';
              await this.booksService.editBook(this.book.id, this.book.author, this.book.text, this.book.genre, this.book.description, this.book.imageUrl, this.book.userId, this.book.review, this.book.stars).toPromise();
            
              console.log('Review deleted successfully');
            } catch (error) {
              console.error('Error deleting review:', error);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async log() {
    let alert = await this.alertCtrl.create({
      header: 'Add book review and stars:',
      inputs: [
        {
          name: 'review',
          placeholder: 'Type in a new review'
        },
        {
          name: 'stars',
          placeholder: 'Type in new stars'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: async (data) => {
            const updatedReview = data.review;
            const updatedStars = data.stars;

            try {
              this.book.review = updatedReview;
              this.book.stars = updatedStars;
              await this.booksService.editBook(this.book.id, this.book.author, this.book.text, this.book.genre, this.book.description, this.book.imageUrl, this.book.userId, updatedReview, updatedStars).toPromise();
              this.booksService.getBooks();
              console.log('Book updated successfully in Firebase', updatedStars);
            } catch (error) {
              console.error('Error updating book in Firebase:', error);
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
