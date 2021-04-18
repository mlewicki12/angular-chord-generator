import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordMenuComponent } from './chord-menu.component';

describe('ChordMenuComponent', () => {
  let component: ChordMenuComponent;
  let fixture: ComponentFixture<ChordMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChordMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
