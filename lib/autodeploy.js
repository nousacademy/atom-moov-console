'use babel';

import { Disposable, CompositeDisposable } from 'atom';
import { exec } from 'child_process';
import fs from 'fs';

export default function autodeploy(str){

  rootPath = atom.project.repositories[0].repo._getWorkingDirectory();

  if(str === "execute-autodeploy"){
    // Execute autodeploy file
    // not able to pipe commands at the time this was made
    // https://github.com/atom/atom/issues/1729
    exec(`cd ${rootPath} && autodeploy --key`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  }else{
      // CREATE autodeploy file
      // default autodeploy_config.json
      autoDeployDefault = {
        "staging": {},
        "production" : []
      }
      // read moov config file
      fs.readFile(`${rootPath}moov_config.json`, 'utf8', (err, data) => {
        var jsonData = JSON.parse(data);
        autoDeployDefault.staging[rootPath] = jsonData.host_map;
        autoDeployDefault.production = jsonData.host_map;
        // write file
        fs.writeFile(`${rootPath}autodeploy_config.json`, JSON.stringify(autoDeployDefault), (error) => { console.log(err); });
      });

  }
}
