'use babel';
/** @jsx etch.dom */

import { Disposable, CompositeDisposable } from 'atom';
import etch from 'etch';
import fs from 'fs';

export default function readme(){
  rootPath = atom.project.repositories[0].repo._getWorkingDirectory();
  fs.readFile(`${rootPath}README.md`, 'utf8', (err, data) => {
    if (!err) {
      this.deployLog = data;
      // update this
      etch.update(this);
    }
  });
}
