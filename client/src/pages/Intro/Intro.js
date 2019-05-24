import React, { Component } from "react";
import * as d3 from "d3";
import "./Intro.css";

// class Intro extends Component {
function Canvas() {
    return (
        <div className="introDiv">
            <canvas id="canvas" />
        </div>
    );
};

function Intro(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                loading: true,
                width: window.innerWidth
            };

            this.updateDimensions = this.updateDimensions.bind(this);
        };

        render() {
            if (this.state.loading) return Canvas();
            return <WrappedComponent {...this.props} />
        };

        componentDidMount() {
            this.animation();
            window.addEventListener("resize", this.updateDimensions);
            setTimeout(() => {
                this.setState({
                    loading: false
                });
                d3.select("#canvas").remove();
            }, 5000)
        };

        updateDimensions() {
            this.setState({ width: window.innerWidth })
            this.animation()
        };

        componentWillUnmount() {
            window.removeEventListener("resize", this.updateDimensions);
        };

        animation() {
            var degreePerRadian = 180 / Math.PI;
            const width = 0.35 * this.state.width;
            const height = 0.35 * this.state.width;

            const canvas = d3.select("#canvas")
                .attr("width", `${width}px`)
                .attr("height", `${height}px`)
                .attr("transform", "rotate(0deg)");

            var context = canvas.node().getContext("2d");

            var bgImage = context.createImageData(width, height);

            var halfWidth = Math.floor(bgImage.width / 2);
            var halfHeight = Math.floor(bgImage.height / 2);

            var radius = Math.min(halfWidth, halfHeight);
            var radiusSquared = radius * radius;

            renderColorWheel(bgImage);

            context.clearRect(0, 0, width, height);
            context.putImageData(bgImage, 0, 0);

            function renderColorWheel(image) {
                var i, j;
                for (j = 0; j < image.height; j++) {
                    for (i = 0; i < image.width; i++) {
                        var x = i - halfWidth;
                        var y = j - halfHeight;

                        var distanceFromOriginSquared = x * x + y * y;
                        var withinDisc = (distanceFromOriginSquared <= radiusSquared);
                        if (withinDisc) {
                            var angleInDegrees = degreePerRadian * (Math.atan2(y, x) + Math.PI);
                            var distanceFromOrigin = Math.sqrt(distanceFromOriginSquared);



                            var color = d3.hsl(angleInDegrees, (distanceFromOrigin / radius), 0.5).rgb();
                            setPixelColor(image, i, j, color);
                        };
                    };
                };
            };

            function setPixelColor(image, x, y, color, alpha) {
                alpha = (alpha !== undefined ? alpha : 255);

                var numChannels = 4;
                var rowOffset = y * image.width * numChannels;
                var colOffset = x * numChannels;
                var pixelOffset = rowOffset + colOffset;

                image.data[pixelOffset + 0] = color.r;
                image.data[pixelOffset + 1] = color.g;
                image.data[pixelOffset + 2] = color.b;
                image.data[pixelOffset + 3] = alpha;

            };
        };
    };
};


export default Intro;

