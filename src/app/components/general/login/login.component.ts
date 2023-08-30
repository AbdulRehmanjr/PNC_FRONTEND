import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Login } from 'src/app/class/login';
import { Token } from 'src/app/class/token';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: SocialAuthService,
    private loginService: LoginService, private messageService: MessageService,
    private router:Router) {

  }

  ngOnInit(): void {
    this.createForm()
    this.googleSignIn()
  }

  googleSignIn() {
    this.authService.authState
    .subscribe({
      next: (response: SocialUser) => {
        let token = new Token()
        token.token = response.idToken
        token.provider = response.provider
        this.loginService.setToken(token)
        this.loginService.setSocialUser(response)
        this.router.navigate(['/home'])
      },
      error: (_error: any) => this.messageService.add({
        severity:'error',
        summary:'Login Failed'
      }),
      complete: () => {}
    })
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Provide Credentials' })
      return
    }

    let login = new Login();

    login.email = this.loginForm.controls['email'].value;
    login.password = this.loginForm.controls['password'].value;


    this.loginService.generateToken(login).subscribe({
      next: (data: any) => {
        let token = new Token()
        token.token = data.token
        token.provider = "PNC"
        this.loginService.setToken(token)

        this.loginService.currentUser(login).subscribe(
          {
            next: (data: any) => {
              this.loginService.setUser(data)
            }
            , error(err: Error) {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Network Error' })
            },
            complete: () => {
              this.redirection()
            },
          }

        )
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Network Error' })

      },
      complete: () => {

      }
    })


  }

  private redirection(): void {
    const role = this.loginService.getAuthority()
    switch (role) {
      case "ADMIN":
        this.router.navigate(['/home'])
        break
      case "SELLER":
        this.router.navigate(['/home'])
        break
      default:
        this.router.navigate(['/home'])
    }
  }
}
