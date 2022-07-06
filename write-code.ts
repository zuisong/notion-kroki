import {copy, CopyOptions, readFile, remove, writeFile} from 'fs-extra';

(async () => {
  const targetFile = 'notion-kroki.user.js';

  await remove(targetFile);
  const code = await readFile('dist/main.js', {encoding: 'utf-8'});

  const template = await readFile('src/template.js', {encoding: 'utf-8'});

  const result = template.replace('//code here', code);

  await writeFile(targetFile, result);
})();
