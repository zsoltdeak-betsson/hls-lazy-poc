import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Hls from 'hls.js';

@Component({
  template: `<div>
    <h1>Video page</h1>
    <video #video width="640" height="360">
    </video>
    <button (click)="loadVideo()">Load video</button>
    </div>
  `,
  styles: [`div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  button { margin-top: 12px;}`]
})
export class VideoComponent {

  readonly src = 'geoff.mp4';

  private hls: Hls | undefined;

  @ViewChild('video', { static: true }) private readonly video: ElementRef<HTMLVideoElement>;

  loadVideo(): void {
    this.hls = new Hls();
    this.hls.attachMedia(this.video.nativeElement);
    this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      this.hls.loadSource(this.src);
      this.video.nativeElement.setAttribute('src', this.src);
      this.video.nativeElement.play();
    });
  }
}
