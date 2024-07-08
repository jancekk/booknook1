import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FictionPage } from './fiction.page';

describe('FictionPage', () => {
  let component: FictionPage;
  let fixture: ComponentFixture<FictionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FictionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
