import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = "COJ";
  subscription: Subscription;

  username = "joe";
  searchBox:FormControl = new FormControl();
  constructor(@Inject('auth') private auth,private router:Router,@Inject('input') private input) { }

  ngOnInit() {
    if (this.auth.authenticated()){
      this.username = this.auth.getProfile().nickname;
    }
    this.subscription = this.searchBox.valueChanges.debounceTime(200).
                                  subscribe(term =>this.input.changeInput(term));
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
}

  searchProblem():void{
    this.router.navigate(['/problems']);
  }

  login():void{
    this.auth.login().then(profile => this.username = profile.nickname);
  }

  logout():void{
    this.auth.logout();
  }

}
