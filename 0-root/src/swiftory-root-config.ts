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
    folkloreLoader: `<div style="position:fixed;top:0;left:0;z-index:9999;width:100%;height:100%;background:#A7A7A7;"></div>`,
    loverLoader: `<div style="position:fixed;top:0;left:0;z-index:9999;width:100%;height:100%;background:hsl(318,23%,20%);"></div>`,
    reputationLoader: `<div style="position:fixed;top:0;left:0;z-index:9999;width:100%;height:100%;background:#fff;"></div>`,
    homepageLoader: `<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;"></div>`,
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
