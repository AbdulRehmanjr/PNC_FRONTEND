import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private fb:FormBuilder) {

  }
  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.signupForm =   this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }
  onSubmit(){

  }
}
