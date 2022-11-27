/**
 * @param {import('yeoman-generator')} generator
 * @param {Object} extensionConfig
 */
exports.askForLanguageName = async (generator, extensionConfig) => {
    generator.log('Enter the name of the language. The name will be shown in the VS Code editor mode selector.');
    const nameAnswer = await generator.prompt({
        type: 'input',
        name: 'languageName',
        message: 'Language name:',
        default: extensionConfig.languageName,
    });
    extensionConfig.languageName = nameAnswer.languageName;
}

/**
 * @param {import('yeoman-generator')} generator
 * @param {Object} extensionConfig
 */
exports.askForLanguageId = async (generator, extensionConfig) => {
    generator.log('Enter the id of the language. The id is an identifier and is single, lower-case name such as \'php\', \'javascript\'');
    const idAnswer = await generator.prompt({
        type: 'input',
        name: 'languageId',
        message: 'Language id:',
        default: extensionConfig.languageName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    });
    extensionConfig.languageId = idAnswer.languageId;
}

/**
 * @param {import('yeoman-generator')} generator
 * @param {Object} extensionConfig
 */
exports.askForLanguageExtensions = async (generator, extensionConfig) => {
    extensionConfig.languageExtensions = [];
    generator.log('Enter the file extensions of the language. Use commas to separate multiple entries (e.g. .ruby, .rb)');
    const extAnswer = await generator.prompt({
        type: 'input',
        name: 'languageExtensions',
        message: 'File extensions:',
        default: `.${extensionConfig.languageId}`,
    });
    extensionConfig.languageExtensions = extAnswer.languageExtensions.split(',').map(e => { return e.trim(); });
}

/**
 * @param {import('yeoman-generator')} generator
 * @param {Object} extensionConfig
 */
exports.askForLanguageScopeName = async (generator, extensionConfig) => {
    generator.log('Enter the root scope name of the grammar (e.g. source.ruby)');
    const extAnswer = await generator.prompt({
        type: 'input',
        name: 'languageScopeName',
        message: 'Scope names:',
        default: `source.${extensionConfig.languageId}`,
    });
    extensionConfig.languageScopeName = extAnswer.languageScopeName;
}

/**
 * Ask for server id ("name" in server/package.json)
* @param {import('yeoman-generator')} generator
* @param {Object} languageServerConfig
*/
exports.askForServerId = async (generator, languageServerConfig) => {
    let serverName = generator.options['serverId'];
    if (serverName) {
        languageServerConfig.serverName = serverName;
        return Promise.resolve();
    }

    let def = languageServerConfig.serverName;
    if (def && generator.options['quick']) {
        languageServerConfig.serverName = 'server';
        return Promise.resolve();
    }

    const nameAnswer = await generator.prompt({
        type: 'input',
        name: 'serverName',
        message: 'What\'s the identifier of your server?',
        default: `${languageServerConfig.languageId}-server`,
    });
    languageServerConfig.serverName = nameAnswer.serverName;
}


/**
* @param {import('yeoman-generator')} generator
* @param {Object} extensionConfig
*/
exports.askForExtensionDisplayName = async (generator, extensionConfig) => {
    let extensionDisplayName = generator.options['extensionDisplayName'];
    if (extensionDisplayName) {
        extensionConfig.displayName = extensionDisplayName;
        return Promise.resolve();
    }
    const nameFromFolder = generator.options['destination'] ? path.basename(generator.destinationPath()) : '';

    if (generator.options['quick'] && nameFromFolder) {
        extensionConfig.displayName = nameFromFolder;
        return Promise.resolve();
    }

    const displayNameAnswer = await generator.prompt({
        type: 'input',
        name: 'displayName',
        message: 'What\'s the name of your extension?',
        default: extensionConfig.languageName,
    });
    extensionConfig.displayName = displayNameAnswer.displayName;
}

/**
 * Ask for extension id ("name" in package.json)
* @param {import('yeoman-generator')} generator
* @param {Object} extensionConfig
*/
exports.askForExtensionId = async (generator, extensionConfig) => {
    let extensionName = generator.options['extensionId'];
    if (extensionName) {
        extensionConfig.name = extensionName;
        return Promise.resolve();
    }
    let def = extensionConfig.name;
    if (!def && extensionConfig.displayName) {
        def = extensionConfig.displayName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }
    if (def && generator.options['quick']) {
        extensionConfig.name = def;
        return Promise.resolve();
    }

    const nameAnswer = await generator.prompt({
        type: 'input',
        name: 'name',
        message: 'What\'s the identifier of your extension?',
        default: def || ''
    });
    extensionConfig.name = nameAnswer.name;
}

/**
 * Ask for extension description
* @param {import('yeoman-generator')} generator
* @param {Object} extensionConfig
*/
exports.askForExtensionDescription = async (generator, extensionConfig) => {
    let extensionDescription = generator.options['extensionDescription'];
    if (extensionDescription) {
        extensionConfig.description = extensionDescription;
        return Promise.resolve();
    }
    if (generator.options['quick']) {
        extensionConfig.description = '';
        return Promise.resolve();
    }

    const descriptionAnswer = await generator.prompt({
        type: 'input',
        name: 'description',
        message: 'What\'s the description of your extension?',
        default: ''
    });
    extensionConfig.description = descriptionAnswer.description;
}

/**
* @param {import('yeoman-generator')} generator
* @param {Object} extensionConfig
*/
exports.askForGit = async (generator, extensionConfig) => {
    let gitInit = generator.options['gitInit'];
    if (typeof gitInit === 'boolean') {
        extensionConfig.gitInit = Boolean(gitInit);
        return Promise.resolve();
    }
    if (generator.options['quick']) {
        extensionConfig.gitInit = true;
        return Promise.resolve();
    }

    const gitAnswer = await generator.prompt({
        type: 'confirm',
        name: 'gitInit',
        message: 'Initialize a git repository?',
        default: true
    });
    extensionConfig.gitInit = gitAnswer.gitInit;
}

