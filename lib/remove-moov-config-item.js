'use babel';
/** @jsx etch.dom */

import { Disposable, CompositeDisposable } from 'atom';
import etch from 'etch';

export default function removeMoovConfigItem(key, event) {
  let projectName = atom.project.getPaths()[0].split('/')[4],
      data = JSON.parse( localStorage.getItem('moov-console:settings') );
      // delete item
      delete data[projectName][key];
      // set new storage object
      localStorage.setItem('moov-console:settings', JSON.stringify(data));
      // update projectConfig
      this.projectConfig = data[projectName];
      // update this
      etch.update(this);
}
