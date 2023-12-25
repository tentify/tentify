#!/usr/bin/env node

const path = require('path');
const { program } = require('commander');
const Templater = require('../src/core/Templater');
const ConfigManager = require('../src/core/ConfigManager');
const packageJson = require('../package.json');

program
  .version(packageJson.version)
  .description('Tentify: Apply templates to your files effortlessly');

program
  .command('init')
  .description('Initialize Tentify in the current directory')
  .action(() => {
    // Logic for initializing Tentify
    ConfigManager.initialize();
    console.log('Tentify initialized successfully.');
  });

program
  .command('build')
  .description('Apply templates and build project')
  .option('-r, --run <command>', 'Run a build command after applying templates')
  .action((options) => {
    // Apply templates
    Templater.applyTemplates();

    // If a build command is provided, run it
    if (options.run) {
      const exec = require('child_process').exec;
      exec(options.run, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error during build: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Build error: ${stderr}`);
          return;
        }
        console.log(`Build output: ${stdout}`);
      });
    }

    console.log('Build completed.');
  });

program.parse(process.argv);