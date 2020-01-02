import createWorker from 'offscreen-canvas/create-worker';

class OffScreen {
  constructor() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const webworkerLink = '<link rel="preload" as="script" href="worker.js">';
    document.head.innerHTML += webworkerLink;
    const workerUrl = (<HTMLLinkElement>(
      document.querySelector('[rel=preload][as=script]')
    )).href;
    const worker = createWorker(canvas, workerUrl);
    window.addEventListener('resize', () => {
      worker.post({
        type: 'resize',
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
  }
}

export default OffScreen;
