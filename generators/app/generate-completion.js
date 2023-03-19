const prompts = require("./prompts");

module.exports = {
    id: "lsp-completion",
    aliases: ["completion"],
    name: "New completion support",

    prompting: async (generator, languageServerConfig) => {
        await prompts.askForLanguageName(generator, languageServerConfig);
        await prompts.askForLanguageId(generator, languageServerConfig);
        await prompts.askForLanguageExtensions(generator, languageServerConfig);
        await prompts.askForLanguageScopeName(generator, languageServerConfig);

        await prompts.askForServerId(generator, languageServerConfig);
        await prompts.askForExtensionDisplayName(
            generator,
            languageServerConfig
        );
        await prompts.askForExtensionId(generator, languageServerConfig);
        await prompts.askForExtensionDescription(
            generator,
            languageServerConfig
        );

        await prompts.askForGit(generator, languageServerConfig);
    },
    /**
     * @param {import('yeoman-generator')} generator
     * @param {Object} languageServerConfig
     */
    writing: (generator, languageServerConfig) => {
        generator.fs.copy(
            generator.templatePath(".vscode"),
            generator.destinationPath(".vscode")
        );
        generator.fs.copyTpl(
            generator.templatePath("package.json"),
            generator.destinationPath("package.json"),
            languageServerConfig
        );
        generator.fs.copyTpl(
            generator.templatePath("tsconfig.json"),
            generator.destinationPath("tsconfig.json"),
            languageServerConfig
        );
        generator.fs.copyTpl(
            generator.templatePath("tsconfig.base.json"),
            generator.destinationPath("tsconfig.base.json"),
            languageServerConfig
        );
        generator.fs.copyTpl(
            generator.templatePath(".vscodeignore"),
            generator.destinationPath(".vscodeignore"),
            languageServerConfig
        );
        generator.fs.copyTpl(
            generator.templatePath("shared.webpack.config.js"),
            generator.destinationPath("shared.webpack.config.js"),
            languageServerConfig
        );
        generator.fs.copyTpl(
            generator.templatePath("README.md"),
            generator.destinationPath("README.md"),
            languageServerConfig
        );
        generator.fs.copyTpl(
            generator.templatePath("CHANGELOG.md"),
            generator.destinationPath("CHANGELOG.md"),
            languageServerConfig
        );
        generator.fs.copyTpl(
            generator.templatePath(".eslintrc.base.json"),
            generator.destinationPath(".eslintrc.base.json")
        );

        if (languageServerConfig.gitInit) {
            generator.fs.copy(
                generator.templatePath("gitignore"),
                generator.destinationPath(".gitignore")
            );
        }

        generator.fs.copyTpl(
            generator.templatePath("client"),
            generator.destinationPath("client"),
            languageServerConfig
        );
        generator.fs.copyTpl(
            generator.templatePath("client/.eslintrc.json"),
            generator.destinationPath("client/.eslintrc.json")
        );
        generator.fs.copyTpl(
            generator.templatePath("client/.eslintignore"),
            generator.destinationPath("client/.eslintignore")
        );

        generator.fs.copyTpl(
            generator.templatePath("server/src/server.ts"),
            generator.destinationPath("server/src/server.ts")
        );
        generator.fs.copyTpl(
            generator.templatePath("server/package.json"),
            generator.destinationPath("server/package.json"),
            languageServerConfig
        );
        generator.fs.copyTpl(
            generator.templatePath("server/tsconfig.json"),
            generator.destinationPath("server/tsconfig.json"),
            languageServerConfig
        );
        generator.fs.copyTpl(
            generator.templatePath("server/.eslintrc.json"),
            generator.destinationPath("server/.eslintrc.json")
        );
        generator.fs.copyTpl(
            generator.templatePath("server/.eslintignore"),
            generator.destinationPath("server/.eslintignore")
        );
        generator.fs.copyTpl(
            generator.templatePath("server/webpack.config.js"),
            generator.destinationPath("server/webpack.config.js")
        );
        generator.fs.copyTpl(
            generator.templatePath("server/bin/sample-server"),
            generator.destinationPath(
                `server/bin/${languageServerConfig.serverName}`
            )
        );
        languageServerConfig.installDependencies = true;
    },
};
