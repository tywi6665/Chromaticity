import axios from "axios";

export default {
    //Queries Shutterstock API to retrieve photos
    getPhotos: function(color) {
      console.log(color);
        return axios.get("/api/imagecolor/" + color);
    },
    //Queries aws to upload
    uploadImage: function(image) {
      const formData = new FormData();
      formData.append("image", image);
      return axios.post("/api/upload/image-upload", formData)
        .then(res => res.data.imageUrl)
        .catch(err => console.log(err));
    }, 
    //Queries aws to download
    downloadImages: function() {
      return axios.get("/api/download/image-download")
        .then(function(res) {
          let keys = [];
          res.data.forEach(object => {
            keys.push(object.Key)
          })
          return keys;
        })
        .catch(err => console.log(err))
    }
};