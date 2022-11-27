"use strict";

const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const which = require('which');

const newLsp = require('./generate-new');
const completion = require('./generate-completion');
const lint = require('./generate-lint');

const languageServerGenerators = [
    newLsp, completion, lint
]

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('languageServerType', { type: String, alias: 't', description: languageServerGenerators.slice(0, 6).map(e => e.aliases[0]).join(', ') + '...' });

        this.languageServerConfig = Object.create(null);
        this.languageServerGenerator = undefined;

        this.abort = false;
    }

    async prompting() {
        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the Visual Studio Code Language Server Extension generator!'));

        const languageServerType = this.options['languageServerType'];
        if (languageServerType)
        {
            // const languageServerTypeId = 'lsp-' + languageServerType;
            const languageServerGenerator = languageServerGenerators.find(g => g.aliases.indexOf(languageServerType) !== -1);
            if (languageServerGenerator) {
                this.languageServerConfig.type = languageServerGenerator.id;
            } else {
                this.log("Invalid Language Server type: " + languageServerType + '\nPossible types are: ' + languageServerGenerators.map(g => g.aliases.join(', ')).join(', '));
                this.abort = true;
            }
        } else {
            const choices = [];
            for (const g of languageServerGenerators) {
                choices.push({ name: g.name, value: g.id })
            }
            this.languageServerConfig.type = (await this.prompt({
                type: 'list',
                name: 'type',
                message: 'What type of language erver extension do you want to create?',
                pageSize: choices.length,
                choices,
            })).type;
        }

        this.languageServerGenerator = languageServerGenerators.find(g => g.id === this.languageServerConfig.type);

        try {
            await this.languageServerGenerator.prompting(this, this.languageServerConfig);
        } catch (e) {
            this.abort = true;
        }
    }

    writing() {
        if (this.abort) {
            return;
        }
        if (!this.options['destination']) {
            this.destinationRoot(this.destinationPath(this.languageServerConfig.name))
        }
        this.env.cwd = this.destinationPath();

        this.log();
        this.log(`Writing in ${this.destinationPath()}...`);

        this.sourceRoot(path.join(__dirname, './templates/' + this.languageServerConfig.type));

        return this.languageServerGenerator.writing(this, this.languageServerConfig);
    }

    // Installation
    install() {
        if (this.abort) {
            this.env.options.skipInstall = true;
            return;
        }
        if (this.languageServerConfig.installDependencies) {
            this.env.options.nodePackageManager = this.languageServerConfig.pkgManager;
        } else {
            this.env.options.skipInstall = true;
        }
    }

    // End
    async end() {
        // Git init
        if (this.languageServerConfig.gitInit) {
            this.spawnCommand('git', ['init', '--quiet', '--initial-branch=main']);
        }

        this.log('Your extension ' + this.languageServerConfig.name + ' has been created!');
        this.log('');


        const codeStableLocation = await which('code').catch(() => undefined)

        const choices = [];
        if (codeStableLocation) {
            choices.push({ name: "Open with `code`", value: codeStableLocation });
        }
        choices.push({ name: "Skip", value: 'skip' });

        const answer = await this.prompt({
            type: "list",
            name: "openWith",
            message: "Do you want to open the new folder with Visual Studio Code?",
            choices
        });
        if (answer && answer.openWith && answer.openWith !== 'skip') {
            this.spawnCommand(answer.openWith, [this.destinationPath()]);
        }
    }
};
