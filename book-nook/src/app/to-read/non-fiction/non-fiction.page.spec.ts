import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NonFictionPage } from './non-fiction.page';

describe('NonFictionPage', () => {
  let component: NonFictionPage;
  let fixture: ComponentFixture<NonFictionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NonFictionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
