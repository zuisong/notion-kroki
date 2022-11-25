let VERSION =  JSON.parse(await Deno.readTextFile("package.json")).version;

export async function build() {
  async function writeCode() {
    const targetFile = "notion-kroki.user.js";
    try {
      await Deno.remove(targetFile, { recursive: true });
    } catch (_) {
      // ignore error if file not exists
    }
    const code = await Deno.readTextFile("dist/notion-kroki.js");

    const template = await Deno.readTextFile("src/template.js");

    const result = template
      .replace("//code here", code)
      .replace("[version]", VERSION);

    await Deno.writeTextFile(targetFile, result);
  }

  await writeCode();
}

build();
