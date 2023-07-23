import { Component } from '@angular/core';

@Component({
  selector: 'general-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {


  cards:any[] = [
    {image:'assets/about/career.svg',name:'career'},
    {image:'assets/about/newsroom.svg',name:'Newsroom'},
    {image:'assets/about/press.svg',name:'Investor Relation'},
    {image:'assets/about/advertiser.svg',name:'Trust & Safety'}
  ]
}
