import { Component, OnInit } from '@angular/core';
import { carouselPages } from '../create-group/create-group.component';
import { ProfileCore } from 'src/app/profile/state/profile.model';
import { Subscription } from 'rxjs';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { MenuService } from '../menu.service';
import { ProfileQuery } from 'src/app/profile/state/profile.query';
import { Event } from 'src/app/events/state/event.model';
import { EventsService } from 'src/app/events/state/events.service';
import { ChipElement } from 'src/app/UI-elements/chips-picker-generic/chips-picker-generic.component';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  showAddEventDialog: boolean = true;
  showInput: boolean = true;
  carouselPages: carouselPages[] = [];
  page: number = 0;
  loggedInUser: ProfileCore | undefined;
  loggedInUserId: string | null = null;

  menuSubscription: Subscription | undefined;
  profileSubscription: Subscription | undefined;

  chips: ChipElement[] = [
    {
      choosen: true,
      label: 'Täglich'
    },
    {
      choosen: false,
      label: 'Wöchentlich'
    },
    {
      choosen: false,
      label: 'Monatlich'
    },
  ]

  newEvent: Event = {
    name: '',
    date: '',
    time: '',
    rythm: 'Täglich',
    online_or_real: '',
    online_link: '',
    description: '',
    event_type: '',
    host_group: '',
    delegates_calculation_type: '',
    number_of_delegates: 0,
    number_of_executed_board_members: 0,
    gender_quota_speaking: false,
    participants_counter: 0
  }

  constructor(
    private authentificationQuery: AuthentificationQuery,
    private eventsService: EventsService,
    private menuService: MenuService,
    private profileQuery: ProfileQuery
  ) { }

  ngOnDestroy(): void {
    this.menuSubscription?.unsubscribe();
    this.profileSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getLoggedInUserId$();
    this.carouselPages = [
      {
        pageNumber: 1,
      },
      {
        pageNumber: 2,
      }
    ]

    this.menuSubscription = this.menuService.getEventMenuStatus().subscribe((menuStatus) => {
      this.showAddEventDialog = menuStatus;
    })

  }

  getLoggedInUserId$(): void {
    this.profileSubscription = this.authentificationQuery.uuid$.subscribe((uuid) => {
      if(uuid) {
        this.loggedInUserId = uuid;
        this.getSelectedProfile();
      }
    })
  }

  getSelectedProfile(): void {
    if (this.loggedInUserId) {
      this.profileQuery
        .selectEntity(this.loggedInUserId)
        .subscribe((profile: ProfileCore | undefined) => {
          if(profile) {
            //Review
            this.loggedInUser = profile;
          }
        })
    }
  }

  setRythm(rythm: string) {
    this.newEvent.rythm = rythm;
  }

  assignEventCreator(): void {
    if(this.loggedInUser) {
      this.newEvent.creator = this.loggedInUser.id;
    }
  }

  showinput(): void {
    this.showInput = !this.showInput;
  }

  pageForward(): void {
    if(this.page === this.carouselPages.length-1) {
      this.page = this.carouselPages.length-1;
    } else {
      this.page = this.page +1;
    }
  }

  pageBackward(): void {
    if(this.page === 0) {
      this.page = 0;
    } else {
      this.page = this.page -1;
    }
  }

  createEvent(): void {
    this.assignEventCreator();
    console.log(this.newEvent)
    this.eventsService.createEventTransaction(
      this.newEvent
    ).then((result) => {
      this.showAddEventDialog = false;
      this.newEvent = {
        name: '',
        date: '',
        time: '',
        rythm: 'string',
        online_or_real: 'string',
        online_link: '',
        description: '',
        event_type: '',
        host_group: '',
        delegates_calculation_type: '',
        number_of_delegates: 0,
        number_of_executed_board_members: 0,
        gender_quota_speaking: false,
        participants_counter: 0
      }
      this.page = 0;
    })
    .catch((error) => {
      console.log(error);
    })
    ;
  }

  onHide(): void {
    this.page = 0;
  }

}
