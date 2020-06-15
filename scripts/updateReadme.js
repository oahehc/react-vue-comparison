const fs = require('fs');
const path = require('path');
const axios = require('axios');
const puppeteer = require('puppeteer');
const json2md = require('json2md');

// README default content
const title = [
  { h1: 'React-Vue-Comparison' },
  {
    p:
      'This repo is for someone who already familiar with React.js or Vue.js, and wants to find out the relative syntax in another framework.',
  },
];
const contents = [
  { h2: 'Contents' },
  { h3: '[React.js vs Vue.js](/CORE.md)' },
  {
    ul: [
      '[Render](/CORE.md#render)',
      '[Basic-Component](/CORE.md#basic-component)',
      '[Prop](/CORE.md#prop)',
      '[Event-Binding](/CORE.md#event-binding)',
      '[Custom-Event](/CORE.md#custom-event)',
      '[State](/CORE.md#state)',
      '[Change-State](/CORE.md#change-state)',
      '[Two-Way-Binding(Vue.js only)](/CORE.md#two-way-binding)',
      '[Compute](/CORE.md#compute)',
      '[Watch](/CORE.md#watch)',
      '[Children-and-Slot](/CORE.md#children-and-slot)',
      '[Render-HTML](/CORE.md#render-html)',
      '[Conditional-Rendering](/CORE.md#conditional-rendering)',
      '[List-Rendering](/CORE.md#list-rendering)',
      '[Render-Props](/CORE.md#render-props)',
      '[Lifecycle](/CORE.md#lifecycle)',
      '[Error-Handling](/CORE.md#error-handling)',
      '[Ref](/CORE.md#ref)',
      '[Performance-Optimization](/CORE.md#performance-optimization)',
    ],
  },
  { h3: '[Next.js vs Nuxt.js](/SSR.md)' },
  {
    ul: [
      '[Assets](/SSR.md#assets)',
      '[Basic-Routes](/SSR.md#basic-routes)',
      '[Dynamic-Routes](/SSR.md#dynamic-routes)',
      '[Link](/SSR.md#link)',
      '[Fetch-On-Server](/SSR.md#fetch-on-server)',
      '[Layout](/SSR.md#layout)',
      '[Error-Page](/SSR.md#error-page)',
      '[Meta-Tag](/SSR.md#meta-tag)',
      '[Context](/SSR.md#context)',
    ],
  },
  { h3: 'Tools' },
  {
    ul: ['[CLI](/CLI.md)'],
  },
  { p: '---' },
];
const reference = [
  { h2: 'Reference' },
  {
    ul: [
      '[React.js](https://reactjs.org/docs/getting-started.html)',
      '[Next.js](https://nextjs.org/docs/getting-started)',
      '[Vue.js](https://vuejs.org/v2/guide/#Getting-Started)',
      '[Nuxt.js](https://nuxtjs.org/guide/installation)',
    ],
  },
];

const repos = [
  {
    name: 'react',
    ghApi: 'https://api.github.com/search/repositories?q=react+in:name+user:facebook',
    npmUrl: 'https://www.npmjs.com/package/react',
  },
  {
    name: 'vue',
    ghApi: 'https://api.github.com/search/repositories?q=vue+in:name+user:vuejs',
    npmUrl: 'https://www.npmjs.com/package/vue',
  },
  {
    name: 'next.js',
    ghApi: 'https://api.github.com/search/repositories?q=next+in:name+user:vercel',
    npmUrl: 'https://www.npmjs.com/package/next',
  },
  {
    name: 'nuxt.js',
    ghApi: 'https://api.github.com/search/repositories?q=nuxt+in:name+user:nuxt',
    npmUrl: 'https://www.npmjs.com/package/nuxt',
  },
];

function getToday() {
  const now = new Date();
  return `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
}
function logger(...args) {
  console.log(`[${new Date().toISOString()}] `, ...args);
}
function generateTable(reactInfo, vueInfo, nextInfo, nuxtInfo) {
  return [
    {
      table: {
        headers: ['', 'STAR', 'LATEST VERSION', 'OPEN ISSUES', 'WEEKLY DOWNLOADS'],
        aligns: ['left', 'right', 'center', 'right', 'right'],
        rows: [
          [
            'React - [npm](https://www.npmjs.com/package/react), [github](https://github.com/facebook/react), [doc](https://reactjs.org/docs/getting-started.html)',
            reactInfo.stars,
            reactInfo.version,
            reactInfo.issues,
            reactInfo.wkDownload,
          ],
          [
            'Vue - [npm](https://www.npmjs.com/package/vue), [github](https://github.com/vuejs/vue), [doc](https://vuejs.org/v2/guide/l)',
            vueInfo.stars,
            vueInfo.version,
            vueInfo.issues,
            vueInfo.wkDownload,
          ],
          [
            'Next.js - [npm](https://www.npmjs.com/package/next), [github](https://github.com/vercel/next.js), [doc](https://nextjs.org/docs/getting-started)',
            nextInfo.stars,
            nextInfo.version,
            nextInfo.issues,
            nextInfo.wkDownload,
          ],
          [
            'Vue - [npm](https://www.npmjs.com/package/vue), [github](https://github.com/vuejs/vue), [doc](https://vuejs.org/v2/guide/l)',
            nuxtInfo.stars,
            nuxtInfo.version,
            nuxtInfo.issues,
            nuxtInfo.wkDownload,
          ],
        ],
      },
    },
    { p: `_Update: ${getToday()}_` },
    { p: '---' },
  ];
}
function generateMD(table) {
  const readme = [...title, ...table, ...contents, ...reference];
  return json2md(readme);
}

(async function load() {
  const output = repos.reduce(
    (res, { name }) => ({
      ...res,
      [name]: {},
    }),
    {}
  );
  const requests = repos.map(({ ghApi }) => axios.get(ghApi));

  try {
    logger('load GitHub Info');
    const results = await Promise.all(requests);
    results.forEach(({ data }) => {
      if (data && data.items && data.items[0]) {
        const { name, stargazers_count } = data.items[0];
        if (name && output[name]) {
          output[name].stars = Number(stargazers_count).toLocaleString();
        }
      }
    });
  } catch (e) {
    logger('get github info fail:', e);
  }

  try {
    logger('load NPM Info');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    for (let repo of repos) {
      await page.goto(repo.npmUrl);
      await page.waitFor(2000);

      const info = await page.evaluate(() => {
        const wkDownload =
          (document.querySelector('p.truncate+div p') && document.querySelector('p.truncate+div p').textContent) || '?';
        const version =
          (document.querySelector('p.truncate+div+div p') &&
            document.querySelector('p.truncate+div+div p').textContent) ||
          '?';
        const issues =
          (document.querySelector('p.f4 > a.truncate') && document.querySelector('p.f4 > a.truncate').textContent) ||
          '?';
        return {
          wkDownload,
          version,
          issues,
        };
      });

      if (output[repo.name]) {
        output[repo.name] = {
          ...output[repo.name],
          ...info,
        };
      }
    }
    await browser.close();

    logger('generate README');
    const table = generateTable(output.react, output.vue, output['next.js'], output['nuxt.js']);
    const filePath = path.resolve(__dirname, `../README.md`);
    fs.writeFile(filePath, generateMD(table), 'utf8', err => {
      if (err) throw err;
      logger('finish');
    });
  } catch (e) {
    logger('get npm info fail:', e);
  }
})();
