'use babel';

import { Disposable, CompositeDisposable } from 'atom';

export default function getMoovConfig() {

  // { "hilton": {"name": "hilton hotel" },
  //   "newton": {"name", "newton hotel"}
  //   };

  let projectName = atom.project.getPaths()[0].split('/')[4],
    moovSettingsData = {};
    // create current project obj
    moovSettingsData[projectName] = {};

    // if project not present
    // else

  // if local storage Item not present
  if (!localStorage.getItem('moov-console:settings')) {

    localStorage.setItem('moov-console:settings', JSON.stringify(moovSettingsData));
    return moovSettingsData;
    // // console.log('moov console isn\'t stored', moovSettingsData)
    // for (let project of moovSettingsData.Projects) {
    //   // console.log(project);
    //   if (project.name === projectName) {
    //     // console.log('listed')
    //     return project;
    //   } else {
    //     // console.log('project not listed')
    //     let data = JSON.parse(localStorage.getItem('moov-console:settings'));
    //     data.Projects.push(projectObj);
    //     localStorage.setItem('moov-console:settings', JSON.stringify(data));
    //     return projectObj;
    //   }
    // }

  } else {
    // else local storage Item is present

    let projects = JSON.parse(localStorage.getItem('moov-console:settings'));

    if(projects[projectName]){
      return projects[projectName];
    }else{
      projects[projectName] = {};
      localStorage.setItem('moov-console:settings', JSON.stringify(projects));
    }

    // let projects = JSON.parse(localStorage.getItem('moov-console:settings')).Projects;
    // // console.log(projects)
    // if (projects.length === 0) {
    //   // console.log('equal to 0')
    //   let setProjName = JSON.parse(localStorage.getItem('moov-console:settings')).Projects.push(projectObj);
    //   localStorage.setItem('moov-console:settings', JSON.stringify(setProjName));
    //   return setProjName;
    // }
    // // console.log('moov console is stored')
    // for (let project of projects) {
    //   // console.log(project); // Will display contents of the object inside the array
    //   if (project.name === projectName) {
    //     // console.log('listed')
    //     return project;
    //   } else {
    //     // console.log('project not listed')
    //     let data = JSON.parse(localStorage.getItem('moov-console:settings'));
    //     data.Projects.push(projectObj);
    //     localStorage.setItem('moov-console:settings', JSON.stringify(data));
    //     return projectObj;
    //
    //   }
    // }
  }
}
