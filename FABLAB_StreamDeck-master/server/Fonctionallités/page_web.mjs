import { exec } from 'child_process';

// Function to open a web page
export const openWebPage = (url) => {
  exec(`start ${url}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error opening the web page: ${stderr}`);
    } else {
      //console.log(`Web page opened: ${url}`);
    }
  });
};

// Example: Open YouTube
//const youtubeUrl = 'https://www.youtube.com';
//openWebPage(youtubeUrl);
