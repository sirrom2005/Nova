import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Service 
{
  constructor(private http:HttpClient, private router: Router) { }

  doLogin(username:string, password:string)
  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      username: username,
      password: password
    };

    this.http.post<any>(environment.API_DOMAIN + '/authentication/authenticate', body, {headers, responseType:"json"})
    .subscribe(data => {
      if(data.jwt!=null){
        localStorage.setItem(environment.JWT_TOKEN_KEY, data.jwt);
        localStorage.setItem(environment.NOVA_USER_KEY, `${this.generateUserKey(data)}`);
        this.router.navigate(['admin']);
      }
    });
  }

  doLogout(){
    localStorage.removeItem(environment.JWT_TOKEN_KEY);
    this.router.navigate(['/']);
  }

  getWebToken() : string{
    return localStorage.getItem(environment.JWT_TOKEN_KEY);
  }

  private generateUserKey(data:{id:number, username:string}) : string{
    return `${btoa(`${data.id}:${data.username}`)}`;
  }

  getUserName() : string{
    try{
      return atob(localStorage.getItem(environment.NOVA_USER_KEY)).split(':')[1];
    }catch(_){
      console.log("User key invalid");
      return null;
    }
  }

  getUserId() : number{
    try{
      return parseInt(atob(localStorage.getItem(environment.NOVA_USER_KEY)).split(':')[0], 10) | 0;
    }catch(_){
      console.log("User ID key invalid");
      return 0;
    }
  }

  isAuthenticated() : boolean{
    return this.getWebToken() != null ? true : false;
  }

  getFooterText():string{
    var date = new Date();
    return "Copyright &copy; Nova " + date.getFullYear();
  }

  getVersion(): string {
    return environment.VERSION;
  }
}
