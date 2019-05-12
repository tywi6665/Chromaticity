import React, { Fragment, Component } from "react";
import { ColorExtractor } from "react-color-extractor";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import Container from "../../components/Container";
import Card from "../../components/Card";
import SubmitBtn from "../../components/SubmitBtn";
import set from "lodash/set";
import "./Saved.css";

const swatchStyles = {
    marginTop: 20,
    display: "flex",
    justifyContent: "center"
};

class Saved extends Component {

    state = {
        photos: [
            {
                src: "./images/DSC_0115.jpg",
                display: false
            },
            {
                src: "./images/DSC_0313.jpg",
                display: true
            },
            {
                src: "./images/DSC_0200.jpg",
                display: true
            }],
        file: null,
        colors: [],
        src: "./images/DSC_0115.jpg"
    };

    colorSwatches = () => {
        const { colors } = this.state;
        console.log(colors);
        return colors.map((color, i) => {
            return (
                <div
                    className="swatch"
                    key={i}
                    style={{ backgroundColor: color }}
                >
                    <p
                        style={{
                            color: color
                        }}
                    >{color}</p>
                </div>
            );
        });
    };

    getColors = colors => {
        this.setState(state => ({
            colors: [...state.colors, ...colors]
        }));
    }

    handleFileUpload = event => {
        console.log(event.target.files)
        this.setState({
            file: event.target.files,
            src: event.target.files[0].name
        });
    }

    handleFormSubmit = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.file = (this.state.file[0]);
        console.log(formData)
        // fetch("api/upload", formData, {
        //     method: "post"
        // })
        // .then(res => console.log(res))
        // .catch(err => console.log(err));   
        API.uploadPhoto(formData)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    imageClick = e => {
        const src = e.target.getAttribute("src");
        const display = this.state.photos.map(photo => {
            if(photo.src !== src) return {
                ...photo,
                display: true};
            return {
                ...photo,
                display: false
            };
        });
        this.setState({
            photos: display,
            colors: [],
            src: src
        });
    };


render() {
    return (
        <Fragment>
            <Nav />
            <Container>
                <form ref="uploadForm" encType="multipart/form-data" onSubmit={this.handleFormSubmit}>
                    <h6>Upload Photos</h6>
                    <Card
                        type="file"
                        onChange={this.handleFileUpload}
                        name="sampleFile"
                    />
                    <SubmitBtn
                        type="submit"
                        disabled={!(this.state.file)}
                    />
                </form>
            </Container>
            <Container>
                <div className="wrapper">
                    <ColorExtractor getColors={this.getColors}>
                        <img src={this.state.src} alt="#" />
                    </ColorExtractor>
                    <div style={swatchStyles}>{this.colorSwatches()}</div>
                </div>
            </Container>
            {this.state.photos.map((photo, i) => (
                photo.display ? (
                    <Container>
                        <img onClick={this.imageClick}
                            src={photo.src}
                            id={i}
                            key={i}
                            alt="#"
                            display={photo.display}
                        />
                    </Container>
                ) : (
                        ""
                    )
            ))}

        </Fragment>
    );
}

}

export default Saved;