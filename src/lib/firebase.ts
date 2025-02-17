// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBruLmr8rikLR4C44c0Fa9HWbsWsIdO6hY",
  authDomain: "gittacharya.firebaseapp.com",
  projectId: "gittacharya",
  storageBucket: "gittacharya.firebasestorage.app",
  messagingSenderId: "672074486385",
  appId: "1:672074486385:web:b6f04d547673f8569341d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadFile = async (file: File, setProgress?: (progress: number)=> void ) => {
  return new Promise((resolve, reject) => {
    try {
      const storageRef = ref(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if(setProgress) setProgress(progress)
        switch (snapshot.state) {
          case 'paused':
          console.log('Upload is paused'); break;
          case 'running':
          console.log('Upload is running'); break;
          case 'error':
          console.log('Upload failed'); break;
      }
    }, error => {
      reject(error);
    },()=> {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl=> {
        resolve(downloadUrl as string)
      })
    })
    } catch (error) {
      console.error(error);
      reject(error);
    }
  })
}