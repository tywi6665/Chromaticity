import React, { Component } from "react";
import "./Canvas.css";
import * as d3 from "d3";

class Canvas extends Component {
   state = {
       hexSearch: ""
   } 

   that=this;
    render() {
        
        return (
            <pre>
                <canvas onClick={() => this.props.setColor(this.state.hexSearch)} className="canvas u-full-width" id="canvas1"/>
            </pre>
        )

    }

    componentDidMount() {
        this.ColorWheel();
        var self = this;
        var canvas = document.getElementById("canvas1");

        function getElementPosition(obj) {
            var left = 0, top = 0;
            if (obj.offsetParent) {
                do {
                    left += obj.offsetLeft;
                    top += obj.offsetTop;
                } while (obj = obj.offsetParent);
                return { x: left, y: top };
            }
            return undefined;
        }

        function getEventLocation(element, event) {
            var pos = getElementPosition(element);

            return {
                x: (event.pageX - pos.x),
                y: (event.pageY - pos.y)
            };
        }

        function rgbToHex(r, g, b) {
            if (r > 255 || g > 255 || b > 255)
                throw "Invalid color component";
            return ((r << 16) | (g << 8) | b).toString(16);
        }

        canvas.addEventListener("mousemove", function (err) {
            var eventLocation = getEventLocation(this, err);

            var context = this.getContext('2d');
            var pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;

            var hex = ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
            console.log(hex)
            self.setState({ hexSearch: hex });
        });

    };

    ColorWheel() {

        var degreePerRadian = 180 / Math.PI;
        const width = 700;
        const height = 700;
        
        const canvas = d3.select("canvas")
            .attr("width", `${width}px`)
            .attr("height", `${height}px`)
        
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
                    }
                }
            }
        }

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
        }

    };

}

export default Canvas;