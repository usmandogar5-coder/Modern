import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
     myForm!:FormGroup;
  isDisabled=false;
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  constructor(private router:Router,private fb:FormBuilder,private http:HttpClient){
    this.myForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    You:new FormControl('')
    })
     

  }
signup(){
    this.router.navigate(['/login']);
}
login(){
    this.router.navigate(['/signup']);
}
onSubmit() {
 const email = this.myForm.value.email;
  const password = this.myForm.value.password;

  if (email === 'james123@gmail.com' && password === 'james123') {
    this.router.navigate(['/sidebar']);
  } 
  else if (email === 'usman123@gmail.com' && password === 'usman123') {
    this.router.navigate(['/spaces']);
  } 
  else {
    alert('Login Failed');
  }

}
sign(){
this.router.navigate(['/signup']);
}
}
