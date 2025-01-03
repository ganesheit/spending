import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentCommentsComponent } from './recent-comments.component';

describe('RecentCommentsComponent', () => {
  let component: RecentCommentsComponent;
  let fixture: ComponentFixture<RecentCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentCommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
