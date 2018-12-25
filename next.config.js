module.exports = {
  exportPathMap: () => {
    return {
      '/': { page: '/' },
      '/category/Java': { page: '/' , query: { category: 'Java' }},
      '/category/Learn': { page: '/' , query: { category: 'Learn' }},
      '/p/learn-java': { page: '/', query: { title: 'Learn Java' }},
      '/p/learn-spring': { page: '/', query: { title: 'Learn Spring' } },
      '/p/learn-english': { page: '/', query: { title: 'Learn English' } },
    }
  }
};
