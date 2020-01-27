import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  readonly copyright = "Copyright &copy; Your Website " + new Date().getFullYear();
  readonly PagetTitle = 'Nova';
}
