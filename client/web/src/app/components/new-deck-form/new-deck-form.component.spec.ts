import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeckFormComponent } from './new-deck-form.component';

describe('NewDeckFormComponent', () => {
  let component: NewDeckFormComponent;
  let fixture: ComponentFixture<NewDeckFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDeckFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDeckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});