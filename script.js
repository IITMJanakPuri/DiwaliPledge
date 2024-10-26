document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('certificateForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
    });
});

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

        // Base positions (adjust these as needed)
        const nameBaseX = 420; // X position for the name
        const nameBaseY = 760; // Y position for the name, aligned with "I,"

        const courseBaseX = 1030; // X position for the course
        const courseBaseY = 764; // Y position for the course, aligned with "of"

        // Offset values for finer adjustments
        const nameOffsetX = 0; // Adjust left or right by changing this value
        const nameOffsetY = 0; // Adjust up or down by changing this value

        const courseOffsetX = 0; // Adjust left or right by changing this value
        const courseOffsetY = 0; // Adjust up or down by changing this value

        // Final positions after applying offsets
        const nameFinalX = nameBaseX + nameOffsetX;
        const nameFinalY = nameBaseY + nameOffsetY;

        const courseFinalX = courseBaseX + courseOffsetX;
        const courseFinalY = courseBaseY + courseOffsetY;

        // Adding the text to the canvas
        context.font = 'bold 50px Open Sans';
        context.fillStyle = '#000';
        context.textAlign = 'left';

        // Draw the name after "I,"
        context.fillText(name, nameFinalX, nameFinalY);

        // Draw the course name after "of"
        context.fillText(course, courseFinalX, courseFinalY);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'certificate.png';

        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
    };

    image.src = 'DiwaliPledge.png';
}