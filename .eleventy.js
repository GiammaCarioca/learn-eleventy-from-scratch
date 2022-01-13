const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

// Eleventy config file
module.exports = config => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/');

  // Returns work items, sorted by display order
  config.addCollection('work', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md'));
  });

  // Returns work items, sorted by display order then filtered by featured
  config.addCollection('featuredWork', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md')).filter(
      x => x.data.featured
    );
  });

  // Returns a collection of blog posts in reverse date order
  config.addCollection('blog', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
  });

  // Return your Object options
  return {
  // We’re telling Eleventy that markdown files, data files and HTML files should be processed by Nunjucks. That means that we can now use .html files instead of having to use .njk files
  markdownTemplateEngine: 'njk',
  dataTemplateEngine: 'njk',
  htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
