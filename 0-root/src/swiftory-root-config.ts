import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructLayoutEngine,
  constructRoutes,
} from 'single-spa-layout';
import { HTMLLayoutData } from 'single-spa-layout/dist/types/isomorphic/constructRoutes';

const data: HTMLLayoutData = {
  props: {},
  loaders: {
    topNav: `<nav class="placeholder">ya LOAD</nav>`,
  },
};

const routes = constructRoutes(
  document.querySelector('#single-spa-layout') as HTMLTemplateElement,
  data
);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
