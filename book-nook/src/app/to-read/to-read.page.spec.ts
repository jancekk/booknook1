import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToReadPage } from './to-read.page';

describe('ToReadPage', () => {
  let component: ToReadPage;
  let fixture: ComponentFixture<ToReadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ToReadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
