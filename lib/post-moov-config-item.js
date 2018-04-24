'use babel';
/** @jsx etch.dom */

import { Disposable, CompositeDisposable } from 'atom';
import etch from 'etch';
import MoovConsoleView from './moov-console-view';

export default function postMoovConfigItem(event) {

  let projectName = atom.project.getPaths()[0].split('/')[4],
    data = JSON.parse(localStorage.getItem('moov-console:settings'));


    // console.log(component.element.outerHTML) // ==> <div>Hello World!</div>
    // component.update({greeting: 'Salutations'})
    // console.log(component)
  // POST item
  data[projectName][this.configKey] = this.configVal;
  // update data
  localStorage.setItem('moov-console:settings', JSON.stringify(data));

  this.projectConfig = data[projectName];
  this.configKey = "";
  this.configVal = "";

  etch.update(this);
}
