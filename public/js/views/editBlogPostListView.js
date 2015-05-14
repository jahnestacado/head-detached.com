define([
    "jquery",
    "underscore",
    "backbone",
    "blogPostListView",
    "blogPost",
    "text!editListViewTemplate",
    "editBlogPostView"
], function($, _, Backbone, BlogPostListView, BlogPost, viewTemplate, EditBlogPostView) {

    var EditBlogPostListView = BlogPostListView.extend({
        initialize: function() {
            var view = this;
            Backbone.bus.on("refreshEditListView", view.refresh, view);
            view.blogPostView = new EditBlogPostView();
        },
        render: function(blogId) {
            var view = this;
            Backbone.View.onAccessGranted(function() {
                BlogPostListView.prototype.render.apply(view, [blogId]);
            });
        },
        template: _.template(viewTemplate),
        events: {
            "click .delete-btn": "deletePost"
        },
        deletePost: function(event) {
            var id = $(event.target).data("id");
            var view = this;

            view.render();
            var blogPost = new BlogPost({_id: id});
            blogPost.destroy( {
                dataType: "text",
                success: function() {
                    Backbone.bus.trigger("notification", {
                        message: "Deleted post!",
                        status: "success"
                    });
                },
                error: function() {
                    Backbone.bus.trigger("notification", {
                        message: "Couldn't delete post!",
                        status: "error"
                    });
                }
            });
            Backbone.bus.trigger("hideEditBlogPostView");
            view.render();
        },
        refresh: function() {
            var view = this;
            view.render();
        }
    });

    return EditBlogPostListView;
});
