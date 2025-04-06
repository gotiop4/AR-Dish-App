document.getElementById('camera').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  
  reader.onload = function() {
    // Clear previous QR code
    document.getElementById('qr-code').innerHTML = '';
    
    // Generate new QR code
    new QRCode(document.getElementById('qr-code'), {
      text: window.location.href.replace('index.html', 'ar-viewer.html') + 
            '?image=' + encodeURIComponent(reader.result),
      width: 200,
      height: 200
    });
  };
  reader.readAsDataURL(file);
});

// Debug: Check if QRCode library is loaded
console.log('QRCode loaded:', typeof QRCode === 'function');
