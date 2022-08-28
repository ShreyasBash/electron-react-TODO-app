import axios from 'axios'
import { useState } from "react";
import moment from 'moment'
import db from "../nedb/items";
import "../App.css";

import  csv from 'csv-parser'
import fs from 'fs'


import electron from 'electron'
import path from 'path';

// Importing dialog module using remote
const dialog = electron.remote.dialog;
  
var save = document.getElementById('save');
  

const apiKey = 'AIzaSyBYKVrAmLRB3U-J1U0LveryoqJMKicrdD0'
const cx = '017576662512468239146:omuauf_lfve'
const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=`

let loading = false

export const SearchBox = ({ items, setItems }) => {
  
  
  const saveItemToDB = ({title,link,snippet,searchTerm}) => {
    
    let doc = {
      title,
      link,
      snippet,
      searchTerm,
      dateAdded: moment().format('DD/MM/YYYY')
    };

   
    // db.insert(doc, (err, newDoc) => {
    //   if (!err) {
    //     console.info("Item Added");
    //     setItems([...items,doc]);
    //     setItem("");
    //   }
    // });
  };

  const handleKeyDown = (e) => {
    
    if (e.key === 'Enter' && e.target.value !== "") {
      setItems([])
      loading = true

      const query = e.target.value

      axios.get(url+query).then(onfulfilled =>{
         const response =onfulfilled.data

         const searchTerm = response.queries.request.searchTerms
         const items = response.items && response.items.map(({title,link, snippet})=>{
          return {
            title,
            link, 
            snippet
          }
         })
         
         
        
         if(items && items.length > 0){
          setItems(items)
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
          // fs.createReadStream('data.csv')
          //   .pipe(csv())
          //   .on('items', (row) => {
          //     console.log('csv row',row);
          //   })
          //   .on('end', () => {
          //     console.log('CSV file successfully processed');
          //   });
          // for(let i =0; i < items.length; i++){
          //   const item = {...items[i],searchTerm}
          //   // console.log('ITEM',item)
          //   // saveItemToDB(item)

          //   setItems([item]);
          // }
         }else{
          
          setItems([])
         }

         

         loading = false
         e.target.value = ""
      })
      // saveItemToDB(e.target.value)

      // e.target.value = ""
    }
  }

  return (
    <div className="SearchContainer">
      {/* <input
        type="text"
        placeholder="Search"
        className="inputTODO"
        onChange={(e) => {
          setItem(e.target.value);
        }}
        value={item}
      /> */}
      
        <div className="spinner-box"  style={{display:(loading ? 'flex':'none')}}>
            <div className="configure-border-1">  
              <div className="configure-core"></div>
            </div>  
            <div className="configure-border-2">
              <div className="configure-core"></div>
            </div> 
        </div>
        <input type="text" placeholder="Search..."  onKeyDown={handleKeyDown}/>
        <div className="search"></div>
          
      

      
    </div>
  );
};
