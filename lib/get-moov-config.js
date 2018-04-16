'use babel';

import { Disposable, CompositeDisposable } from 'atom';

export default function getMoovConfig() {

  let projectName = atom.project.getPaths()[0].split('/')[4],
    projectObj = {
      "name": projectName
    },
    moovSettingsData = {
      "localStorage-name": "moov-console:settings",
      "Projects": [projectObj]
    };


  if (!localStorage.getItem('moov-console:settings')) {

    localStorage.setItem('moov-console:settings', JSON.stringify(moovSettingsData));
    // console.log('moov console isn\'t stored', moovSettingsData)
    for (let project of moovSettingsData.Projects) {
      // console.log(project);
      if (project.name === projectName) {
        // console.log('listed')
        return project;
      } else {
        // console.log('project not listed')
        let data = JSON.parse(localStorage.getItem('moov-console:settings'));
        data.Projects.push(projectObj);
        localStorage.setItem('moov-console:settings', JSON.stringify(data));
        return projectObj;
      }
    }

  } else {

    let projects = JSON.parse(localStorage.getItem('moov-console:settings')).Projects;
    // console.log(projects)
    if (projects.length === 0) {
      // console.log('equal to 0')
      let setProjName = JSON.parse(localStorage.getItem('moov-console:settings')).Projects.push(projectObj);
      localStorage.setItem('moov-console:settings', JSON.stringify(setProjName));
      return setProjName;
    }
    // console.log('moov console is stored')
    for (let project of projects) {
      // console.log(project); // Will display contents of the object inside the array
      if (project.name === projectName) {
        // console.log('listed')
        return project;
      } else {
        // console.log('project not listed')
        let data = JSON.parse(localStorage.getItem('moov-console:settings'));
        data.Projects.push(projectObj);
        localStorage.setItem('moov-console:settings', JSON.stringify(data));
        return projectObj;

      }
    }
  }
}
