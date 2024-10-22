import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeemployeComponent } from './listeemploye.component';

describe('ListeemployeComponent', () => {
  let component: ListeemployeComponent;
  let fixture: ComponentFixture<ListeemployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeemployeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeemployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
