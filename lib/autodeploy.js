'use babel';
/** @jsx etch.dom */

import { Disposable, CompositeDisposable } from 'atom';
import etch from 'etch';
import { exec } from 'child_process';
import fs from 'fs';

export default function autodeploy() {

  rootPath = atom.project.repositories[0].repo._getWorkingDirectory();

  // check if autodeploy file exist <else> create it
  fs.readFile(`${rootPath}autodeploy_config.json`, 'utf8', (err, data) => {
    if (!err) {
      // Execute autodeploy file
      // not able to pipe commands at the time this was made
      // https://github.com/atom/atom/issues/1729
      exec(`cd ${rootPath} && autodeploy --key`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }

        this.deployLog = stdout;
        // update this
        etch.update(this);
      });
    } else {
      // CREATE autodeploy file
      var createADfile = (data) => {
        var jsonData = JSON.parse(data);
        autoDeployDefault.staging[rootPath] = jsonData.host_map;
        autoDeployDefault.production = jsonData.host_map;
        // write file
        fs.writeFile(`${rootPath}autodeploy_config.json`, JSON.stringify(autoDeployDefault), (error) => {
          console.log(error);
        });

        this.deployLog = "autodeploy_config.json file has been created.";
        etch.update(this);
      }
      // default autodeploy_config.json
      autoDeployDefault = {
        "staging": {},
        "production": []
      }
      // read moov config file
      fs.readFile(`${rootPath}moov_config.json`, 'utf8', (err, data) => {
        if (err) {
          // for tritium projects
          fs.readFile(`${rootPath}config.json`, 'utf8', (err, data) => {
            createADfile(data);
          });
        } else {
          createADfile(data);
        }
      });
    }
  });

}
