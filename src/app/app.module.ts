import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookElementComponent } from './book-element/book-element.component';
import { BooknookComponent } from './booknook/booknook.component';
import { ToReadComponent } from './to-read/to-read.component';
import { MyBooksComponent } from './my-books/my-books.component';


@NgModule({
  declarations: [
    AppComponent, HeaderComponent, BookFormComponent, BookElementComponent, BooknookComponent, ToReadComponent, MyBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
  ],
  providers: [
    provideClientHydration(), 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
