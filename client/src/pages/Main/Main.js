import React, { Component } from "react";
// import API from "../../utils/API";
import Nav from "../../components/Nav";
import Container from "../../components/Container";
import Canvas from "../../components/Canvas";
import Card from "../../components/Card";
import { PhotoList } from "../../components/PhotoList";
import SubmitBtn from "../../components/SubmitBtn";
import "./Main.css";
const convert = require('color-convert');

class Main extends Component {

    state = {
        photos: [],
        hexSearch: "",
        hex: "",
        namedSearch: ""
    }

    componentDidMount() {
        const color = "fb3d71"
        this.loadPhotos(color);
    };

    loadPhotos = color => {
        fetch("api/shutterstock/" + color)
        .then(res => res.json())
        .then(res => this.setState({ photos: res.data }))
        .catch(err => console.log(err));
    }

    setColor = (color) => {
        this.setState({ hexSearch: color, hex: ("#" + color) })
        var namedColor = convert.hex.keyword(color);          
        console.log(namedColor);
        this.setState({ namedSearch: namedColor })
    }

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
            <div style={{backgroundColor: this.state.hex}}>
                <Nav />
                <Container className="mainContent">
                    <Canvas 
                        setColor={this.setColor}
                    />
                    <form className="form">
                        <h6>Hexidecimal Color Code</h6>
                        <Card 
                            value={this.state.hexSearch}
                            onChange={this.handleInputChange}
                            name="hexSearch"
                            placeholder="000000"
                        />
                        <h6>Closest Named Color</h6>
                        <Card 
                            value={this.state.namedSearch}
                            onChange={this.handleInputChange}
                            name="namedSearch"
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
                            {this.state.photos.map(photo => (
                                <div className="images" key={photo.id}>
                                    <img src={photo.assets.huge_thumb.url} alt={photo.description} />
                                </div>
                            ))}
                        </PhotoList>
                    </Container>
            </div>
        )
    }



}

export default Main;