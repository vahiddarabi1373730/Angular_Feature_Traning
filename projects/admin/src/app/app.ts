import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideDispatcher } from '@ngrx/signals/events';
import { EventsStore } from './store/events-store';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers:[
    provideDispatcher(),
    EventsStore
  ]
})
export class App{

}
