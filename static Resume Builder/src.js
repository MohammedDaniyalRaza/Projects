document.getElementById('resumeForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Hide the form and show the generated resume
    document.getElementById('resumeForm').style.display = 'none';
    document.getElementById('display').style.display = 'block';

    // Show the download button
    document.getElementById('downloadBtn').style.display = 'block';

    // Get the user's input
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const experience = document.getElementById("experience").value;
    const skills = document.getElementById("skills").value;
    const education =document.getElementById("education").value;
    const achivements = document.getElementById("achivement").value;

    // Populate the left-side (Personal Information)
    const leftSide = document.getElementById('left-side');
    leftSide.innerHTML = `
        <h1>${name}</h1>
        <p><strong>Email:</strong><br> ${email}</p>
        <p><strong>Contact:</strong><br> ${phone}</p>
        <p><strong>Adress:</strong><br> ${address}</p>
    `;

    // Populate the right-side (Experience and Skills)
    const rightSide = document.getElementById('right-side');

    // Convert experience and skills to list items
    // const experienceList = experience.split('\n').map(item => `<li>${item}</li>`).join('');
    const educationList = education.split("\n").map(item => `<li>${item}</li>`).join("");
    const skillsList = skills.split("\n").map(item => `<li>${item}</li>`).join("");
    const experienceList = experience.split("\n").map(item => `<li>${item}</li>`).join("");
    const achivementList = achivements.split("\n").map(item => `<li>${item}</li>`).join("");

    rightSide.innerHTML = `
        <h1 style="padding:10px; text-align:start;">Objective</h1>
        <p  style="padding:10px;">As a motivated and adaptable individual, I aim to contribute my skills and passion for continuous learning to a dynamic and innovative environment. My goal is to grow professionally while delivering high-quality work that aligns with the organization's objectives and values.</p>
        <h2 style="padding:10px;">Education:</h2>
        <ul style="padding:10px;">${educationList}</ul>
        <h2 style="padding:10px;">Skills:</h2>
        <ul style="padding:10px;">${skillsList}</ul>
        <h2 style="padding:10px;">Experience:</h2>
        <ul style="padding:10px;">${experienceList}</ul>
        <h2 style="padding:10px;">Achivements:</h2>
        <ul style="padding:10px;">${achivementList}</ul>
    `;
});

// Add download functionality
document.getElementById('downloadBtn').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;

    // Get the resume container
    const content = document.getElementById('display');

    // Use html2canvas to capture the content and then generate the PDF
    html2canvas(content).then(function (canvas) {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Add the image of the resume to the PDF
        const imgWidth = 210; // A4 page width in mm
        const pageHeight = 297; // A4 page height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        // Save the generated PDF
        pdf.save('resume.pdf');
    });
});
