import React, { Fragment, Component } from "react";
import { Upload, Icon, Modal } from 'antd';
import 'antd/dist/antd.css';
import { ColorExtractor } from "react-color-extractor";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import Container from "../../components/Container";
import SubmitBtn from "../../components/SubmitBtn";
import scrollToComponent from 'react-scroll-to-component';
import "./Saved.css";

class Saved extends Component {

    constructor() {
        super();

        this.setupReader();

        this.state = {
            photos: null,
            selectedFile: null,
            imageBase64: "",
            initialImageBase64: "",
            colors: [],
            keys: null,
            src: "",
            previewVisible: false,
            previewImage: "",
            fileList: [],
            navModal: "HeyHeyHey"
        };

        this.handleFileUpload = this.handleFileUpload.bind(this);
    };

    componentDidMount() {
        this.downloadImages()
    }

    getColors = colors => {
        this.setState(state => ({
            colors: [...state.colors, ...colors]
        }));
    };

    handleFileUpload = e => {
        console.log(e.target.files[0]);
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            this.setState({
                selectedFile,
                initialImageBase64: ""
            });

            this.reader.readAsDataURL(selectedFile);
        };
    };

    setupReader() {
        this.reader = new FileReader();

        this.reader.addEventListener('load', (event) => {
            const { initialImageBase64 } = this.state;

            const imageBase64 = event.target.result;

            if (initialImageBase64) {
                this.setState({ imageBase64 });
            } else {
                this.setState({ imageBase64, initialImageBase64: imageBase64 });
            }
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });

    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handleFormSubmit = e => {
        e.preventDefault();
        const { selectedFile } = this.state;

        if (selectedFile) {
            API.uploadImage(selectedFile)
                .then(res => this.downloadImages())
                .catch(err => console.log(err))
        };

        this.setState({
            previewImage: "",
            fileList: []
        })

        document.querySelector(".savedForm").reset()
    };

    downloadImages() {
        API.downloadImages()
            .then(res => {
                let keys = [];
                res.forEach(key => {
                    return keys.push({
                        src: key,
                        display: true
                    });
                });
                const src = keys[0].src;
                keys[0].display = false
                // console.log(keys);
                return this.setState({ photos: keys, src: src })
            })
            .catch(err => console.log(err))
    };

    imageClick = e => {
        const src = e.target.getAttribute("src").split("").splice(54).join("");
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

        setTimeout(() => {
            scrollToComponent(this.savedImg, { offset: -15, align: 'top', duration: 1500, ease: "inOutCirc" })
        }, 300);


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
            if (e.getAttribute("data-toggle") === "none") {
                return
            } else if (e.getAttribute("data-toggle") !== "toggle") {
                lookingUp(e);
            } else {
                e.classList.toggle("toggle")
            }
        };

        function lookingUp(e) {
            compare(e.parentElement)
        };
    };

    hexToRgb(hex) {
        const color = hex.replace('#', '');
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);
        const result = `rgb (${r}, ${g}, ${b})`;
        return result;
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

    render() {
        return (
            <Fragment>
                <Nav
                    helpModal={this.state.navModal}
                />
                <Container>
                    <form
                        className="savedForm"
                        ref="uploadForm"
                        encType="multipart/form-data"
                        onChange={this.handleFileUpload}
                        onSubmit={this.handleFormSubmit}
                    >
                        <h6>Upload Photos</h6>
                        <Upload
                            className="Upload"
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={this.state.fileList}
                            type="file"
                            accept='.jpg, .png, .jpeg'
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            {this.state.fileList.length >= 1 ? null : (
                                <div>
                                    <Icon type="plus" />
                                    <div className="ant-upload-text">Upload</div>
                                </div>
                            )}
                        </Upload>
                        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                        </Modal>
                        <SubmitBtn
                            type="submit"
                            disabled={!this.state.fileList.length}
                        />
                    </form>
                </Container>
                <Container>
                    <div className="wrapper">
                        {this.state.src ? (
                            <>
                                <div className="savedImg"
                                    ref={(section) => { this.savedImg = section; }}
                                >
                                    <img
                                        src={`https://s3-us-west-1.amazonaws.com/bootcamp-project-3/${this.state.src}`}
                                        alt="#"
                                    />
                                </div>
                                <ColorExtractor getColors={this.getColors}>
                                    <img
                                        className="savedImgDisplayNone"
                                        src={`https://cors-anywhere.herokuapp.com/https://s3-us-west-1.amazonaws.com/bootcamp-project-3/${this.state.src}`}
                                        alt="#"
                                    />
                                </ColorExtractor>
                            </>
                        ) : (
                                <div className="ternary">
                                    <p>Loading Image</p>
                                    <Icon type="loading" />
                                </div>
                            )}
                        <div
                            className="swatchContainer"
                            onClick={this.toggleOn}
                            data-toggle="none"
                        >
                            {this.state.colors.length ? (
                                this.colorSwatches()
                            ) : (
                                    <div className="ternary">
                                        <p>Extracting Colors</p>
                                        <Icon type="loading" />
                                    </div>
                                )}
                        </div>
                    </div>
                </Container>
                <Container>
                    <div className="flexList">
                        {this.state.photos ? (
                            this.state.photos.map((photo, i) => (
                                photo.display ? (
                                    <img
                                        className="savedList"
                                        onClick={this.imageClick}
                                        src={`https://s3-us-west-1.amazonaws.com/bootcamp-project-3/${photo.src}`}
                                        id={i}
                                        key={i}
                                        alt="#"
                                        display={photo.display.toString()}
                                    />
                                ) : (
                                        null
                                    )
                            ))
                        ) : (
                                <div className="ternary">
                                    <p>Loading Images</p>
                                    <Icon type="loading" />
                                </div>
                            )
                        }

                    </div>
                </Container>
            </Fragment>
        );
    }

}

export default Saved;