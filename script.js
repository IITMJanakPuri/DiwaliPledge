function generateCertificate() {
    const name = document.getElementById('name').value;
    const course = document.getElementById('myDropdown').value;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        // Font settings
        let fontSize = 38;
        let maxWidth = 900;

        // Adjust font size if name length is long
        if (name.length > 15) {
            fontSize = 38;
        } else if (name.length > 10) {
            fontSize = 38;
        }

        context.font = `bold ${fontSize}px Arial`;
        context.fillStyle = '#000';
        context.textAlign = 'left';

        // Position coordinates
        let nameBaseX = 250;
        let nameBaseY = 760;
        const courseBaseX = 1050;
        const courseBaseY = 764;

        // Check if name width exceeds maxWidth
        const textWidth = context.measureText(name).width;
        if (textWidth > maxWidth) {
            const words = name.split(' ');
            let currentLine = '';
            let lineY = nameBaseY;

            for (let i = 0; i < words.length; i++) {
                let testLine = currentLine + words[i] + ' ';
                let testWidth = context.measureText(testLine).width;

                if (testWidth > maxWidth && i > 0) {
                    context.fillText(currentLine, nameBaseX, lineY);
                    currentLine = words[i] + ' ';
                    lineY += fontSize + 5;
                } else {
                    currentLine = testLine;
                }
            }
            context.fillText(currentLine, nameBaseX, lineY);
        } else {
            context.fillText(name, nameBaseX, nameBaseY);
        }

        // Draw course text
        context.font = 'bold 38px Arial';
        context.fillText(course, courseBaseX, courseBaseY);

        // Download the certificate
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'certificate.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    image.src = 'DiwaliPledge.png';
}
