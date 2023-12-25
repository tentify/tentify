const fs = require('fs');
const path = require('path');

class Templater {
  constructor(configManager) {
    this.configManager = configManager;
    this.templatesDir = this.configManager.get('templatesDirectory') || 'templates';
    this.outputDir = this.configManager.get('outputDirectory') || 'dist';
  }

  // Scan the templates directory and return a list of template files
  scanTemplates() {
    const templates = [];
    const files = fs.readdirSync(path.join(process.cwd(), this.templatesDir));

    files.forEach(file => {
      if (file.endsWith('.tent')) {
        templates.push(file);
      }
    });

    return templates;
  }

  // Process each template file and apply data
  applyTemplates() {
    const templates = this.scanTemplates();
    templates.forEach(template => {
      const templateContent = fs.readFileSync(path.join(this.templatesDir, template), 'utf8');
      const renderedContent = this.renderTemplate(templateContent, this.configManager.get('variables'));
      const outputFilePath = path.join(this.outputDir, template.replace('.tent', ''));
      fs.writeFileSync(outputFilePath, renderedContent, 'utf8');
    });
    console.log(`${templates.length} templates processed.`);
  }

  // Render a template string with the given data
  renderTemplate(templateStr, data) {
    let rendered = templateStr;
    for (const [key, value] of Object.entries(data)) {
      rendered = rendered.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), value);
    }
    return rendered;
  }
}

module.exports = Templater;