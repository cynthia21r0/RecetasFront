import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
// Cuando generes tu navbar, la importarás aquí:
// import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar], // Añadirás NavbarComponent a esta lista luego
  templateUrl: './app.html',
})
export class App {
  title = 'RecetasFront';
}
