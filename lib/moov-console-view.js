'use babel';
/** @jsx etch.dom */

import { Disposable, CompositeDisposable } from 'atom';
import etch from 'etch';
// Interacts with a bin executable
// to deploy to multiple projects at once
import autodeploy from './autodeploy';
// prints readme.md to Moovweb console, for additional project information
import readme from './read-me';
// get initial project data
import getMoovConfig from './get-moov-config';
// post item to project data
import postMoovConfigItem from './post-moov-config-item';
// remove item from project data
import removeMoovConfigItem from './remove-moov-config-item';

export default class MoovConsoleView {

  constructor(props) {
    this.props = props;
    this.projectConfig = getMoovConfig();
    this.deployLog = "";
    this.configKey = "";
    this.configVal = "";
    // initialize etch
    etch.initialize(this)
  }
  // Required: Update the component with new properties and children.
  update(props, children) {
    // perform custom update logic here...
    // then call `etch.update`, which is async and returns a promise
    return etch.update(this)
  }

  clearLog() {
    this.deployLog = "";
    return etch.update(this);
  }

  handleConfigKeyChange(e) {
    console.log("key changed:", e.target.value);
    this.configKey = e.target.value;
  }

  handleConfigValChange(e) {
    console.log("value changed:", e.target.value);
    this.configVal = e.target.value;
  }

  render() {

    let projs = this.projectConfig,
        projectConfigDivs = [];

    for (let key in projs) {
      // push key, value pairs to <div> element
      projectConfigDivs.push(<div key={key}>{ key }: <a href={projs[key]}>{ projs[key] } </a><button className="btn btn-remove" onClick={ removeMoovConfigItem.bind(this, key) }>x</button><br/></div>);
    }

    return <div className="moov-console-view padded">
              <div className="block">
                <a className="btn mv-consoleBtn" onClick={ readme }>Print README.md</a>
                <br/><br/>
                <a className="btn mv-consoleBtn" onClick={ autodeploy }>Create or Execute Autodeploy File</a>
                <br/><br/>
                { projectConfigDivs }
                <br/>
                <form onSubmit={ postMoovConfigItem.bind(this) } className="input-fields">
                  <b>Name</b>: <input type="text" value={ this.configKey } className="input-text native-key-bindings" onChange={ this.handleConfigKeyChange.bind(this) }/>
                  <b>Value</b>: <input type="text" value={ this.configVal } className="input-text native-key-bindings" onChange={ this.handleConfigValChange.bind(this) } /><br/>
                  <input type="submit" value="Save Project Moov Config" className="btn mv-consoleBtn" />
                </form>
              </div>
              <div className="section bordered">
                { this.deployLog }
              </div>
              <div className="block">
                <button className="btn mv-consoleBtn" onClick={ this.clearLog }>Clear Logs</button>
              </div>
           </div>;
  }
}
