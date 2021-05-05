import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSelectComponent } from './note-select.component';

describe('NoteSelectComponent', () => {
  let component: NoteSelectComponent;
  let fixture: ComponentFixture<NoteSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
