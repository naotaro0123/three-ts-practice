class OffScreen {
  constructor() {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 400;
    document.body.appendChild(canvas);

    const offScreenCanvas: any = canvas.transferControlToOffscreen();
    const worker = new Worker('../Workers/OffScreenWorker.js');
    worker.postMessage(
      {
        canvas: offScreenCanvas,
        width: canvas.width,
        height: canvas.height
      },
      [offScreenCanvas]
    );
  }
}

export default OffScreen;
