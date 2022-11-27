const prompts = require("./prompts");

module.exports = {
    id: 'lsp-lint',
    aliases: ['lint'],
    name: 'New lint support',

    prompting: async (generator, extensionConfig) => {
        await prompts.askForServerId(generator, extensionConfig);
        await prompts.askForExtensionDisplayName(generator, extensionConfig);
        await prompts.askForExtensionId(generator, extensionConfig);
        await prompts.askForExtensionDescription(generator, extensionConfig);

        await prompts.askForLanguageName(generator, extensionConfig);
        await prompts.askForLanguageId(generator, extensionConfig);
        await prompts.askForLanguageExtensions(generator, extensionConfig);
        await prompts.askForLanguageScopeName(generator, extensionConfig);

        await prompts.askForGit(generator, extensionConfig);
    },
    /**
     * @param {import('yeoman-generator')} generator
     * @param {Object} extensionConfig
     */
    writing: (generator, extensionConfig) => {
    }
}