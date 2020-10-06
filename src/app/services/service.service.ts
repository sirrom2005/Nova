import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Service 
{
  constructor(private router: Router) { }

  doLogin(data:any){
    localStorage.setItem(environment.JWT_TOKEN_KEY, data.jwt);
    localStorage.setItem(environment.NOVA_USER_KEY, `${this.generateUserKey(data)}`);
    this.router.navigateByUrl('admin');
  }

  private doLogoutAction() {
    localStorage.removeItem(environment.JWT_TOKEN_KEY);
    localStorage.removeItem(environment.NOVA_USER_KEY);
  }

  doLogout(){
    this.doLogoutAction();
    this.router.navigate(['/']);
  }

  sessionExpireLogout(){
    this.doLogoutAction();
    this.router.navigateByUrl('login/session-expired');
  }

  forbiddenLogout() {
    this.doLogoutAction();
    this.router.navigateByUrl('login/forbidden');
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
    return "Copyright &copy; Nova " + this.getCurrentYear();
  }

  getCurrentYear():number{
    var date = new Date();
    return date.getFullYear();
  }

  getVersion(): string {
    return environment.VERSION;
  }
}
