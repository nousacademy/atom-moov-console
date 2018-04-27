'use babel';

import { Disposable, CompositeDisposable } from 'atom';

export default function getMoovConfig() {

  let projectName = atom.project.getPaths()[0].split('/')[4],
    moovSettingsData = {};

  // create current project obj
  moovSettingsData[projectName] = {};

  // if local storage Item not present
  if (!localStorage.getItem('moov-console:settings')) {

    localStorage.setItem('moov-console:settings', JSON.stringify(moovSettingsData));
    return moovSettingsData;

  } else {
    // else local storage Item isn't present

    let projects = JSON.parse(localStorage.getItem('moov-console:settings'));

    if (projects[projectName]) {
      return projects[projectName];

    } else {
      projects[projectName] = {};
      localStorage.setItem('moov-console:settings', JSON.stringify(projects));
    }

  }

}
