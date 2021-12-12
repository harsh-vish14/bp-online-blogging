import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

export const uploadImages = async (image, url, setImageUrl, oldImage) => {
  if (oldImage) {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, oldImage);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        console.log("File deleted successfully", oldImage);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log("Error: ", error);
      });
  }
  if (image && url) {
    // console.log(`image: ${image}, url: ${url}`);
    const imageName = uuidv4();
    const file = image;
    /** @type {jpeg} */
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `${url}${imageName}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageUrl(downloadURL);
        });
      }
    );
  } else {
    setImageUrl(null);
  }
};
