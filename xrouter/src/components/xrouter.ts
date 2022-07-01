import Component from '@glimmer/component';
import { inject } from '@ember/service';
import RouterService from '@ember/routing/router-service';

export default class extends Component {
  @inject declare router: RouterService;
}
