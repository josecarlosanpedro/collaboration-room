import React, { Component } from "react";
import classnames from "classnames";
import { CompactPicker } from "react-color";
import firebase from "firebase";
import Collapse from "antd/lib/collapse";
import Select from "antd/lib/select";
import Slider from "antd/lib/slider";
import Icon from "antd/lib/icon";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Switch from "antd/lib/switch";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Upload from "antd/lib/upload";
import { SizeMe } from "react-sizeme";
import { SketchField, Tools } from "react-sketch";

const { Panel } = Collapse;
const { Option } = Select;

class ChalkBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lineWidth: 10,
      lineColor: "black",
      fillColor: "#68CCCA",
      backgroundColor: "transparent",
      shadowWidth: 0,
      shadowOffset: 0,
      tool: Tools.Pencil,
      enableRemoveSelected: false,
      fillWithColor: false,
      fillWithBackgroundColor: false,
      drawings: [],
      canUndo: false,
      canRedo: false,
      controlledSize: false,
      sketchWidth: 600,
      sketchHeight: 600,
      stretched: true,
      stretchedX: false,
      stretchedY: false,
      originX: "left",
      originY: "top",
      imageUrl: "",
      expandTools: false,
      expandControls: false,
      expandColors: false,
      expandBack: false,
      expandImages: false,
      expandControlled: false,
      text: "a text, cool!",
      enableCopyPaste: false,
      datafromFireBase: {},
      writer: ""
    };
  }
  conversationSuccess = data => {
    if (data.val() != null) {
      const drawing = data.val();
      this.setState({ datafromFireBase: drawing.data });
    }
  };
  conversationError = data => {
    console.log("error", data);
  };
  boardWritterSuccess = data => {
    if (data.val() != null) {
      const writer = data.val();
      console.log(writer.writerID, "writer.writerID");
      this.setState({ writer: writer.writerID });
    }
  };
  boardWritterError = data => {
    console.log("error", data);
  };
  componentDidMount = () => {
    var firebaseConfig = {
      apiKey: "AIzaSyCzNT7kATK_7XzUxD3RcyQmo7XoV7Kv-QM",
      authDomain: "ale-classroom.firebaseapp.com",
      databaseURL: "https://ale-classroom.firebaseio.com",
      projectId: "ale-classroom",
      storageBucket: "ale-classroom.appspot.com",
      messagingSenderId: "613210030267",
      appId: "1:613210030267:web:360fffe3a910f6ee4ce99e"
    };
    firebase.initializeApp(firebaseConfig);
    const urlParams = new URLSearchParams(window.location.search);
    const roomParam = urlParams.get("room");

    (function(console) {
      console.save = function(data, filename) {
        if (!data) {
          console.error("Console.save: No data");
          return;
        }
        if (!filename) filename = "console.json";
        if (typeof data === "object") {
          data = JSON.stringify(data, undefined, 4);
        }
        var blob = new Blob([data], { type: "text/json" }),
          e = document.createEvent("MouseEvents"),
          a = document.createElement("a");
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
        e.initMouseEvent(
          "click",
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
        a.dispatchEvent(e);
      };
    })(console);
    const conversation = firebase
      .database()
      .ref()
      .child(`board/${roomParam}`);
    conversation.on("value", this.conversationSuccess, this.conversationError);
    const boardwritting = firebase
      .database()
      .ref()
      .child(`boardwriter/${roomParam}`);
    boardwritting.on("value", this.boardWritterSuccess, this.boardWritterError);
  };

  _undo = () => {
    this._sketch.undo();
    this.setState({
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo()
    });
  };

  _redo = () => {
    this._sketch.redo();
    this.setState({
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo()
    });
  };

  _clear = () => {
    this._sketch.clear();
    this._sketch.setBackgroundFromDataUrl("");
    this.setState({
      controlledValue: null,
      backgroundColor: "transparent",
      fillWithBackgroundColor: false,
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo()
    });
  };

  handleChangePanel = key => {
    console.log("key", key);
  };

  handleChangeTool = key => {
    this.setState({
      tool: key,
      enableRemoveSelected: key === Tools.Select,
      enableCopyPaste: key === Tools.Select
    });
  };

  _save = () => {
    let drawings = this.state.drawings;
    drawings.push(this._sketch.toDataURL());
    this.setState({ drawings: drawings });
  };

  //dito mo lagay yung para sa firebase na pag realtime
  _download = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomParam = urlParams.get("room");
    let prev = this.state.canUndo;
    let now = this._sketch.canUndo();
    if (prev !== now) {
      this.setState({ canUndo: now });
    }

    const dataTopassToSocket = JSON.stringify(this._sketch.toJSON());
    setTimeout(function() {
      firebase
        .database()
        .ref()
        .child(`board/${roomParam}`)
        .set({
          data: dataTopassToSocket,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
          console.log("pass");
        });
    }, 100);
  };

  handleSlider = value => {
    this.setState({ lineWidth: value });
  };

  handleChangeSwitch = value => {
    this.setState({ fillWithColor: value });
  };

  _removeSelected = () => {
    this._sketch.removeSelected();
  };

  writingDown = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomParam = urlParams.get("room");
    const idParam = urlParams.get("id");
    firebase
      .database()
      .ref()
      .child(`boardwriter/${roomParam}`)
      .set({
        writerID: idParam,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        console.log("writing");
      });
  };

  writingUp = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomParam = urlParams.get("room");
    const idParam = urlParams.get("id");
    firebase
      .database()
      .ref()
      .child(`boardwriter/${roomParam}`)
      .set({
        writerID: "",
        timestamp: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        console.log("writing");
      });
  };

  handleChangeBackGround = info => {
    {
      let sketch = this._sketch;
      let reader = new FileReader();
      let { stretched, stretchedX, stretchedY, originX, originY } = this.state;
      console.log(info, "info");
      reader.addEventListener(
        "load",
        () =>
          sketch.setBackgroundFromDataUrl(reader.result, {
            stretched: stretched,
            stretchedX: stretchedX,
            stretchedY: stretchedY,
            originX: originX,
            originY: originY
          }),
        false
      );
      reader.readAsDataURL(info.file);
    }
  };

  uploadProps = {
    name: "file",
    accept: ".jpeg,.svg,.png,.jpg",
    customRequest: this.handleChangeBackGround,
    headers: {
      authorization: "authorization-text"
    },
    showUploadList: false
  };
  render() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    const {
      tool,
      lineWidth,
      lineColor,
      fillColor,
      fillWithColor,
      backgroundColor,
      enableRemoveSelected,
      enableCopyPaste,
      datafromFireBase
    } = this.state;
    console.log(
      this.state.writer == idParam || this.state.writer == "",
      'this.state.writer == idParam || this.state.writer == "" '
    );
    return (
      <SizeMe>
        {({ size }) => {
          const isBoardExceedWidth = size.width > 1026;
          const lgSize = [24, 24];
          const smSize = [19, 5];
          const colSize = isBoardExceedWidth ? smSize : lgSize;
          return (
            <div className="writing-board-section">
              <h1 className="title">
                <Icon type="edit" /> WRITING BOARD
              </h1>

              <Button
                className="round-btn"
                shape="circle"
                disabled={!this.state.canUndo}
                onClick={this._undo}
                icon="undo"
              />
              <Button
                className="round-btn"
                shape="circle"
                disabled={!this.state.canRedo}
                onClick={this._redo}
                icon="redo"
              />
              <Button
                className="round-btn"
                shape="circle"
                icon="close"
                onClick={this._clear}
              />
              <Button
                className="round-btn"
                shape="circle"
                icon="save"
                onClick={this._save}
              />

              <Row>
                <Col md={colSize[0]}>
                  <div
                    onMouseDown={this.writingDown}
                    onMouseUp={this.writingUp}
                    className={
                      this.state.writer == idParam || this.state.writer == ""
                        ? ""
                        : "board-disable"
                    }
                  >
                    <SketchField
                      width={850}
                      height={size.height}
                      tool={tool}
                      lineColor={lineColor}
                      disabled={true}
                      lineWidth={lineWidth}
                      fillColor={fillWithColor ? fillColor : "transparent"}
                      ref={c => {
                        this._sketch = c;
                      }}
                      value={datafromFireBase}
                      backgroundColor={backgroundColor}
                      onChange={this._download}
                    />
                  </div>
                </Col>

                <Col md={colSize[1]}>
                  <div className="action">
                    <Collapse onChange={this.handleChangePanel}>
                      <Panel header="Drawing Tools">
                        <Select
                          defaultValue="Pencil"
                          style={{ width: 120 }}
                          onChange={this.handleChangeTool}
                        >
                          <Option value={Tools.Select}>Select</Option>
                          <Option value={Tools.Pencil}>Pencil</Option>
                          <Option value={Tools.Rectangle}>Rectangle</Option>
                          <Option value={Tools.Line}>Line</Option>
                          <Option value={Tools.Circle}>Circle</Option>
                          <Option value={Tools.Pan}>Pan</Option>
                        </Select>

                        <Button
                          className="round-btn"
                          type="primary"
                          shape="circle"
                          icon="copy"
                          size="medium"
                          disabled={!enableCopyPaste}
                          onClick={e => {
                            this._sketch.copy();
                            this._sketch.paste();
                          }}
                        />

                        <Button
                          className="round-btn"
                          type="primary"
                          shape="circle"
                          icon="delete"
                          size="medium"
                          disabled={!enableRemoveSelected}
                          onClick={this._removeSelected}
                        />
                        <div className="_spacer-sm" />
                        <p>Size</p>
                        <Slider
                          defaultValue={lineWidth}
                          onChange={this.handleSlider}
                        />
                      </Panel>
                      <Panel header="Colors">
                        <p className="title">Line Color</p>
                        <CompactPicker
                          className={classnames({ "-sm": isBoardExceedWidth })}
                          id="lineColor"
                          color={lineColor}
                          onChange={color =>
                            this.setState({ lineColor: color.hex })
                          }
                        />
                        <div className="_spacer-sm" />
                        <p className="title">With Fill Color?</p>
                        <Switch onChange={this.handleChangeSwitch} />
                        <div className="_spacer-sm" />
                        <p className="title">Fill Color</p>
                        <CompactPicker
                          className={classnames({ "-sm": isBoardExceedWidth })}
                          id="fillColor"
                          size={isBoardExceedWidth ? 100 : null}
                          color={fillColor}
                          onChange={color =>
                            this.setState({ fillColor: color.hex })
                          }
                        />
                        <div className="_spacer-sm" />
                        <p className="title">Background Color</p>
                        <CompactPicker
                          className={classnames({ "-sm": isBoardExceedWidth })}
                          color={backgroundColor}
                          size={isBoardExceedWidth ? 100 : null}
                          onChange={color =>
                            this.setState({ backgroundColor: color.hex })
                          }
                        />
                      </Panel>
                      <Panel header="Image Tool">
                        <p>Add Image</p>
                        <Input
                          placeholder="Copy/Paste an image URL"
                          onChange={e =>
                            this.setState({ imageUrl: e.target.value })
                          }
                          value={this.state.imageUrl}
                        />
                        <div className="_spacer-sm" />
                        <Button
                          className="add-image-btn"
                          type="primary"
                          onClick={e => {
                            this._sketch.addImg(this.state.imageUrl);
                          }}
                        >
                          Load Image from URL
                        </Button>
                      </Panel>
                      <Panel header="Background">
                        <p>Change Background</p>

                        <div className="_spacer-sm" />
                        <Upload {...this.uploadProps}>
                          <Button className="add-image-btn" type="primary">
                            Load Image
                          </Button>
                        </Upload>
                      </Panel>
                    </Collapse>
                  </div>
                </Col>
              </Row>
            </div>
          );
        }}
      </SizeMe>
    );
  }
}

export default ChalkBoard;
