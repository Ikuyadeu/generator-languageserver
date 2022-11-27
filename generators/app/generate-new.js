const prompts = require("./prompts");

module.exports = {
    id: 'lsp-new',
    aliases: ['new'],
    name: 'New Language Server Protocol',

    prompting: async (generator, languageServerConfig) => {
        await prompts.askForLanguageName(generator, languageServerConfig);
        await prompts.askForLanguageId(generator, languageServerConfig);
        await prompts.askForLanguageExtensions(generator, languageServerConfig);
        await prompts.askForLanguageScopeName(generator, languageServerConfig);

        await prompts.askForServerId(generator, languageServerConfig);
        await prompts.askForExtensionDisplayName(generator, languageServerConfig);
        await prompts.askForExtensionId(generator, languageServerConfig);
        await prompts.askForExtensionDescription(generator, languageServerConfig);

        await prompts.askForGit(generator, languageServerConfig);
    },
    /**
     * @param {import('yeoman-generator')} generator
     * @param {Object} languageServerConfig
     */
    writing: (generator, languageServerConfig) => {
        generator.fs.copy(generator.templatePath('.vscode'), generator.destinationPath('.vscode'));
        generator.fs.copyTpl(generator.templatePath('package.json'), generator.destinationPath('package.json'), languageServerConfig);
        generator.fs.copyTpl(generator.templatePath('tsconfig.json'), generator.destinationPath('tsconfig.json'), languageServerConfig);
        generator.fs.copyTpl(generator.templatePath('.vscodeignore'), generator.destinationPath('.vscodeignore'), languageServerConfig);
        generator.fs.copyTpl(generator.templatePath('shared.webpack.config.js'), generator.destinationPath('shared.webpack.config.js'), languageServerConfig);

        if (languageServerConfig.gitInit) {
            generator.fs.copy(generator.templatePath('.gitignore'), generator.destinationPath('.gitignore'));
        }
        generator.fs.copyTpl(generator.templatePath('README.md'), generator.destinationPath('README.md'), languageServerConfig);
        generator.fs.copyTpl(generator.templatePath('CHANGELOG.md'), generator.destinationPath('CHANGELOG.md'), languageServerConfig);
        generator.fs.copy(generator.templatePath('.eslintrc.base.json'), generator.destinationPath('.eslintrc.base.json'));

        generator.fs.copy(generator.templatePath('client'), generator.destinationPath('client'));
        generator.fs.copy(generator.templatePath('server'), generator.destinationPath('server'));
        languageServerConfig.installDependencies = true;
    }
}