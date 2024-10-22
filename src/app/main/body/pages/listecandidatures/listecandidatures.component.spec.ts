import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListecandidaturesComponent } from './listecandidatures.component';

describe('ListecandidaturesComponent', () => {
  let component: ListecandidaturesComponent;
  let fixture: ComponentFixture<ListecandidaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListecandidaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListecandidaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
