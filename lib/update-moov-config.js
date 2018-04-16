'use babel';
/** @jsx etch.dom */

import { Disposable, CompositeDisposable } from 'atom';
import etch from 'etch';

export default function updateMoovConfig(event) {

  let projectName = atom.project.getPaths()[0].split('/')[4],
      data = JSON.parse(localStorage.getItem('moov-console:settings'));

  for (let project of data.Projects) {
    // console.log(project); // Will display contents of the object inside the array
    if (project.name === projectName) {
      project[this.configKey] = this.configVal;
      localStorage.setItem('moov-console:settings', JSON.stringify(data));
      console.log(data)
      this.projectConfig = project;
      this.configKey = "";
      this.configVal = "";
      // update this
      etch.update(this);
    }
  }
}
