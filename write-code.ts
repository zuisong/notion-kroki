import { readFile, remove, writeFile } from 'fs-extra';

(async () => {
  const targetFile = 'notion-kroki.user.js';
  const packageJson = JSON.parse(await readFile('package.json', { encoding: 'utf-8' }))
  await remove(targetFile);
  const code = await readFile('dist/main.js', { encoding: 'utf-8' });

  const template = await readFile('src/template.js', { encoding: 'utf-8' });

  const result = template
    .replace('//code here', code)
    .replace('[version]', packageJson.version);

  await writeFile(targetFile, result);
})();
