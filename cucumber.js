module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: [
      'features/step_definitions/**/*.js',
      'features/support/**/*.js'
    ],
    requireModule: ['dotenv/config'],
    
    // FIXED: Only one formatter controls stdout. Reports are routed to physical files.
    format: [
      ['@cucumber/pretty-formatter', 'stdout'],
      ['html', 'reports/cucumber-report.html'],
      ['json', 'reports/cucumber-results.json']
    ],
    
    parallel: 0
  }
};
