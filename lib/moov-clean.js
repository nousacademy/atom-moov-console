'use babel';

import { Disposable, CompositeDisposable } from 'atom';
import etch from 'etch';
// import { exec } from 'child_process';

export default function moovclean(){
  // rootPath = atom.project.repositories[0].repo._getWorkingDirectory();
  this.state = {title: "New title", title:'successss'}
  return etch.update(this);
}
