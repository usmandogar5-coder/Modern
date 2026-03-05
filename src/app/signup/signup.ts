import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [MatFormFieldModule, MatInputModule, MatButtonToggleModule, MatIconModule, MatCheckboxModule,MatIconModule,ReactiveFormsModule,CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
   myForm!:FormGroup;
  

 
 

constructor(private router:Router,private fb:FormBuilder,private http:HttpClient){
  this.myForm = this.fb.group({
      firstName:['',[Validators.required,Validators.maxLength(5)]],
      lastName:['',[Validators.required,Validators.maxLength(5)]],
      email:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      Phone:['',[Validators.required,Validators.maxLength(10)]],
      Address:['',[Validators.required]],
      City:['',[Validators.required]],
      Who:['',[Validators.required]],
      password:['',[Validators.required,Validators.maxLength(10)]],
      Confirmpassword:['',[Validators.required,Validators.minLength(10),Validators.maxLength(12)]]
      
      
      })
    
  }

   

 
      
    
    
  
      

signup(){
    this.router.navigate(['/signup']);
}
login(){
    this.router.navigate(['/login']);
}

get PasswordsMatch():boolean{
 return this.myForm.value.password===this.myForm.value.Confirmpassword;
}
onSignup() {
console.log(this.myForm.value);
this.router.navigate(['/sidebar'])

}



}
