import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../service/common.service';
import { Post } from "../post.model";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  allUser: Object;
  isEdit = false;
  createUserDetails: FormGroup
  constructor(private route: ActivatedRoute, private commonService: CommonService, private fb: FormBuilder) { 
    this.createUserDetails = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getLatestUser();
  }
  getLatestUser() {
    this.commonService.getAllUser().subscribe(res => {
      this.allUser = res;
    })
  }

  deleteUser(user: Post){
    this.commonService.deleteUser(user).subscribe((res: Post)=>{
      this.getLatestUser();
    })
  }
}
