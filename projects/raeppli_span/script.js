const textElement = document.getElementById('text');

let details = {
    student_name:'jiawen_mei',
    font_name:'räppli_color',
    description:'a variable typeface that just went to Basel and never came back',
}

// Configurable min and max values for the font axes
const config = {
    weightAxis: "wght", 
    widthAxis: "wdth",
    minWeight: 0,        
    maxWeight: 100,        
    minWidth: 0,          
    maxWidth: 100,         
    effectRadius: 500,     
    breathingSpeed: 300   
};



//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
// Function to wrap each letter in a <span>
function wrapText() {
    const textContent = textElement.textContent.trim(); // Get text without HTML tags
    textElement.innerHTML = ""; // Clear the existing text

    textContent.split("").forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        textElement.appendChild(span);
    });
}

// Call this whenever the text changes
function updateSpans() {
    wrapText();
    spans = document.querySelectorAll("#text span"); // Refresh the list
}

// Handle mouse move effect (wght)
function handleMouseMove(event) {
    const mouseX = event.clientX;
    
    spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const distance = Math.abs(mouseX - centerX);
        const intensity = Math.max(0, 1 - distance / config.effectRadius);
        const weight = config.minWeight + intensity * (config.maxWeight - config.minWeight);
        const currentWidth = span.getAttribute("data-width") || config.minWidth;

        span.style.fontVariationSettings = 
            `"${config.weightAxis}" ${weight}, "${config.widthAxis}" ${currentWidth}`;
    });
}

function animateBreathing(timestamp) {
    const cycle = (timestamp % config.breathingSpeed) / config.breathingSpeed;
    // const wave = (Math.cos(cycle * Math.PI * 2 - Math.PI) + 1) / 2;  // ⬅ Fix here
    const wave = (1 + Math.cos(timestamp/200)) /2 ;  // ⬅ Fix here
    const widthValue = config.minWidth + wave * (config.maxWidth - config.minWidth);

    console.log("wave", wave)

    spans.forEach((span) => {
        span.setAttribute("data-width", widthValue);
        const weightRegex = new RegExp(`"${config.weightAxis}"\\s*([\\d.]+)`);
        const currentWeightMatch = span.style.fontVariationSettings.match(weightRegex);
        const weightValue = currentWeightMatch ? currentWeightMatch[1] : config.minWeight;

        span.style.fontVariationSettings = 
            `"${config.weightAxis}" ${weightValue}, "${config.widthAxis}" ${widthValue}`;
    });

    requestAnimationFrame(animateBreathing);
}

// Detect user input and update spans
textElement.addEventListener("input", updateSpans);

// Initialize
wrapText();
let spans = document.querySelectorAll("#text span");
window.addEventListener('mousemove', handleMouseMove);
requestAnimationFrame(animateBreathing);
