import { Component, inject, OnInit, signal } from '@angular/core';
import { HubSignalR } from './hub-signal-r.service';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface Category{
  id: number;
  title: string;
  urlTitle:string;
  parentId: number;
}
@Component({
  selector: 'app-root',
  imports: [AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  private hubSignalRService=inject(HubSignalR<Category>)
  protected entity$=new BehaviorSubject<Category | null>(null);
  protected readonly title = signal('admin');

  ngOnInit(){
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGIudmFoaWQxMzczQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMSIsImV4cCI6MTc4NTQ5MDI4MCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6MzAwMSJ9.aqZumdIeIPqzRe1olEiMxLnPItbdYI3DdHcD43fyVR0"
    this.hubSignalRService.startConnection(token).then(()=>{
      console.log('connected');
     this.hubSignalRService.onEvent<Category>("CreatedProductCategory").subscribe(res=>{
       this.entity$.next(res)
     });
     this.hubSignalRService.onEvent<Category>("UpdatedProductCategory").subscribe(res=>{
       this.entity$.next(res)
     });

    })
  }

}
