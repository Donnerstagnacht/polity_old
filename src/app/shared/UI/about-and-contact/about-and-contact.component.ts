import { Component, Input, OnInit } from '@angular/core';

export interface contactData {
  about: string;
  contact_Email: string;
  contact_Phone: string;
  street: string;
  post_Code: string;
  city: string;
}

@Component({
  selector: 'app-about-and-contact',
  templateUrl: './about-and-contact.component.html',
  styleUrls: ['./about-and-contact.component.scss']
})

export class AboutAndContactComponent implements OnInit {
  @Input() contactData: contactData | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
