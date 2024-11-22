import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPosteComponent } from './add-poste.component';

describe('AddPosteComponent', () => {
  let component: AddPosteComponent;
  let fixture: ComponentFixture<AddPosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPosteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
