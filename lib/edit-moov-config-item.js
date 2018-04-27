'use babel';
/** @jsx etch.dom */

import { Disposable, CompositeDisposable } from 'atom';
import etch from 'etch';

export default function editItem(key, event) {
  let projectName = atom.project.getPaths()[0].split('/')[4],
    data = JSON.parse(localStorage.getItem('moov-console:settings'));

  this.editItem = data[projectName][key];
  // update this
  etch.update(this);
}
