import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooknookPage } from './booknook.page';

describe('BooknookPage', () => {
  let component: BooknookPage;
  let fixture: ComponentFixture<BooknookPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BooknookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
