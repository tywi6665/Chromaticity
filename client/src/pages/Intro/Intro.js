import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as d3 from "d3";
import "./Intro.css";

class Intro extends Component {

    render() {
        return (
            <div className="div" id="div">
                <button className="button">
                    <Link onClick={() => this.animation.stop()} className="link" to={"/main"}>Click Me</Link>
                </button>
                <pre>
                    <canvas id="canvas"/>
                </pre>
            </div>
        )
    }

    componentDidMount() {
        this.animation();
    };

    animation() {

        //Creating the canvas
        const width = 600;
        const height = 600;
        
        const canvas = d3.select("div").append("canvas")
            .attr("id", "canvas")
            .attr("width", `${width}px`)
            .attr("height", `${height}px`)

        canvas.node().getContext("2d");

        //Point settings
        const numPoints = 7000;
        const pointWidth = 4;
        const pointMargin = 3;

        //Create set of points
        const points = createPoints(numPoints, pointWidth, width, height);

        //Layout functions that only take in a point argument
        const toGrid = (points) => gridLayout(points, pointWidth + pointMargin, width);
        const toSine = (points) => sineLayout(points, pointWidth + pointMargin, width, height);
        const toCosine = (points) => cosineLayout(points, pointWidth + pointMargin, width, height);
        const toTangent = (points) => tangentLayout(points, pointWidth + pointMargin, width, height);
        const toSpiral = (points) => spiralLayout(points, pointWidth + pointMargin, width, height);
        const toPhyllotaxis = (points) => phyllotaxisLayout(points, pointWidth + pointMargin, width /2, height /2);

        //Create an array to cycle through layouts
        const layouts = [toSine, toCosine, toPhyllotaxis, toSpiral, toPhyllotaxis, toGrid, toTangent];

        //Function to draw out each layout
        function draw() {
            const ctx = canvas.node().getContext("2d");
            ctx.save()

            //Erases the canvas
            ctx.clearRect(0, 0, width, height);

            //Renders each point as a rectangle
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                ctx.fillStyle = point.color;
                ctx.fillRect(point.x, point.y, pointWidth, pointWidth);
            }

            ctx.restore();
        }

        //Animation setup
        const duration = 1500;
        const ease = d3.easeCubic;
        let timer;
        let currLayout = 0;

        //Function to animate each layout
        function animate(layout) {
            //Stores source position
            points.forEach(point => {
                point.sx = point.x;
                point.sy = point.y;
            });

            //Get x and y position for each point
            layout(points);

            //Store destination position
            points.forEach(point => {
                point.tx = point.x;
                point.ty = point.y;
            });

            timer = d3.timer((elasped) => {
                //Compute elasped time for animation
                const t = Math.min(1, ease(elasped / duration));

                //Updates point positions
                points.forEach(point => {
                    point.x = point.sx * (1 - t) + point.tx * t;
                    point.y = point.sy * (1 - t) + point.ty * t;
                });

                //Update animation on screen
                draw();

                //If animation has concluded
                if (t === 1) {
                    //Stop timer
                    timer.stop();

                    //Update to use next layout
                    currLayout = (currLayout + 1) % layouts.length;

                    //Restart animation with new layout
                    animate(layouts[currLayout]);
                }
            });
        }

        //Function to genreate the points
        function createPoints(numPoints, pointWidth, width, height) {
            const colorScale = d3.scaleSequential(d3.interpolateRainbow)
                .domain([numPoints - 1, 0]);

            const points = d3.range(numPoints).map(id => ({
                id,
                color: colorScale(id)
            }));

            return randomLayout(points, pointWidth, width, height);
        }

        //Function to handle layout transitions
        function randomLayout(points, pointWidth, width, height) {
            points.forEach(point => {
                point.x = Math.random() * (width - pointWidth);
                point.y = Math.random() * (height - pointWidth);
            });

            return points;
        }

        //Function for grid layout
        function gridLayout(points, pointWidth, gridWidth) {
            const pointHeight = pointWidth;
            const pointsPerRow = Math.floor(gridWidth / pointWidth);

            points.forEach((point, i) => {
                point.x = pointWidth * (i % pointsPerRow);
                point.y = pointHeight * Math.floor(i / pointsPerRow);
            });

            return points;
        }

        //Function for sine layout
        function sineLayout(points, pointWidth, width, height) {
            const amplitude = 0.3 * (height / 2);
            const yOffset = height / 2;
            const periods = 3;
            const yScale = d3.scaleLinear()
                .domain([0, points.length -1])
                .range([0, periods * 2 * Math.PI]);

            points.forEach((point, i) => {
                point.x = (i / points.length) * (width - pointWidth);
                point.y = amplitude * Math.sin(yScale(i)) + yOffset;
            })

            return points;
        }

        //Function for cosine layout
        function cosineLayout(points, pointWidth, width, height) {
            const amplitude = 0.5 * (height / 2);
            const yOffset = height / 2;
            const periods = 10;
            const yScale = d3.scaleLinear()
                .domain([0, points.length -1])
                .range([0, periods * 2 * Math.PI / 2]);

            points.forEach((point, i) => {
                point.x = (i / points.length) * (width - pointWidth);
                point.y = amplitude * Math.cos(yScale(i)) + yOffset;
            })

            return points;
        }

        //Function for tangent layout
        function tangentLayout(points, pointWidth, width, height) {
            const amplitude = 0.5 * (height / 2);
            const yOffset = height / 2;
            const periods = 10;
            const yScale = d3.scaleLinear()
                .domain([0, points.length -1])
                .range([0, periods * 5 * Math.PI]);

            points.forEach((point, i) => {
                point.x = (i / points.length) * (width - pointWidth);
                point.y = amplitude * Math.tan(yScale(i)) + yOffset;
            })

            return points;
        }

        //Function for spiral layout
        function spiralLayout(points, pointWidth, width, height) {
            const xOffset = width / 2;
            const yOffset = height / 2;
            const periods = 20;
            const rScale = d3.scaleLinear()
                .domain([0, points.length -1])
                .range([0, Math.min(width / 2, height / 2) - pointWidth]);

            const thetaScale = d3.scaleLinear()
                .domain([0, points.length -1])
                .range([0, periods * 2 * Math.PI]);

            points.forEach((point, i) => {
                point.x = rScale(i) * Math.cos(thetaScale(i)) + xOffset;
                point.y = rScale(i) * Math.sin(thetaScale(i)) + yOffset;
            });

            return points;
        }

        //Function for phyllotaxis layout
        function phyllotaxisLayout(points, pointWidth, xOffset = 0, yOffset = 0, iOffset = 0) {
            const theta = Math.PI * (3 - Math.sqrt(5));
            const pointRadius = pointWidth / 2;

            points.forEach((point, i) => {
                const index = (i + iOffset) % points.length;
                const phylloX = pointRadius * Math.sqrt(index) * Math.cos(index * theta);
                const phylloY = pointRadius * Math.sqrt(index) * Math.sin(index * theta);

                point.x = xOffset + phylloX - pointRadius;
                point.y = yOffset + phylloY - pointRadius;
            });

            return points;
        }

        toGrid(points)
        draw();
        animate(layouts[currLayout]);
    }


}


export default Intro;

