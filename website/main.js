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

// Customization options for each element
const form = document.createElement('form');
form.innerHTML = '<label for="element-content">Content:</label><br><textarea id="element-content" name="element-content"></textarea><br><button type="submit">Update</button>';
form.style.display = 'none';
document.body.appendChild(form);

form.addEventListener('submit', e => {
  e.preventDefault();
  const content = document.getElementById('element-content').value;
  selectedElement.innerHTML = content;
  form.style.display = 'none';
});

// Add click event listener to the canvas
canvas.addEventListener('click', e => {
  if (e.target !== e.currentTarget) {
    // Display the customization form for the selected element
    selectedElement = e.target;
    document.getElementById('element-content').value = selectedElement.innerHTML;
    form.style.display = 'block';
  }
});

// Responsive layout
const breakpoint = 600; // Adjust this value as needed

window.addEventListener('resize', () => {
  if (window.innerWidth > breakpoint) {
    // Display tools and canvas side by side
    toolbox.style.display = 'block';
    canvas.style.width = 'calc(100% - 200px)';
  } else {
    // Display tools and canvas one above the other
    toolbox.style.display = 'none';
    canvas.style.width = '100%';
  }
});

// Page navigation
const nav = document.createElement('nav');
nav.innerHTML = '<a href="#">Home</a> <a href="#">About</a> <a href="#">Contact</a>';
document.body.insertBefore(nav, canvas);

// File upload
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

fileInput.addEventListener('change', () => {
  // Use the selected file to update an image element on the canvas
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    selectedElement.src = reader.result;
  });
  reader.readAsDataURL(file);
});

// Saving and loading
const saveButton = document.createElement('button');
saveButton.innerHTML = 'Save';
document.body.insertBefore(saveButton, nav);

saveButton.addEventListener('click', () => {
  // Save the current state of the canvas to local storage
  localStorage.setItem('canvas', canvas.innerHTML);
});

const loadButton = document.createElement('button');
loadButton.innerHTML = 'Load';
document.body.insertBefore(loadButton, nav);

loadButton.addEventListener('click', () => {
  // Load the saved state of the canvas from local storage
  canvas.innerHTML = localStorage.getItem('canvas');
});
