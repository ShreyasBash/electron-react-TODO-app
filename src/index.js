import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// Importing dialog module using remote
const dialog = electron.remote.dialog;
  
var save = document.getElementById('save');
  
save.addEventListener('click', (event) => {
    // Resolves to a Promise<Object>
    dialog.showSaveDialog({
        title: 'Select the File Path to save',
        defaultPath: path.join(__dirname, '../assets/sample.txt'),
        // defaultPath: path.join(__dirname, '../assets/'),
        buttonLabel: 'Save',
        // Restricting the user to only Text Files.
        filters: [
            {
                name: 'Text Files',
                extensions: ['txt', 'docx']
            }, ],
        properties: []
    }).then(file => {
        // Stating whether dialog operation was cancelled or not.
        console.log(file.canceled);
        if (!file.canceled) {
            console.log(file.filePath.toString());
              
            // Creating and Writing to the sample.txt file
            fs.writeFile(file.filePath.toString(), 
                         'This is a Sample File', function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        }
    }).catch(err => {
        console.log(err)
    });
});
