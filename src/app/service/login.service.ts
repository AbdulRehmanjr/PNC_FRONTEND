import { Injectable } from '@angular/core';
import { environment } from '../variables/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/app/class/login';
import { User } from 'src/app/class/user';
import { Role } from '../class/role';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.baseUrl}/${environment.login}`
  private userUrl:string = `${environment.baseUrl}/${environment.user}`

  constructor(private http: HttpClient) { }

  createUser(user:User,picture){

    let formData = new FormData()
    formData.append('file',picture)
    formData.append('user',JSON.stringify(user))

    return this.http.post(`${this.userUrl}/create`,formData,{
      observe:'body'
    })
  }
  generateToken(login: Login) {
    return this.http.post(`${this.url}` + '/generate-token', login, {
      responseType: 'json',
    })

  }

  setToken(token: any) {
    if (token != null) {
      localStorage.setItem('token', JSON.stringify(token));
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getAuthority() {
    return JSON.parse(localStorage.getItem('user'))['role']['authority']
  }

  setUser(data: User) {

    let current_user = new User()
    let role = new Role()

    current_user.userId = data.userId
    current_user.firstName = data.firstName
    current_user.lastName = data.lastName
    current_user.userEmail = data.userEmail
    current_user.userPicture = data.userPicture

    role.roleName = data.role.roleName
    role.authority = data.role.authority

    current_user.role = role

    localStorage.setItem('user', JSON.stringify(current_user));
  }

  currentUser(loginInfo: Login) {
    return this.http.post(`${this.url}/current-user`, loginInfo);
  }

}
