'use babel';
/** @jsx etch.dom */

import { Disposable, CompositeDisposable } from 'atom';
import etch from 'etch';

export default function removeMoovConfigItem(index, event) {
  let getByKey = Object.keys( this.projectConfig ),
      projectName = atom.project.getPaths()[0].split('/')[4],
      data = JSON.parse(localStorage.getItem('moov-console:settings'));

  for (let project of data.Projects) {
    if (project.name === projectName) {
      delete project[getByKey[index - 1]];
      // update storage
      localStorage.setItem('moov-console:settings', JSON.stringify(data));
      this.projectConfig = project;
      // update this
      etch.update(this);
    }
  }

}
