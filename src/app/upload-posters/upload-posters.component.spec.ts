import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPostersComponent } from './upload-posters.component';

describe('UploadPostersComponent', () => {
  let component: UploadPostersComponent;
  let fixture: ComponentFixture<UploadPostersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPostersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
