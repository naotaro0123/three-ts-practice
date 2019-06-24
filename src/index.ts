import SimpleShader from './SimpleShader';

const canvas = new SimpleShader();

window.addEventListener('mousemove', e => {
  canvas.mouseMoved(e.clientX, e.clientY);
});

window.addEventListener('mousedown', e => {
  canvas.mousePressed(e.clientX, e.clientY);
});

window.addEventListener('mouseup', e => {
  canvas.mouseReleased(e.clientX, e.clientX);
});
