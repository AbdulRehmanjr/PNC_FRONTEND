import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/class/user/user';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  file: File
  placeholder: string = 'assets/placeholder.png'

  constructor(private fb: FormBuilder, private signUpService: LoginService
    , private router: Router, private message: MessageService) { }
  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.signupForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      photo: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }
  onChange(event: any) {
    this.file = event.target.files[0]
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.placeholder = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0])
  }

  onSubmit() {

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    let user = new User()
    user.userEmail = this.signupForm.controls['email'].value
    user.userPassword = this.signupForm.controls['password'].value
    user.firstName = this.signupForm.controls['firstName'].value
    user.lastName = this.signupForm.controls['lastName'].value

    this.signUpService.createUser(user, this.file).subscribe({
      next: (_value: any) => { },
      error: (err: any) => {
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error!, ${err.error}`
        })
      },
      complete: () => this.router.navigate(['login'])
    })
  }
}

