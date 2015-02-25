var EditBlogPostView = Backbone.View.extend({
    el: "#post-container",
    initialize: function() {
        Backbone.pubSub.on("hideEditBlogPostView", this.onChange, this);
    },
    template: _.template($("#edit-blog-post-template").html()),
    render: function(blogPostModel) {
        var view = this;
        view.blogPostModel = blogPostModel;

        view.blogPostModel.fetch({
            success: function(blogPostModel) {
                view.blogPostModel = blogPostModel;
                var attributes = blogPostModel.attributes;
                var contents = {
                    buttonAction: "Update",
                    title: attributes.title,
                    body: attributes.body
                }
                view.$el.html(view.template(contents));
            }
        });
        
        view.$el.show();
    },
    events: {
        "click #submit-btn:contains('Update')": "savePost"
    },
    savePost: function(event) {
        event.preventDefault();
        
        var view = this;
        
        if (!view.blogPostModel) {
            view.blogPostModel = new BlogPost({"_id": view.id});
        }

        view.blogPostModel.set("title", view.$el.find("#title").val());
        view.blogPostModel.set("body", view.$el.find("#body").val());
        view.blogPostModel.set("date", new Date());
        view.blogPostModel.save(view.blogPostModel.attributes);

        Backbone.pubSub.trigger("updateListView");
    },
    onChange: function(a) {
        var view = this;
        view.$el.hide();

    }
});