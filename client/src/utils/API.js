import axios from "axios";

export default {
    //Queries Shutterstock API to retrieve photos
    getPhotos: function(color) {
        console.log(color)
        return axios.get("/api/shutterstock/" + color);
    },
}