define([
    "jquery",
    "underscore",
    "backbone",
    "ckeditor",
    "text!editBlogPostTemplate"
], function($, _, Backbone, ckeditor, viewTemplate) {

    var EditBlogPostView = Backbone.View.extend({
        el: "#curtain-right",
        initialize: function() {
            Backbone.bus.on("hideEditBlogPostView", this.onChange, this);
        },
        template: _.template(viewTemplate),
        render: function(blogPostModel) {
            window.curtain.open();

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
                    ckeditor.replace("post-body", {
                        extraPlugins: 'codesnippet',
                        codeSnippet_theme: 'monokai_sublime'
                    });
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

            view.blogPostModel.set("title", view.$el.find("#post-title").val());
            view.blogPostModel.set("body", ckeditor.instances["post-body"].document.getBody().getHtml());
            view.blogPostModel.set("date", new Date());
            view.blogPostModel.save(view.blogPostModel.attributes);

            Backbone.bus.trigger("updateListView");
        },
        onChange: function(a) {
            var view = this;
            view.$el.hide();

        }
    });

    return EditBlogPostView;

});