'use babel';
/** @jsx etch.dom */

import { Disposable, CompositeDisposable } from 'atom';
import etch from 'etch';

export default class StatusBarMoovConsole {

  constructor(props) {
    this.props = props
    etch.initialize(this)
  }

  // Required: Update the component with new properties and children.
  update(props, children) {
    // perform custom update logic here...
    // then call `etch.update`, which is async and returns a promise
    return etch.update(this)
  }
  // listen for click on moov icon on status bar
  activateMoovConsole = () => {
      moovPanel = atom.workspace.getPanels('footer')[1];
      if(moovPanel.isVisible()){
        moovPanel.hide();
      }else{
        moovPanel.show()
      }
  }

  render() {
    return <div className="inline-block status-bar-moov-console" onClick={ this.activateMoovConsole }>
              <img src={ this.props.url } />
           </div>;
  }
}
