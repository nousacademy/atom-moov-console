'use babel';
/** @jsx etch.dom */

import { Disposable, CompositeDisposable } from 'atom';
import etch from 'etch';

export default function saveEdit(key, event) {
  let projectName = atom.project.getPaths()[0].split('/')[4],
    data = JSON.parse(localStorage.getItem('moov-console:settings'));

  // POST item
  data[projectName][this.configKey] = this.configVal;
  // update data
  localStorage.setItem('moov-console:settings', JSON.stringify(data));

  this.projectConfig = data[projectName];
  this.configKey = "";
  this.configVal = "";
  this.editItem = "";
  // update this
  etch.update(this);
}
