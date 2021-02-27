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
    homepageLoader: `<nav class="placeholder">ya LOAD</nav>`,
    jukeboxLoader: `<div class="placeholder">ya LOAD le jukebox</div>`,
  },
  errors: {
    pageError: "<h3>hmm, this page didn't load right</h3>",
    jukeboxError: '<h5>the jukebox is unavailable right now</h5>',
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
