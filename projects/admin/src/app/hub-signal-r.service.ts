import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HubSignalR<T> {
  private hubConnection!:signalR.HubConnection;

  startConnection(token:string){
    this.hubConnection=new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:3000/hubs/notifications",{
        accessTokenFactory:()=>token
      })
      .withAutomaticReconnect()
      .build();

    return this.hubConnection
      .start()
  }

  onEvent<T>(eventName:string):Observable<T>{
    const subject=new Subject<T>();
    this.hubConnection.on(eventName,(data:T)=>{
      subject.next(data)
    })
    return subject.asObservable();
  }
}
