function generateRandomColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
  return `#${hex}`;
}

function generatePalette() {
  const palette = document.getElementById('palette');
  palette.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    const color = generateRandomColor();
    const colorDiv = document.createElement('div');
    colorDiv.className = 'color';
    colorDiv.style.backgroundColor = color;
    colorDiv.innerText = color;
    colorDiv.onclick = () => {
      navigator.clipboard.writeText(color);
      alert(`Copied ${color} to clipboard!`);
    };
    palette.appendChild(colorDiv);
  }
}

// Generate one palette on page load
window.onload = generatePalette;
