import React, { Component } from "react";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import Container from "../../components/Container";
import Canvas from "../../components/Canvas";
import Card from "../../components/Card";
import { PhotoList, Item } from "../../components/PhotoList";
import SubmitBtn from "../../components/SubmitBtn";
import "./Main.css";
const convert = require('color-convert');

class Main extends Component {

    state = {
        photos: [],
        hexSearch: "",
        hex: "#000000",
        rgb: "0, 0, 0",
        namedSearch: "",
        navModal: {
            title: "It's time to delve into the world of color!",
            pagePurpose: "Here you are presented with an color wheel, the likes of which would make skittles jealous. The purpose behind it and its interactivity is to make finding stock images of a particular color easier. ",
            pageDirections: "Upon clicking anywhere on the color wheel, the form fields below it will be auto-filled with the color information of the clicked pixel. Hit the submit button, and then peruse the stock images that match your desired color."
        }
    }

    componentDidMount() {
        const color = "000000"
        this.loadPhotos(color);
    };

    loadPhotos = color => {
        API.getPhotos(color)
            .then(res => this.setState({ photos: res.data.data }))
            .catch(err => console.log(err));
    };

    setColor = (color) => {
        var namedColor = convert.hex.keyword(color.hex);
        this.setState({ hexSearch: color.hex, hex: ("#" + color.hex), rgb: color.rgb, namedSearch: namedColor })
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.hexSearch) {
            this.loadPhotos(this.state.hexSearch)
        }
    };

    render() {
        return (
            <div style={{ backgroundColor: this.state.hex }}>
                <Nav
                    helpModal={this.state.navModal}
                />
                <Container>
                    <Canvas
                        setColor={this.setColor}
                    />
                    <form className="form">
                        <Card
                            value={this.state.hexSearch}
                            onChange={this.handleInputChange}
                            name="hexSearch"
                            label="Hexidecimal Color Code"
                            placeholder="000000"
                        />
                        <Card
                            value={this.state.rgb}
                            onChange={this.handleInputChange}
                            name="rgb"
                            label="RGB Color"
                            placeholder="0, 0, 0"
                        />
                        <Card
                            value={this.state.namedSearch}
                            onChange={this.handleInputChange}
                            name="namedSearch"
                            label="Closest Named Color"
                            placeholder="black"
                        />
                        <SubmitBtn
                            disabled={!(this.state.hexSearch)}
                            onClick={this.handleFormSubmit}
                        />
                    </form>
                </Container>
                <Container>
                    <PhotoList>
                        {this.state.photos.length ? (
                        this.state.photos.map(photo => (
                            <Item
                                id={photo.id}
                                key={photo.id}
                                thumbnail={photo.assets.huge_thumb.url}
                                description={photo.description}
                            >
                            </Item>
                        ))) : (
                            <p>Retrieving Photos</p>
                        )}
                    </PhotoList>
                </Container>
            </div>
        )
    }

}

export default Main;