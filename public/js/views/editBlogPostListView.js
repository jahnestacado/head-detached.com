var EditBlogPostListView = BlogPostListView.extend({
    initialize: function() {
        Backbone.pubSub.on("updateListView", this.onChange, this);
    },
    template: _.template($("#edit-list-view-template").html()),
    events: {
        "click .delete-btn": "deletePost"
    },
    deletePost: function(event) {
        var id = $(event.target).data("id");
        var view = this;

        view.render();
        var blogPost = new BlogPost({_id: id});
        blogPost.destroy();
        Backbone.pubSub.trigger("hideEditBlogPostView");
        view.render();
    },
    onChange: function() {
        var view = this;
        view.render();
    }
});