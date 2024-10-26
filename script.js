function generateCertificate() {
    const name = document.getElementById('name').value;
    const course = document.getElementById('myDropdown').value;

    if (!name || !course) {
        alert('Please fill out all fields.');
        return;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        context.drawImage(image, 0, 0);

        // Set initial font details
        let fontSize = 38;
        let maxWidth = 500; // Maximum width for name text to prevent overflow

        // Adjust font size if name length is long
        if (name.length > 15) {
            fontSize = 30; // Smaller font for long names
        } else if (name.length > 10) {
            fontSize = 34; // Moderate reduction for medium names
        }

        context.font = `bold ${fontSize}px Arial`;
        context.fillStyle = '#000';
        context.textAlign = 'left';

        // Base positions for name and course
        let nameBaseX = 360;
        let nameBaseY = 760;
        const courseBaseX = 1100;
        const courseBaseY = 764;

        // Check if name width exceeds maxWidth and wrap text if necessary
        const textWidth = context.measureText(name).width;
        let lines = [];
        let currentLine = '';
        let lineY = nameBaseY;

        if (textWidth > maxWidth) {
            const words = name.split(' ');

            for (let i = 0; i < words.length; i++) {
                let testLine = currentLine + words[i] + ' ';
                let testWidth = context.measureText(testLine).width;

                if (testWidth > maxWidth && i > 0) {
                    lines.push(currentLine.trim());
                    currentLine = words[i] + ' ';
                } else {
                    currentLine = testLine;
                }
            }
            lines.push(currentLine.trim()); // Final line
        } else {
            lines.push(name); // Single line if it fits
        }

        // Draw all lines
        lines.forEach((line) => {
            context.fillText(line, nameBaseX, lineY);
            lineY += fontSize + 5; // Move to next line with spacing
        });

        // Draw course text in its fixed position
        context.font = 'bold 38px Arial';
        context.fillText(course, courseBaseX, courseBaseY);

        // Create a download link for the certificate
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'certificate.png';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    image.src = 'DiwaliPledge.png';
}