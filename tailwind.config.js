const plugin = require("tailwindcss/plugin");

const focusedSiblingPlugin = plugin(({ addVariant, e }) => {
  addVariant("focused-sibling", ({ container }) => {
    container.walkRules((rule) => {
      rule.selector = `:focus + .focused-sibling\\:${rule.selector.slice(1)}`;
    });
  });
});

module.exports = {
    future: {
      // removeDeprecatedGapUtilities: true,
      // purgeLayersByDefault: true,
    },
    purge: [],
    theme: {
      extend: {
        colors: {
          'blue-900': '#0D1117',
          'blue-500': '#48E8C4',
          'blue-600': '#0862ac',
          'green-300': '#5CFF67',
          'green-400': '#C7E848',
          'yellow-400': '#FFDD4F',
        },
        width: {
          'fit-content': 'fit-content'
        }
      },
    },
    variants: {
      extend: {
        transformOrigin: ['focused-sibling'],
        scale: ['focused-sibling'],
        display: ['group-hover']
      }
    },
    plugins: [focusedSiblingPlugin],
  }
  