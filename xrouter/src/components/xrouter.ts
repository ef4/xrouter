import Component from '@glimmer/component';
export default class extends Component {
  get message() {
    return window.location.href;
  }
}
