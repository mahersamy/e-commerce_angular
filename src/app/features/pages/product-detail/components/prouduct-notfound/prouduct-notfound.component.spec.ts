import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProuductNotfoundComponent } from './prouduct-notfound.component';

describe('ProuductNotfoundComponent', () => {
  let component: ProuductNotfoundComponent;
  let fixture: ComponentFixture<ProuductNotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProuductNotfoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProuductNotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
