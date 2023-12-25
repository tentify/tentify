const fs = require('fs');
const path = require('path');

class ConfigManager {
  constructor() {
    this.configPath = path.join(process.cwd(), '.tentifyconfig');
    this.config = this.loadConfig();
  }

  // Initialize a new configuration file
  initialize() {
    if (!fs.existsSync(this.configPath)) {
      const defaultConfig = {
        templatesDirectory: 'templates',
        outputDirectory: 'dist',
        variables: {}
      };
      fs.writeFileSync(this.configPath, JSON.stringify(defaultConfig, null, 2), 'utf8');
      console.log(`Tentify configuration initialized at ${this.configPath}`);
    } else {
      console.log('Tentify configuration already exists.');
    }
  }

  // Load the configuration from the file
  loadConfig() {
    if (fs.existsSync(this.configPath)) {
      const configFile = fs.readFileSync(this.configPath, 'utf8');
      return JSON.parse(configFile);
    } else {
      console.log('No configuration file found. Please initialize Tentify.');
      return null;
    }
  }

  // Get a configuration value
  get(key) {
    return this.config ? this.config[key] : null;
  }

  // Update the configuration file with new data
  update(key, value) {
    if (this.config) {
      this.config[key] = value;
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), 'utf8');
      console.log(`Configuration updated: ${key} = ${value}`);
    } else {
      console.log('Configuration not loaded. Please initialize Tentify.');
    }
  }
}

module.exports = ConfigManager;