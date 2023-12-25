const ConfigManager = require('./core/ConfigManager');
const Templater = require('./core/Templater');
const program = require('commander');

// Set up the configuration manager and templater
const configManager = new ConfigManager();
const templater = new Templater(configManager);

program
  .version('0.1.0')
  .description('Tentify: A tool to apply templates to any file.');

// Initialize command: sets up Tentify configuration in the project
program
  .command('init')
  .description('Initialize Tentify configuration')
  .action(() => {
    configManager.initialize();
    console.log('Tentify has been initialized.');
  });

// Build command: applies templates to files
program
  .command('build')
  .description('Apply templates and build project')
  .action(() => {
    templater.applyTemplates();
    console.log('Templates have been applied, and project built.');
  });

// Parse command-line arguments
program.parse(process.argv);

// Export modules for testing or further extension
module.exports = {
  ConfigManager,
  Templater
};