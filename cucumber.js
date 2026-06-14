console.log('*** LOADING CUCUMBER CONFIG ***');

export default {
  default: {
    paths: ['features/**/*.feature'],
    import: [
      'features/step_definitions/**/*.js',
      'features/support/**/*.js'
    ],
    retry: 2,
    parallel: 0
  }
};