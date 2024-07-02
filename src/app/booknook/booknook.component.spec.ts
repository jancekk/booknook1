import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooknookComponent } from './booknook.component';

describe('BooknookComponent', () => {
  let component: BooknookComponent;
  let fixture: ComponentFixture<BooknookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooknookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooknookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
