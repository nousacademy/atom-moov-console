'use babel';
/** @jsx etch.dom */

import { Disposable, CompositeDisposable } from 'atom';
import etch from 'etch';
// autodeploy file
import autodeploy from './autodeploy';


export default class MoovConsoleView {

  rootPath = atom.project.repositories[0].repo._getWorkingDirectory();

  constructor(props) {
    this.props = props
    // this.state = { flipped: null };
    etch.initialize(this)
  }
  // Required: Update the component with new properties and children.
  update(props, children) {
    // perform custom update logic here...
    // then call `etch.update`, which is async and returns a promise
    return etch.update(this)
  }

  mouseOut() {
     console.log("Mouse out!!!");
     // this.setState({flipped: false});
   }

   mouseOver() {
     console.log("Mouse over!!!");
     // this.setState({flipped: true});
   }

  render() {
    return <div className="moov-console-view padded">
              <div className="pull-left">
                <img src="https://www.moovweb.com/wp-content/themes/EPIC-child/images/logo-white.svg" className="console-panel"/>
                <h3>Project Controls</h3>
              </div>
              <div className="pull-center">
                  tessstttiiinnnggg
              </div>
              <div className="pull-right">

                <a id="moov-clean" className="btn" onMouseOut={() => this.mouseOut()} onMouseOver={() => this.mouseOver()}>Moov Clean</a>
                <br/><br/>
                <a id={ this.props.autodeploy } className="btn" onClick={ (e) => autodeploy( this.props.autodeploy ) }>{ this.props.text } Autodeploy File</a>
              </div>
           </div>;
  }
}
