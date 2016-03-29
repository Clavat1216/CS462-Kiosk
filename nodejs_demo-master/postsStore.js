// in-memory cache to store blog posts
var posts = [];

module.exports = {

  add: function(post) {
    post.id = posts.length + 1;
    posts.push(post);
    return post.id;
  },

  get: function(optId) {
    if (optId !== undefined) {
      optId = parseInt(optId, 10);
      if (posts.length >= optId && optId !== 0) {
        return posts[optId - 1];
      }
      return null;
    }
    return posts;
  },

  del: function(id) {
    id = parseInt(id, 10);
    if (posts.length >= id && id !== 0) {
      posts.splice(id - 1, 1);
      return true;
    }
    return false;
  },

  update: function(id, post) {
    id = parseInt(id, 10);
    if (posts.length >= id && id !== 0) {
      posts[id - 1] = post;
      return true;
    }
    return false;
  }

};
