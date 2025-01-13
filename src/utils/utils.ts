// Place holder
export const a = 0;
export const letterPositions = {
    'A': { x: -0.22, z: -0.02 }, 'B': { x: -0.18, z: -0.03 }, 'C': { x: -0.14, z: -0.04 },
    'D': { x: -0.11, z: -0.05 }, 'E': { x: -0.07, z: -0.06 }, 'F': { x: -0.04, z: -0.065 },
    'G': { x: -0.01, z: -0.06 }, 'H': { x: 0.04, z: -0.05 }, 'I': { x: 0.08, z: -0.045 },
    'J': { x: 0.103, z: -0.04 }, 'K': { x: 0.14, z: -0.035 }, 'L': { x: 0.18, z: -0.04 },
    'M': { x: 0.225, z: -0.035 },
    'N': { x: -0.22, z: 0.02 }, 'O': { x: -0.185, z: 0.01 }, 'P': { x: -0.145, z: 0.01 },
    'Q': { x: -0.11, z: 0.01 }, 'R': { x: -0.07, z: -0.015 }, 'S': { x: -0.03, z: -0.015 },
    'T': { x: 0.0, z: -0.015 }, 'U': { x: 0.04, z: -0.015 }, 'V': { x: 0.075, z: -0.015 },
    'W': { x: 0.12, z: 0.0 }, 'X': { x: 0.17, z: 0.0 }, 'Y': { x: 0.2, z: 0.01 },
    'Z': { x: 0.23, z: 0.02 }
};

export function getLetterPosition(rowIndex: number, letterIndex: number) {
    const totalDegrees = 45; // Total arc in degrees
    const radius = 0.685; // Radius of the circle
    const centerY = -0.65; // X coordinate of the center of the circle
    const centerX = 0; // Y coordinate of the center of the circle (since it's centered horizontally)

    // Calculate the angle in degrees for the given letter index
    const degreesPerLetter = totalDegrees / (12 + rowIndex); // Total degrees divided by the number of intervals
    const letterDegree = degreesPerLetter * (letterIndex - 6); // Degree offset for this letter index

    // Convert the angle from degrees to radians
    const letterRadian = (letterDegree + 90) * (Math.PI / 180); // Converting degrees to radians

    // Calculate the x and y coordinates based on the circle formula
    const x = radius * Math.cos(letterRadian);
    const y = radius * Math.sin(letterRadian);

    // Adjust by the circle's center coordinates
    const adjustedX = centerX + x;
    const adjustedY = centerY + y + rowIndex * 0.05

    return { x: adjustedX, y: adjustedY };
}

export function letterToPosition(letter: string) {
    console.log(letter)
    letter = letter.toUpperCase();
    if(letter >= "N") {
        return getLetterPosition(0, letter.charCodeAt(0) - "N".charCodeAt(0));
    } else {
        return getLetterPosition(1, letter.charCodeAt(0) - "A".charCodeAt(0));
    }
}