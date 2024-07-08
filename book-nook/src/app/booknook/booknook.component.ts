import { Component } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booknook',
  templateUrl: './booknook.component.html',
  styleUrls: ['./booknook.component.css'],
})

export class BooknookComponent {

  constructor(private router:Router){}

  onAddBook(): void{
    this.router.navigateByUrl('/new');
  }
}
