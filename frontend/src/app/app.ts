import { Component } from '@angular/core'; // usado para criar o componente
import { RouterOutlet } from '@angular/router'; // usado para definir as rotas


@Component({
  selector: 'app-root', // usado para definir o seletor do componente
  imports: [RouterOutlet], // usado para definir as rotas
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'frontend'; // usado para definir o título da aplicação
}
