import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-element',
  templateUrl: './book-element.component.html',
  styleUrl: './book-element.component.css'
})
export class BookElementComponent{
  @Input() text = 'The Bell Jar';
  @Input() author = 'Syvia Plath';
  @Input() description = '"The Bell Jar" by Sylvia Plath is a semi-autobiographical novel that explores the mental unraveling of Esther Greenwood, a talented young woman navigating the pressures of 1950s society. As Esther pursues her dreams in New York City, she grapples with the expectations of femininity, ambition, and mental health. Plath\'s vivid prose delves into Esther\'s descent into depression and her journey through various forms of treatment, ultimately painting a poignant portrait of a mind at odds with its surroundings. The novel remains a powerful reflection on the complexities of identity and the challenges faced by women in a patriarchal world.'
  @Input() genre = 'fiction';
  @Input() review = '';
  @Input() stars = '';
}
