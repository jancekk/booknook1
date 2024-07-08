import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { ResourceLoader } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(private authService: AuthService, private loadingController: LoadingController, private router: Router) { 
    this.registerForm = new FormGroup({
      name: new FormControl('Jana', Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(7)])
    });
  }

  ngOnInit() {
    
  }

  onRegister() {
    this.loadingController.create({message: 'Registering ...'}).then((loadingEl: HTMLIonLoadingElement) => {
      loadingEl.present();
      
    
    console.log(this.registerForm);
    this.authService.register(this.registerForm.value).subscribe(resData => {
      console.log('registracije je uspela');
      console.log(resData);
      loadingEl.dismiss();
      this.router.navigateByUrl('/book-nook');
    })
  });
    }
}
