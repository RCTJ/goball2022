'use babel';

import Goball2022View from './goball2022-view';
import { CompositeDisposable } from 'atom';

export default {

  goball2022View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.goball2022View = new Goball2022View(state.goball2022ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.goball2022View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'goball2022:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.goball2022View.destroy();
  },

  serialize() {
    return {
      goball2022ViewState: this.goball2022View.serialize()
    };
  },

  toggle() {
    console.log('Goball2022 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
