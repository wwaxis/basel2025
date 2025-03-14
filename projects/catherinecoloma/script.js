const textElement = document.getElementById('text');

let details = {
    student_name:'Catherine Coloma',
    font_name:'Inabel',
    description:'This typeface is inspired from Inabel',
}

// Configurable min and max values for the font axes (easy to change by students)
const config = {
    // Custom axis names (students can change these to whatever they want)
    weightAxis: "ital",    // Axis name for weight (can be changed)
    widthAxis: "wdth",     // Axis name for width (can be changed)

    

    minWeight: 0,        // Minimum value for 'wght' axis (font weight)
    maxWeight: 200,        // Maximum value for 'wght' axis (font weight)

    minWidth: 75,          // Minimum value for 'wdth' axis (font width)
    maxWidth: 100,        // Maximum value for 'wdth' axis (font width)

    // minItalic: 0,
    // maxItalic: 200,
};



//------------------------------------------------------------------------------------------------//
// Function to handle mouse movement animation (based on X and Y axes)
function handleMouseMove(event) {
    const mouseX = event.clientX; // Horizontal position (X-axis)
    const mouseY = event.clientY; // Vertical position (Y-axis)

    const width = window.innerWidth;
    const height = window.innerHeight;

    //const italic = window.innerWidth;

    // Map mouse X position to font weight (wght axis) from minWeight to maxWeight
    const weight = (mouseX / width) * (config.maxWeight - config.minWeight) + config.minWeight;

    // Map mouse Y position to font width (wdth axis) from minWidth to maxWidth
    const widthValue = (mouseY / height) * (config.maxWidth - config.minWidth) + config.minWidth;

    // Italic 
    //const italic = (mouseX / width) * (config.maxItalic - config.minItalic) + config.minItalic;

    // Apply these values to the text's font-variation-settings (variable font axes)
    textElement.style.fontVariationSettings = 
        `"${config.weightAxis}" ${weight}, "${config.widthAxis}" ${widthValue}`;
}

// Add mousemove event listener for both X and Y position animation
window.addEventListener('mousemove', handleMouseMove);

// Initial effect setup (set default font variation on page load)
handleMouseMove({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
