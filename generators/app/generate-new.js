const prompts = require("./prompts");

module.exports = {
    id: 'lsp-new',
    aliases: ['new'],
    name: 'New Language Server Protocol',

    prompting: async (generator, extensionConfig) => {
        await prompts.askForServerId(generator, extensionConfig);
        await prompts.askForExtensionDisplayName(generator, extensionConfig);
        await prompts.askForExtensionId(generator, extensionConfig);
        await prompts.askForExtensionDescription(generator, extensionConfig);

        await prompts.askForLanguageId(generator, extensionConfig);
        await prompts.askForLanguageName(generator, extensionConfig);
        await prompts.askForLanguageExtensions(generator, extensionConfig);
        await prompts.askForLanguageScopeName(generator, extensionConfig);

        await prompts.askForGit(generator, extensionConfig);
    },
    /**
     * @param {import('yeoman-generator')} generator
     * @param {Object} extensionConfig
     */
    writing: (generator, extensionConfig) => {
        generator.fs.copy(generator.templatePath('vscode'), generator.destinationPath('.vscode'));
        generator.fs.copyTpl(generator.templatePath('package.json'), generator.destinationPath('package.json'), extensionConfig);
        generator.fs.copyTpl(generator.templatePath('tsconfig.json'), generator.destinationPath('tsconfig.json'), extensionConfig);
        generator.fs.copyTpl(generator.templatePath('.vscodeignore'), generator.destinationPath('.vscodeignore'), extensionConfig);
        generator.fs.copyTpl(generator.templatePath('webpack.config.js'), generator.destinationPath('webpack.config.js'), extensionConfig);
    }
}