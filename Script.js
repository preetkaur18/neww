// Array to store uploaded images
let images = [];

// Handle file input change
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file');
    const uploadArea = document.querySelector('.upload');
    
    // File input change event
    fileInput.onchange = function(e) {
        handleFiles(e.target.files);
    };
    
    // Drag and drop functionality
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = '#667eea';
        uploadArea.style.backgroundColor = 'rgba(102, 126, 234, 0.05)';
    });
    
    uploadArea.addEventListener('dragleave', function() {
        uploadArea.style.borderColor = '#ccc';
        uploadArea.style.backgroundColor = 'transparent';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = '#ccc';
        uploadArea.style.backgroundColor = 'transparent';
        handleFiles(e.dataTransfer.files);
    });
});

// Handle file processing
function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                images.push({
                    src: e.target.result,
                    name: file.name
                });
                showImages();
            };
            reader.readAsDataURL(file);
        }
    });
}

// Display images in preview grid
function showImages() {
    const previewContainer = document.getElementById('preview');
    previewContainer.innerHTML = images.map((img, i) => 
        `<img src="${img.src}" alt="${img.name}" onclick="openModal('${img.src}')" title="${img.name}">`
    ).join('');
}

// Open modal with full-size image
function openModal(src) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    
    modalImg.src = src;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside image
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeModal();
        }
    };
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});