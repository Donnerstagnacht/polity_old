import { Component, Input, OnInit } from '@angular/core';

export interface contactData {
  about: string;
  contact_email: string;
  contact_phone: string;
  street: string;
  post_code: string;
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
