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
    this.state = {deployLog: "" }
    etch.initialize(this)
  }
  // Required: Update the component with new properties and children.
  update(props, children) {
    // perform custom update logic here...
    console.log(props)
    console.log(this)
    // then call `etch.update`, which is async and returns a promise
    return etch.update(this)
  }

  // changeTitle = (event) => {
  //   console.log(event)
  //   this.state = {deployLog: "New title"}
  //   return etch.update(this);
  // };
  //  works
  // <div onClick={this.changeTitle}>{this.state.title}</div>

  // <a id="moov-clean" className="btn" onClick={ (e) => moovclean() }>Moov Clean</a>
// <div onClick={moovclean}>Deploy</div>




  render() {
    return <div className="moov-console-view padded">
              <div className="block">
                <a id="moov-clean" className="btn" onClick={ moovclean }>Moov Clean </a>
                <br/><br/>
                <a id="execute-autodeploy" className="btn" onClick={ autodeploy }>Create or Execute Autodeploy File</a>
                <br/><br/>
                <img src="https://www.moovweb.com/wp-content/themes/EPIC-child/images/logo-white.svg" className="console-panel"/>
              </div>
              <div className="section bordered">
                { this.state.deployLog }
              </div>
              <div className="block">

              </div>
           </div>;
  }
}
