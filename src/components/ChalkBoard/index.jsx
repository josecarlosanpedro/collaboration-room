import React, { Component } from 'react';
import { SizeMe } from 'react-sizeme';
import Icon from 'antd/lib/icon';
import { data } from './tools/test.data';
import { SketchField, Tools } from 'react-sketch';

/**
 * Helper function to manually fire an event
 *
 * @param el the element
 * @param etype the event type
 */
function eventFire(el, etype) {
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

class ChalkBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lineWidth: 10,
      lineColor: 'black',
      fillColor: '#68CCCA',
      backgroundColor: 'transparent',
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
      originX: 'left',
      originY: 'top',
      imageUrl: 'https://files.gamebanana.com/img/ico/sprays/4ea2f4dad8d6f.png',
      expandTools: false,
      expandControls: false,
      expandColors: false,
      expandBack: false,
      expandImages: false,
      expandControlled: false,
      text: 'a text, cool!',
      enableCopyPaste: false,
    };
  }

  componentDidMount = () => {
    (function(console) {
      console.save = function(data, filename) {
        if (!data) {
          console.error('Console.save: No data');
          return;
        }
        if (!filename) filename = 'console.json';
        if (typeof data === 'object') {
          data = JSON.stringify(data, undefined, 4);
        }
        var blob = new Blob([data], { type: 'text/json' }),
          e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initMouseEvent(
          'click',
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
          null,
        );
        a.dispatchEvent(e);
      };
    })(console);
  };

  _undo = () => {
    this._sketch.undo();
    this.setState({
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo(),
    });
  };

  handleClickPencil = e => {
    e.preventDefault();
    this.setState({
      tool: Tools.Pencil,
    });
  };

  handleClickRectangle = e => {
    e.preventDefault();
    this.setState({
      tool: Tools.Rectangle,
    });
  };

  _save = () => {
    let drawings = this.state.drawings;
    drawings.push(this._sketch.toDataURL());
    console.log('this._sketch.toDataURL()', this._sketch.toJSON());
    this.setState({ drawings: drawings });
  };

  _download = () => {
    // console.save(this._sketch.toDataURL(), 'toDataURL.txt');
    console.log(JSON.stringify(this._sketch.toJSON()), 'toDataJSON.txt');

    /*eslint-enable no-console*/
  };

  render() {
    const { tool } = this.state;
    return (
      <SizeMe>
        {({ size }) => (
          <section className="writing-board-section">
            <h1 className="title">
              <Icon type="edit" /> WRITING BOARD
              <>
                <SketchField
                  width={size.width * 0.98}
                  height={size.height}
                  tool={tool}
                  lineColor="black"
                  lineWidth={3}
                  ref={c => {
                    this._sketch = c;
                  }}
                  value={data}
                  onChange={this._download}
                />
                <button onClick={this.handleClickPencil}>pencil</button>
                <button onClick={this.handleClickRectangle}>rectangle</button>
                <button onClick={this._undo}>Undo</button>
                <button onClick={this._save}>Save</button>
                {/* <a href="javascript:;" onClick={this._download}>
                  Download
                </a> */}
              </>
            </h1>
          </section>
        )}
      </SizeMe>
    );
  }
}

export default ChalkBoard;
