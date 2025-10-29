import navConfig from './nav.config';
import langs from './i18n/route';

const LOAD_MAP = {
  'zh-CN': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/zh-CN/${name}.vue`)),
      'zh-CN');
  },
  'en-US': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/en-US/${name}.vue`)),
      'en-US');
  },
  'es': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/es/${name}.vue`)),
      'es');
  },
  'fr-FR': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/fr-FR/${name}.vue`)),
      'fr-FR');
  }
};

const load = function (lang, path) {
  return LOAD_MAP[lang](path);
};

const LOAD_DOCS_MAP = {
  'zh-CN': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/zh-CN${path}.md`)),
      'zh-CN');
  },
  'en-US': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/en-US${path}.md`)),
      'en-US');
  },
  'es': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/es${path}.md`)),
      'es');
  },
  'fr-FR': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/fr-FR${path}.md`)),
      'fr-FR');
  }
};

const loadDocs = function (lang, path) {
  return LOAD_DOCS_MAP[lang](path);
};

const registerRoute = (navConfig) => {
  let route = [];
  Object.keys(navConfig).forEach((lang, index) => {
    let navs = navConfig[lang];
    route.push({
      path: `/${lang}/component`,
      redirect: `/${lang}/component/installation`,
      component: load(lang, 'component'),
      children: []
    });
    navs.forEach(nav => {
      if (nav.href) return;
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(nav => {
            addRoute(nav, lang, index);
          });
        });
      } else if (nav.children) {
        nav.children.forEach(nav => {
          addRoute(nav, lang, index);
        });
      } else {
        addRoute(nav, lang, index);
      }
    });
  });
  function addRoute(page, lang, index) {
    const component = page.path === '/changelog'
      ? load(lang, 'changelog')
      : loadDocs(lang, page.path);
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: 'component-' + lang + (page.title || page.name),
      component: component.default || component
    };

    route[index].children.push(child);
  }

  return route;
};

let route = registerRoute(navConfig);

const generateMiscRoutes = function (lang) {
  let guideRoute = {
    path: `/${lang}/guide`, // 指南
    redirect: `/${lang}/guide/design`,
    component: load(lang, 'guide'),
    children: [{
      path: 'design', // 设计原则
      name: 'guide-design' + lang,
      meta: { lang },
      component: load(lang, 'design')
    }, {
      path: 'nav', // 导航
      name: 'guide-nav' + lang,
      meta: { lang },
      component: load(lang, 'nav')
    }]
  };

  let themeRoute = {
    path: `/${lang}/theme`,
    component: load(lang, 'theme-nav'),
    children: [
      {
        path: '/', // 主题管理
        name: 'theme' + lang,
        meta: { lang },
        component: load(lang, 'theme')
      },
      {
        path: 'preview', // 主题预览编辑
        name: 'theme-preview-' + lang,
        meta: { lang },
        component: load(lang, 'theme-preview')
      }]
  };

  let resourceRoute = {
    path: `/${lang}/resource`, // 资源
    meta: { lang },
    name: 'resource' + lang,
    component: load(lang, 'resource')
  };

  let utilRoute = {
    path: `/${lang}/util`, // 工具函数
    redirect: `/${lang}/util/util-http`,
    component: load(lang, 'util'),
    children: [
      {
        path: 'util-http',
        name: 'util-http-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-http')
      },
      {
        path: 'util-http-loading',
        name: 'util-http-loading-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-http-loading')
      },
      {
        path: 'util-http-get',
        name: 'util-http-get-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-http-get')
      },
      {
        path: 'util-http-post',
        name: 'util-http-post-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-http-post')
      },
      {
        path: 'util-http-export',
        name: 'util-http-export-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-http-export')
      },
      {
        path: 'util-http-dao',
        name: 'util-http-dao-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-http-dao')
      },
      {
        path: 'util-http-remote',
        name: 'util-http-remote-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-http-remote')
      },
      {
        path: 'util-http-table',
        name: 'util-http-table-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-http-table')
      },
      {
        path: 'v-auth',
        name: 'v-auth-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/v-auth')
      },
      {
        path: 'v-debounce',
        name: 'v-debounce-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/v-debounce')
      },
      {
        path: 'v-throttle',
        name: 'v-throttle-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/v-throttle')
      },
      {
        path: 'v-copy',
        name: 'v-copy-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/v-copy')
      },
      {
        path: 'v-longpress',
        name: 'v-longpress-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/v-longpress')
      },
      {
        path: 'v-draggable',
        name: 'v-draggable-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/v-draggable')
      },
      {
        path: 'util-popup',
        name: 'util-popup-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-popup')
      },
      {
        path: 'util-tools',
        name: 'util-tools-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-tools')
      },
      {
        path: 'util-tools-core',
        name: 'util-tools-core-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-tools-core')
      },
      {
        path: 'util-tools-datetime',
        name: 'util-tools-datetime-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-tools-datetime')
      },
      {
        path: 'util-tools-url',
        name: 'util-tools-url-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-tools-url')
      },
      {
        path: 'util-tools-dom',
        name: 'util-tools-dom-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-tools-dom')
      },
      {
        path: 'util-tools-env',
        name: 'util-tools-env-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-tools-env')
      },
      {
        path: 'util-tools-validate',
        name: 'util-tools-validate-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-tools-validate')
      },
      {
        path: 'util-tools-file',
        name: 'util-tools-file-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-tools-file')
      },
      {
        path: 'util-tools-format',
        name: 'util-tools-format-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-tools-format')
      },
      {
        path: 'util-tools-storage',
        name: 'util-tools-storage-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-tools-storage')
      },
      {
        path: 'util-tools-security',
        name: 'util-tools-security-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/util-tools-security')
      }
    ]
  };

  let chartsRoute = {
    path: `/${lang}/charts`, // 图表
    meta: { lang },
    name: 'charts' + lang,
    component: load(lang, 'charts'),
    redirect: `/${lang}/charts/bar`,
    children: [
      {
        path: 'bar',
        name: 'charts-bar-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/charts-bar')
      },
      {
        path: 'horizontal-bar',
        name: 'charts-horizontal-bar-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/charts-horizontal-bar')
      },
      {
        path: 'histogram',
        name: 'charts-histogram-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/charts-histogram')
      },
      {
        path: 'line',
        name: 'charts-line-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/charts-line')
      },
      {
        path: 'area',
        name: 'charts-area-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/charts-area')
      },
      {
        path: 'radar',
        name: 'charts-radar-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/charts-radar')
      },
      {
        path: 'pie',
        name: 'charts-pie-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/charts-pie')
      },
      {
        path: 'doughnut',
        name: 'charts-doughnut-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/charts-doughnut')
      },
      {
        path: 'scatter',
        name: 'charts-scatter-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/charts-scatter')
      },
      {
        path: 'box',
        name: 'charts-box-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/charts-box')
      },
      {
        path: 'gauge',
        name: 'charts-gauge-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/charts-gauge')
      },
      {
        path: 'liquid',
        name: 'charts-liquid-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/charts-liquid')
      },
      {
        path: 'funnel',
        name: 'charts-funnel-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/charts-funnel')
      },
      {
        path: 'sankey',
        name: 'charts-sankey-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/charts-sankey')
      },
      {
        path: 'heatmap',
        name: 'charts-heatmap-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/charts-heatmap')
      },
      {
        path: 'map',
        name: 'charts-map-' + lang,
        meta: { lang },
        component: loadDocs(lang, '/charts-map')
      }
    ]
  };

  let indexRoute = {
    path: `/${lang}`, // 首页
    meta: { lang },
    name: 'home' + lang,
    component: load(lang, 'index')
  };

  return [guideRoute, resourceRoute, themeRoute, utilRoute, chartsRoute, indexRoute];
};

langs.forEach(lang => {
  route = route.concat(generateMiscRoutes(lang.lang));
});

route.push({
  path: '/play',
  name: 'play',
  component: require('./play/index.vue')
});

let userLanguage = localStorage.getItem('ELEMENT_LANGUAGE') || window.navigator.language || 'en-US';
let defaultPath = '/en-US';
if (userLanguage.indexOf('zh-') !== -1) {
  defaultPath = '/zh-CN';
} else if (userLanguage.indexOf('es') !== -1) {
  defaultPath = '/es';
} else if (userLanguage.indexOf('fr') !== -1) {
  defaultPath = '/fr-FR';
}

route = route.concat([{
  path: '/',
  redirect: defaultPath
}, {
  path: '*',
  redirect: defaultPath
}]);

export default route;
