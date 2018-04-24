'use babel';
/** @jsx etch.dom */

import { Disposable, CompositeDisposable } from 'atom';
import etch from 'etch';

export default function removeMoovConfigItem(key, event) {
  let projectName = atom.project.getPaths()[0].split('/')[4],
      data = JSON.parse( localStorage.getItem('moov-console:settings') );

      delete data[projectName][key];
      // console.log(data[projectName][index])
      localStorage.setItem('moov-console:settings', JSON.stringify(data));
      // console.log(data)
      this.projectConfig = data[projectName];
      // this.index = 0;
      // console.log(this.projectConfig)
      etch.update(this);
}
