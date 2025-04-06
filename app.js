document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const uploadInput = document.getElementById('image-upload');
    const qrContainer = document.getElementById('qr-code');
    const statusDiv = document.getElementById('status');
    
    // Debug: Verify elements exist
    console.log('Initialized elements:', {
        uploadInput,
        qrContainer,
        statusDiv
    });

    // Check if QRCode library loaded
    console.log('QRCode library:', typeof QRCode === 'function' ? 'Loaded' : 'Missing');
    
    uploadInput.addEventListener('change', function(e) {
        // Reset UI
        qrContainer.innerHTML = '';
        statusDiv.textContent = 'Processing...';
        
        const file = e.target.files[0];
        if (!file) {
            statusDiv.textContent = 'No file selected';
            return;
        }

        console.log('Selected file:', file.name, `${(file.size/1024).toFixed(1)}KB`);
        
        const reader = new FileReader();
        
        reader.onload = function(event) {
            try {
                // Generate the AR viewer URL
                const currentUrl = window.location.href;
                const baseUrl = currentUrl.includes('index.html') 
                    ? currentUrl.replace('index.html', '')
                    : currentUrl;
                    
                const arViewerUrl = baseUrl + 'ar-viewer.html?image=' + 
                                  encodeURIComponent(event.target.result);
                
                console.log('Generating QR for:', arViewerUrl);
                
                // Generate QR code
                new QRCode(qrContainer, {
                    text: arViewerUrl,
                    width: 200,
                    height: 200,
                    correctLevel: QRCode.CorrectLevel.H
                });
                
                statusDiv.textContent = 'QR code generated! Scan with another device.';
                console.log('QR generation successful');
                
            } catch (error) {
                statusDiv.textContent = 'Error generating QR code';
                console.error('QR generation failed:', error);
            }
        };
        
        reader.onerror = function() {
            statusDiv.textContent = 'Error reading file';
            console.error('FileReader error');
        };
        
        reader.readAsDataURL(file);
    });
});
