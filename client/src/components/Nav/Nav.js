import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Modal } from 'antd';
import "./Nav.css";

class Nav extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };
    };

    handleCancel = () => this.setState({ modal: false });

    render() {
        return (
            <nav className="nav">
                <ul>
                    <li><Link to={"/main"}>Color Wheel</Link></li>
                    <li><Link to={"/saved"}>Saved Images</Link></li>
                </ul>
                {/* <Icon
                    className="questionIcon"
                    type="question-circle"
                    onClick={() => this.setState({ modal: true })}
                />
                <Modal visible={this.state.modal} footer={null} onCancel={this.handleCancel}>
                    <p alt="example" style={{ width: '100%' }}>{this.props.helpModal}</p>
                </Modal> */}
            </nav>
        );
    };
};

export default Nav;