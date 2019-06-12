import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninformAdminComponent } from './signinform-admin.component';

describe('SigninformAdminComponent', () => {
  let component: SigninformAdminComponent;
  let fixture: ComponentFixture<SigninformAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninformAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninformAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
