document.getElementById('camera').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    // Generate QR code linking to AR viewer
    const imageUrl = URL.createObjectURL(file);
    new QRCode(document.getElementById('qr-code'), {
      text: `ar-viewer.html?image=${imageUrl}`,
      width: 200,
      height: 200
    });
  };
  reader.readAsDataURL(file);
});