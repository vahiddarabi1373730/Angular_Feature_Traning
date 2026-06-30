import { Component, inject, OnInit } from '@angular/core';
import { WithEntityStore } from '../store/withEntity-store';
import { AddUserEvent, EventsStore, UserApiEvent, UserEvent } from '../store/events-store';
import { Dispatcher, injectDispatch, provideDispatcher } from '@ngrx/signals/events';
import { User } from '../store/models/user-state';
import { ElementaryTopicStore } from '../store/Elementary-topic-store';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  ///////////////////////////////////////////Events
  //event فقط به storeهایی می‌رسد که در همان scope dispatcher قرار دارند.
  //
  // یا حتی کوتاه‌تر:
  //
  // اگر scopeِ dispatcher و store یکی نباشد، event به store نمی‌رسد.
  providers:[
    provideDispatcher(),
    EventsStore
  ]
})
export class UserComponent implements OnInit {
  ///////////////////////////////////////////withProps
  // withProps=inject(WithPropsStore)
  // this.withProps.loadUser("1")
  // this.withProps.loadUsers()
  // protected user$=this.withProps.user$;


  ///////////////////////////////////////////withLinkedState
  // withLinkedState=inject(WithLinkedStateStore)


  ///////////////////////////////////////////linkedSignal
  // linkedSignal=inject(linkedSignalStore)
  // protected users=this.linkedSignal.users;
  // protected changesUsers:User[]=[
  //   {id:"1",firstName:"test1",email:"test1"},
  //   {id:"2",firstName:"test2",email:"test1"},
  //   {id:"3",firstName:"test3",email:"test1"}
  // ]
  // onCallLinkedSignal(){
  //   this.linkedSignal.setUsers(this.changesUsers)
  // }


  ///////////////////////////////////////////getState
  // getState=inject(effectGetStateWatchStateStore)
  // protected users=this.getState.users;
  // onCallLinkedSignal(){
  //   this.getState.setUsers([])
  // }




  ///////////////////////////////////////////privateMembers
  // privateMembers=inject(privateMembersStore);
  // protected users=this.privateMembers.users;
  // onCallLinkedSignal(){
  //   // چون setUsers به صورت private است در دسترس نیست
  //   this.privateMembers.setUsers([])
  // }


  ///////////////////////////////////////////withStoreFeature
  // userExtendStoreFeature=inject(userExtendStoreFeature)
  // public users$=this.userExtendStoreFeature.items$;





  ///////////////////////////////////////////withEntity
  // withEntity=inject(WithEntityStore)
  // protected users=this.withEntity.entities;
  // addUser(){
  //   this.withEntity.addUser()
  // }
  //
  // prependUser(){
  //   this.withEntity.prependAddUser()
  // }
  // updateUser(){
  //   this.withEntity.updateUser()
  // }
  //
  // deleteUser(){
  //   this.withEntity.deleteUser()
  // }


  ///////////////////////////////////////////Events

  protected storeEvent = inject(EventsStore)
  protected dispatcher=inject(Dispatcher)
  protected userEventDispatcher=injectDispatch(UserEvent)
  protected users=this.storeEvent.users;

  onInputChange(event:any){
    const query=event.target.value;

    //۲ راه برای dispatch کردن وجود دارد
    this.userEventDispatcher.queryChanged(query);
    //یا
    this.dispatcher.dispatch(UserEvent.queryChanged(query))
  }

  onInputEmailChange(event:any){
    const email=event.target.value;

    //چند راه برای dispatch کردن وجود دارد

    // 1
    //بدون تعیین scope
    // this.userEventDispatcher.emailQueryChanged(email);

    // 2
    // همراه تعیین scope

    // self → فقط همین کامپوننت
    // parent → کامپوننتِ والد
    // global → کل برنامه (root)
    // this.userEventDispatcher({scope:"global"}).emailQueryChanged(email);
    // this.userEventDispatcher({scope:"parent"}).emailQueryChanged(email);
    this.userEventDispatcher({scope:"self"}).emailQueryChanged(email);

    //3
    // this.dispatcher.dispatch(UserEvent.emailQueryChanged(email))
  }

  addUser(){
    const user:Omit<User, 'id'>={email:"test",firstName:"maryam"}
    this.dispatcher.dispatch(AddUserEvent(user))
  }




  ///////////////////////////////////////////ElementaryTopic
  // protected ElementaryTopic=inject(ElementaryTopicStore)
  // protected users=this.ElementaryTopic.users;



  ngOnInit() {

    ///////////////////////////////////////////withLinkedState
    // this.withLinkedState.setUsers([{id:"2",firstName:"vahid",email:"test"}]);
    // this.withLinkedState.setSelectedUser({id:"3",email:"test2",firstName:"hamed"});
    // console.log(this.withLinkedState.selectedUser());


    ///////////////////////////////////////////linkedSignal
    // this.linkedSignal.loadUsers()



    ///////////////////////////////////////////getState
    // this.getState.loadUsers()


    ///////////////////////////////////////////privateMembers
    // ولی loadUsers() چون به صورت Public است در دسترس است در خارج از store
    // this.privateMembers.loadUsers()


    ///////////////////////////////////////////withEntity
    // this.withEntity.loadUsers()

    ///////////////////////////////////////////Events
    this.dispatcher.dispatch(UserEvent.queryChanged(""))

  }
}
