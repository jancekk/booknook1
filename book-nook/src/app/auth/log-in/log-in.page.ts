import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  onLogIn(form: NgForm) {
    this.isLoading = true;

    this.authService.login(form.value).subscribe(
      resData => {
        console.log('Login successful');
        console.log(resData);
        this.isLoading = false;
        this.router.navigateByUrl('/book-nook');
      },
      error => {
        console.log('Login error:', error);
        this.isLoading = false;
        alert('Login not successful. Please try again.');
      }
    );
  }

  onRegister() {
    this.router.navigateByUrl('/register');
  }
}
