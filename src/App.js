import React, { useState } from "react";
import { readAndCompressImage } from "browser-image-resizer";
import "./styles.css";

/**
 * The Config object that specifies the options
 * used by the "browser-image-resizer" npm to
 * perform the image resizing function
 */
const config = {
  quality: 1,
  maxWidth: 800,
  maxHeight: 600,
  autoRotate: true,
  debug: true
};

/**
 * Small helper function that allows us to use
 * Async/Await for cleaner more readable code
 * @param {File} file
 */
function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

/**
 * A small and simple functional component that allows
 * us to test the "browser-image-resizer" npm
 */
const App = () => {
  // Functional Component State
  const [image, setImage] = useState();
  const [resizedImage, setResizedImage] = useState();

  /**
   * Function triggered by onchange() from our input[type=file]
   * @param {Event} event I destructure the event object to
   * grab the files array from the target object
   */
  const handleFile = async ({ target: { files } }) => {
    console.log(files);
    if (files.length > 0) {
      const result = await readFileAsync(files[0]);
      setImage(result);

      const resizedImage = await readAndCompressImage(files[0], config);
      const result2 = await readFileAsync(resizedImage);
      setResizedImage(result2);
    }
  };

  return (
    <div className="App">
      <h1>Image Resizer</h1>
      <section>
        <h4>Select Image</h4>
        <input type="file" onChange={handleFile} />
        <br />
        {resizedImage && <img src={resizedImage} alt="file" width={400} />}
        <br />
        {image && <img src={image} alt="file" />}
      </section>
    </div>
  );
};

export default App;
