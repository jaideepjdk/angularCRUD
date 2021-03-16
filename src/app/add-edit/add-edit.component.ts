import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { Post } from "../post.model";

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  allUser: Object;
  isEdit = false;
  userObj = {
    name: '',
    mobile: '',
    email: '',
    password: '',
    id: ''
  }
  createUserDetails: FormGroup
  constructor(private route: ActivatedRoute, private commonService: CommonService, private fb: FormBuilder, private router: Router) {
    this.createUserDetails = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      var user = {
        id: res['id']
      }
      if (user.id != undefined)
        this.commonService.getUserById(user).subscribe((ress: Post) => {
          this.isEdit = true;
          this.createUserDetails.patchValue({
            name: ress.name,
            mobile: ress.mobile,
            email: ress.email,
            password: ress.password,
            id: ress.id
          })
        })
    })
  }
get email(){
  return this.createUserDetails.get("email")
}

  addUser() {
    if(this.createUserDetails.invalid){
      return;
    }
    this.route.params.subscribe(res => {
      var user = {
        id: res['id']
      }

      if (user.id) {
        var oldUser = {
          id: user.id,
          name: this.createUserDetails.value.name,
          mobile: this.createUserDetails.value.mobile,
          email: this.createUserDetails.value.email,
          password: this.createUserDetails.value.password,
        }
        this.commonService.updateUser(oldUser).subscribe((res: Post) => {
          this.createUserDetails.reset();
          this.getLatestUser();
          this.router.navigate([''])
        })
      } else {
        var newUser = {
          name: this.createUserDetails.value.name,
          mobile: this.createUserDetails.value.mobile,
          email: this.createUserDetails.value.email,
          password: this.createUserDetails.value.password,
        }
        this.commonService.createUser(newUser).subscribe((res: Post) => {
          this.createUserDetails.reset();
          this.getLatestUser();
          this.router.navigate([''])
        })

      }
    })
  }

  getLatestUser() {
    this.commonService.getAllUser().subscribe(res => {
      this.allUser = res;
    })
  }


}
