const express = require("express");
const path = require("path");
// const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();

// Add routes, both API and view
// app.use(routes);
const colorRoutes = require("./routes/imageColor"),
      imageUploadRoutes = require("./routes/image-upload"),
      imageDownloadRoutes = require("./routes/image-download");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/imagecolor", colorRoutes);
app.use("/api/download", imageDownloadRoutes)
app.use("/api/upload", imageUploadRoutes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}



// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});