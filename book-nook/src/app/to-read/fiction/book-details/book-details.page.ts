import { Component, OnInit } from '@angular/core';
import { Book, Genre } from '../../book.model';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../books.service';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  presentingElement = undefined;
  book: Book = {
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
  };
  constructor(private route: ActivatedRoute, private booksService: BooksService, private alertControl: AlertController, private actionSheetCtrl: ActionSheetController) { 
    
  }

  ngOnInit() {
    this.presentingElement! = document.querySelector('.ion-page')!;
    this.route.paramMap.subscribe(paramMap => {
      const bookId = paramMap.get('id');
      if (bookId && this.booksService.getBook(bookId)) {
        this.book = this.booksService.getBook(bookId)!;
        if (!this.booksService.getBook(bookId)) {
          throw new Error(`Book with id '${bookId}' not found!`);
        }
      }
    });
  }

  openAlert() {
    this.alertControl.create({
      header:'log book',
      message: 'do you want to log this book?',
      buttons: [
        {
        text: 'log',
        handler: () => {
          console.log('log');
        }
      },
      {
        text: 'cancel',
        role: 'cancel',
        handler: () => {
          console.log('do not');
        }
      },
      ]
    }).then((alert : HTMLIonAlertElement) => {
      alert.present();
    }
    );
  }
  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };
}
