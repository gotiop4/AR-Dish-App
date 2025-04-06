document.getElementById('camera').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    // Generate QR code with FULL GitHub Pages URL
    const githubPagesUrl = "https://gotiop4.github.io/AR-Dish-App/ar-viewer.html";
    new QRCode(document.getElementById('qr-code'), {
      text: `${githubPagesUrl}?image=${encodeURIComponent(reader.result)}`,
      width: 200,
      height: 200
    });
  };
  reader.readAsDataURL(file);
});
