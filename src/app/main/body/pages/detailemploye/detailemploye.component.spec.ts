import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailemployeComponent } from './detailemploye.component';

describe('DetailemployeComponent', () => {
  let component: DetailemployeComponent;
  let fixture: ComponentFixture<DetailemployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailemployeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailemployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
