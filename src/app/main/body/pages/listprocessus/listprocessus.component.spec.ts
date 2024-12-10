import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListprocessusComponent } from './listprocessus.component';

describe('ListprocessusComponent', () => {
  let component: ListprocessusComponent;
  let fixture: ComponentFixture<ListprocessusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListprocessusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListprocessusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
