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
// edit item from project data
import editMoovConfigItem from './edit-moov-config-item';
// save edited project data item
import saveMoovConfigEdit from './save-moov-config-edit';
// save edited project data item
import cancelMoovConfigEdit from './cancel-moov-config-edit';

export default class MoovConsoleView {

  constructor(props) {
    this.props = props;
    this.projectConfig = getMoovConfig();
    this.deployLog = "";
    this.configKey = "";
    this.configVal = "";
    this.editItem = "";
    // html entity for plus sign
    this.dataFieldsBtnText = "&#x0002B;";
    this.dataFieldOpen = "none";
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
    // console.log("key changed:", e.target.value);
    this.configKey = e.target.value;
  }

  handleConfigValChange(e) {
    // console.log("value changed:", e.target.value);
    this.configVal = e.target.value;
  }

  dataFields(e){
    // toggle data fields form,
    // boolean wasnt updating
    // so just used a string instead
     if(this.dataFieldOpen === "none"){
       this.dataFieldOpen = "block";
       this.dataFieldsBtnText = "&#x02212;";
     }else{
       this.dataFieldOpen = "none";
       this.dataFieldsBtnText = "&#x0002B;";
     }
     // console.log("is data field open",this.dataFieldOpen)
     // update this
     etch.update(this);
  }

  render() {

    let projs = this.projectConfig,
        projectConfigDivs = [];

    for (let key in projs) {
      let itemToEdit = this.editItem === projs[key];
      if(itemToEdit){
        this.configKey = key;
        this.configVal = projs[key];
      }

      let configData = itemToEdit ? ( <div>
                                        <b>Name</b>: <input type="text" value={ key } onChange={ this.handleConfigKeyChange.bind(this) } className="input-text native-key-bindings" /><br/>
                                        <b>Value</b>: <input type="text" value={ projs[key] } onChange={ this.handleConfigValChange.bind(this) } className="input-text native-key-bindings" />
                                        <button className="btn btn-save" onClick={ saveMoovConfigEdit.bind(this) }><span>&#10004;</span></button>
                                        <button className="btn btn-cancel" onClick={ cancelMoovConfigEdit.bind(this) }><span>&#10008;</span></button>
                                      </div> ) : (
                                      <div>
                                        {key}: <a href={projs[key]}>{ projs[key] } </a>
                                        <button className="btn btn-edit" onClick={ editMoovConfigItem.bind(this, key) } title="Edit Data Entry"><span>&#9998;</span></button>
                                        &nbsp;
                                        <button className="btn btn-remove" onClick={ removeMoovConfigItem.bind(this, key) } title="Remove Data Entry"><span>&#10008;</span></button>
                                      </div>
                                  );
      // push key, value pairs to <projectConfigDivs> element
      projectConfigDivs.push(<div key={key}> { configData } <br/> </div>);
    }

    return <div className="moov-console-view padded">
              <div className="block">
                <a className="btn mv-consoleBtn" onClick={ readme }>Print README.md</a>
                <br/><br/>
                { projectConfigDivs }
                <br/>
                <button className="btn mv-consoleBtn btn-clear" onClick={ this.clearLog }>Clear Logs</button>
                <br/>
                <br/>
                <button className="btn open-data-fieds" onClick={ this.dataFields.bind(this) } title="Add Config Data to Project" innerHTML={ this.dataFieldsBtnText }></button>
                <form onSubmit={ postMoovConfigItem.bind(this) } className="form-container input-fields" style={{display: this.dataFieldOpen}}>
                  <b>Name</b>: <input type="text" value={ this.configKey } className="input-text native-key-bindings" onChange={ this.handleConfigKeyChange.bind(this) }/>
                  <b>Value</b>: <input type="text" value={ this.configVal } className="input-text native-key-bindings" onChange={ this.handleConfigValChange.bind(this) } /><br/>
                  <input type="submit" value="Save Project Moov Config" className="btn mv-consoleBtn save-config" />
                </form>
              </div>
              <div className="section bordered">
                { this.deployLog }
              </div>
              <div className="block">
                <br/><br/>
                <button className="btn mv-consoleBtn deploy" onClick={ autodeploy }>Create or Execute Autodeploy File</button>

              </div>
           </div>;
  }
}
