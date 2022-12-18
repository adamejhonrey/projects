const tools = document.querySelectorAll('.tool');
const canvas = document.getElementById('canvas');

// Add dragstart event listeners to the tools
tools.forEach(tool => {
  tool.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', e.target.innerHTML);
  });
});

// Add dragover and drop event listeners to the canvas
canvas.addEventListener('dragover', e => {
  e.preventDefault();
});

canvas.addEventListener('drop', e => {
  e.preventDefault();
  const element = document.createElement(e.dataTransfer.getData('text/plain'));
  element.innerHTML = 'New Element';
  canvas.appendChild(element);
})

// Add click event listeners to the preview and download buttons
const previewButton = document.getElementById('preview-button');
const downloadButton = document.getElementById('download-button');

previewButton.addEventListener('click', () => {
  // Preview the website
  const previewWindow = window.open();
  previewWindow.document.write('<!DOCTYPE html><html><head><title>Website Preview</title></head><body>' + canvas.innerHTML + '</body></html>');
});

downloadButton.addEventListener('click', () => {
  // Download the website as an HTML file
  const html = '<!DOCTYPE html><html><head><title>My Website</title></head><body>' + canvas.innerHTML + '</body></html>';
  const file = new Blob([html], {type: 'text/html'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = 'index.html';
  a.click();
});
