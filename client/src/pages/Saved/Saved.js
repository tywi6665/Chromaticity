import React, { Fragment, Component } from "react";
import { ColorExtractor } from "react-color-extractor";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import Container from "../../components/Container";
import Card from "../../components/Card";
import SubmitBtn from "../../components/SubmitBtn";
import "./Saved.css";

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
        return colors.map((color, i) => {
            return (
                <div className="swatch"
                    data-toggle="toggle"
                    key={i}
                >
                    <div
                        className="swatchFace frontFace"
                        key={i}
                        style={{ backgroundColor: color }}
                        data-toggle="up"
                    >
                    </div>
                    <div className="swatchFace backFace"
                        data-toggle="up"
                        style={{ borderColor: color }}
                    >
                        <ul
                            className="colorList"
                            style={{ color: color }}
                            data-toggle="up"
                        >
                            <li data-toggle="up">{color}</li>
                            <li data-toggle="up">{this.hexToRgb(color)}</li>
                        </ul>
                    </div>
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
            // src: event.target.files[0].name
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
        API.uploadImage(formData)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        document.querySelector(".savedForm").reset()
    };

    imageClick = e => {
        const src = e.target.getAttribute("src");
        const display = this.state.photos.map(photo => {
            if (photo.src !== src) return {
                ...photo,
                display: true
            };
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

    toggleOn(e) {
        const target = e.target;
        compare(target);
        function compare(e) {
            if (e.getAttribute("data-toggle") === "down") {
                lookingDown(e)
            } else if (e.getAttribute("data-toggle") !== "toggle") {
                lookingUp(e);
            } else {
                e.classList.toggle("toggle")
            }
        };

        function lookingUp(e) {
            compare(e.parentElement)
        }

        function lookingDown(e) {
            compare(e.children[0])
        }
    };

    hexToRgb(hex) {
        const color = hex.replace('#', '');
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);
        const result = `rgb (${r}, ${g}, ${b})`;
        return result;
    }

    render() {
        return (
            <Fragment>
                <Nav />
                <Container>
                    <form
                        className="savedForm"
                        ref="uploadForm"
                        encType="multipart/form-data"
                        onSubmit={this.handleFormSubmit}
                    >
                        <h6>Upload Photos</h6>
                        <div className="uploadWrapper">
                            <button className="uploadButton">Upload a file</button>
                            <input
                                type="file"
                                onChange={this.handleFileUpload}
                                name="sampleFile"
                            />
                            <label htmlFor="sampleFile"></label>
                        </div>
                        <SubmitBtn
                            type="submit"
                            disabled={!this.state.file}
                        />
                    </form>
                </Container>
                <Container>
                    <div className="wrapper">
                        <ColorExtractor getColors={this.getColors}>
                            <img
                                className="savedImg"
                                src={this.state.src}
                                alt="#"
                            />
                        </ColorExtractor>
                        <div
                            className="swatchContainer"
                            // style={swatchStyles}
                            onClick={this.toggleOn}
                            data-toggle="down"
                        >
                            {this.colorSwatches()}
                        </div>
                    </div>
                </Container>
                <Container>
                    <div className="flexList">
                        {this.state.photos.map((photo, i) => (
                            photo.display ? (
                                <img
                                    className="savedList"
                                    onClick={this.imageClick}
                                    src={photo.src}
                                    id={i}
                                    key={i}
                                    alt="#"
                                    display={photo.display.toString()}
                                />
                            ) : (
                                    null
                                )
                        ))}
                    </div>
                </Container>
            </Fragment>
        );
    }

}

export default Saved;