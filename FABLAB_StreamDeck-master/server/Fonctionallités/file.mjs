import { exec } from 'child_process';


// Function to open a file with the default program on Windows
export const openFileOnWindows = (filePath) => {
  exec(`start "" "${filePath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error opening the file: ${error.message}`);
    } 
  });
};


//const videoPath = "C:/Users/User/Videos/Captures/Mixer de volume - Haut-parleurs (Realtek(R) Audio) 2021-04-23 17-54-16.mp4";
//openFileOnWindows(videoPath);
