import './App.css';
import { useState } from 'react';

function App() {
  const [valThumbnail, setThumbnailVal] = useState('');
  const [valImage, setImageVal] = useState('')

  const changeThumbnailVal = (e) => {
      setThumbnailVal(e.target.value);
  }

  const changeImageVal = (e) => {
      console.log(e.target.files[0].name);
      setImageVal(e.target.files[0].name);
  }

  const Accept = () => {

      const formData = new FormData();

      formData.append('ThumbnailTitle', valThumbnail);
      formData.append('image', valImage);

      for (const value of formData.values()) {
        console.log(value);
      }

      console.log(formData.getAll('ThumbnailTitle'));

      fetch('http://localhost:3001/userFeed/post', {
          method: 'POST',
          body: formData
      })
      .then(res => {
          if(res.status !== 200 && res.status !== 201){
              throw new Error('Creating or editing a post failed!'); 
          }
          return res.json();
      })
      .then(resData => {
          const post = JSON.stringify(resData);
          console.log(post);
      })
      .catch(err => console.log("ERROR HERE::", err));
  }

  return (
      <div className="thumbnailCreator">
          <div className = "textBox">
              <p>Title:</p>
              <input onChange={changeThumbnailVal} value = {valThumbnail}></input>
          </div>
          <div className = "imageBox">
              <p>Image:</p>
                  <input type="file" id="myFile" name="filename" onChange={changeImageVal}/>
          </div>
          <div className = "accept">
              <button onClick={Accept}>Accept</button>
          </div>
      </div>
  );
}

export default App;
