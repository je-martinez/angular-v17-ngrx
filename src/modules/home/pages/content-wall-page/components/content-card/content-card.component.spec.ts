import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ContentCardComponent } from './content-card.component';
import { mockContent } from '@mocks/data/content.mock';
import { By } from '@angular/platform-browser';

describe('ContentCardComponent', () => {
  let component: ContentCardComponent;
  let fixture: ComponentFixture<ContentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render elements of content', () => {
    const content = { ...mockContent[0] };
    component.content = content;
    fixture.detectChanges();
    const avatar = fixture.debugElement.query(By.css('#content-avatar'));
    const name = fixture.debugElement.query(By.css('#content-name'));
    const title = fixture.debugElement.query(By.css('#content-title'));
    const body = fixture.debugElement.query(By.css('#content-body'));
    const commentsCount = fixture.debugElement.query(
      By.css('#content-commentsCount')
    );

    expect(avatar.attributes['src']).toBe(content.user.avatar);
    expect(
      name.nativeElement.textContent.includes(content.user.name)
    ).toBeTrue();
    expect(title.nativeElement.textContent.includes(content.title)).toBeTrue();
    expect(body.nativeElement.textContent.includes(content.body)).toBeTrue();
    expect(commentsCount.nativeElement.textContent).toBe(
      content.comments.length.toString()
    );
  });

  it('should be able to select content on click comments button', fakeAsync(() => {
    const button = fixture.debugElement.query(
      By.css('#content-comments-button')
    );

    spyOn(component, 'selectContentHandler');

    button.nativeElement.click();
    fixture.detectChanges();

    expect(component.selectContentHandler).toHaveBeenCalled();
  }));

  it('should be able to emit to parent when selectContentHandler is called', fakeAsync(() => {
    spyOn(component.selectContent, 'emit');
    component.selectContentHandler();
    fixture.detectChanges();
    expect(component.selectContent.emit).toHaveBeenCalled();
  }));
});
