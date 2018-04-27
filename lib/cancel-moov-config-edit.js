'use babel';
/** @jsx etch.dom */

import { Disposable, CompositeDisposable } from 'atom';
import etch from 'etch';

export default function cancelEdit(event) {
  // reset
  this.editItem = "";
  // update this
  etch.update(this);
}
