import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPPCComponent } from './list-ppc.component';

describe('ListPPCComponent', () => {
  let component: ListPPCComponent;
  let fixture: ComponentFixture<ListPPCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPPCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPPCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
