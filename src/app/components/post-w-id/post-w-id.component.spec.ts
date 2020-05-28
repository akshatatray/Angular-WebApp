import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostWIdComponent } from './post-w-id.component';

describe('PostWIdComponent', () => {
  let component: PostWIdComponent;
  let fixture: ComponentFixture<PostWIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostWIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostWIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
