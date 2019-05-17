import axios from "axios";
import * as multer from "multer";
const upload = multer();

export default {
    //Queries Shutterstock API to retrieve photos
    getPhotos: function(color) {
        // console.log(color)
        return axios.get("/api/imagecolor/" + color);
    },
    //Queries aws
    uploadImage: function(image) {
      const formData = new FormData();
      formData.append("image", image);
      return axios.post("/api/image-upload", formData)
        .then(res => res.data.imageUrl)
        .catch(err => console.log(err));
    } 
    // function(formData) {
        // console.log(formData.file);
        // return axios.post("/api/upload", upload.single(formData.file), (req, res) => {
        //     console.log(req.file);
        //     if (!req.file) {
        //       console.log("No file received");
        //       return res.send({
        //         success: false
        //       });
          
        //     } else {
        //       console.log('file received');
        //       return res.send({
        //         success: true
        //       })
        //     }
            // headers: {
            //     "Content-Type": "multipart/form-data"
            // }
        // }
        // )
    // }
};