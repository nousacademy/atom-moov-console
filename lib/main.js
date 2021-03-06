'use babel';

import { Disposable, CompositeDisposable } from 'atom';
import fs from 'fs';
import StatusBarMoovConsole from './status-bar-moov-console';
import MoovConsoleView from './moov-console-view';
// import test from  'fs-plus'


export default {

  consumeStatusBar(statusBar) {

    // rootPath = atom.project.repositories[0].repo._getWorkingDirectory();
    // atom.workspace.getActiveTextEditor()


    // console.log(test)
    // check if its a moov project
    if (atom.project.rootDirectories[0].lowerCasePath.match(/moovwebprojects/)) {

      // add Moov icon in bottom left of editor
      statusBar.addLeftTile({
        item: new StatusBarMoovConsole({
          url: 'http://moovweb.com/wp-content/uploads/2018/01/moovweb-favicon.png'
        }),
        priority: 100
      });
      // add panel in footer
      atom.workspace.addFooterPanel({
        item: new MoovConsoleView()
      }).hide();

    }
  },
  handleClick() {
    // alert('click handled');
    // const clickHandler = () => atom.commands.dispatch(atom.views.getView(atom.workspace.getActiveTextEditor()), 'moov_console');
    // this.element.addEventListener('click', clickHandler);
    // return this.clickSubscription = new Disposable(() => this.element.removeEventListener('click', clickHandler));

  },

  deactivate() {
    // this.modalPanel.destroy();
    // this.subscriptions.dispose();
    // this.myPackageView.destroy();
  },

  serialize() {
    // return {
    //   myPackageViewState: this.myPackageView.serialize()
    // };
  },

  toggle() {
    // console.log('MyPackage was toggled!');
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
  }

};
