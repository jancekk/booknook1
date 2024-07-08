import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookNookPage } from './book-nook.page';

describe('BookNookPage', () => {
  let component: BookNookPage;
  let fixture: ComponentFixture<BookNookPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookNookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
