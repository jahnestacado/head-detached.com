define(["backbone", "speakingurl"], function (Backbone, getSlug) {

    var BlogPost = Backbone.Model.extend({
        defaults: {
            title: null,
            date: null,
            body: null,
            slug: null
        },
        idAttribute: "_id",
        initialize: function (options) {
            var model = this;

            if (options && options._id) {
                model.set("_id", options._id);
            }
            model.get("slug") === model.defaults.slug && model.generateSlug();
            model.on("change:title", model.generateSlug, model);
        },
        url: function () {
            var model = this;
            var id = model.get("_id");
            var url = "/blog/articles";

            if (id){
                url += "/" + model.get("_id") + "/" + model.get("slug");
            }

            return url;
        },
        generateSlug: function(){
            var model = this;
            model.set("slug", getSlug(model.get("title")));
        }
    });

    return BlogPost;
});
