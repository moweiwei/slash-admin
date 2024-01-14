module.exports = function (grunt) {
  grunt.initConfig({
    i18next: {
      dev: {
        src: ['src/**/*.{tsx,ts}'],
        dest: 'src',
        options: {
          lngs: ['en_US', 'zh_CN'],
          removeUnusedKeys: false,
          keySeparator: false,
          nsSeparator: false,
          interpolation: {
            prefix: '{{',
            suffix: '}}',
          },
          resource: {
            loadPath: 'src/locales/lang/{{lng}}/{{lng}}.json',
            savePath: 'locales/lang/{{lng}}/{{lng}}.json',
            jsonIndent: 2,
            lineEnding: '\n',
          },
          func: {
            list: ['t', 't.html'],
            extensions: ['.ts', '.tsx'],
          },
          defaultValue: (lng, ns, key) => {
            if (lng === 'zh_CN') {
              return '';
            }
            const parts = key.split('.');

            return parts.length > 1 ? parts[parts.length - 1] : key;
          },
        },
      },
    },
  });

  // Load the plugin that provides the "i18next" task.
  grunt.loadNpmTasks('i18next-scanner');

  // Default task(s).
  grunt.registerTask('default', ['i18next']);
};
