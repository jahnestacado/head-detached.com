require.config({
    baseUrl: "../",
    deps: ["app"],
    paths: {
        //3rd Party libs
        "jquery": "bower_components/jquery/dist/jquery.min",
        "boostrap": "bower_components/bootstrap/dist/js/bootstrap.min",
        "ckeditor": "bower_components/ckeditor/ckeditor",
        "highlightjs": "bower_components/ckeditor/plugins/codesnippet/lib/highlight/highlight.pack",
        "underscore": "bower_components/underscore/underscore",
        "backbone": "bower_components/backbone/backbone",
        "text": "bower_components/text/text",
        
        //Backbone models
        "blogPost": "js/models/blogPost",
        "userAuth": "js/models/userAuth",
        
        //Backbone collections
        "blogPosts": "js/collections/blogPosts",
        
        //Backbone views
        "blogPostView": "js/views/blogPostView",
        "blogPostListView": "js/views/blogPostListView",
        "editBlogPostListView": "js/views/editBlogPostListView",
        "createBlogPostView": "js/views/createBlogPostView",
        "editBlogPostView": "js/views/editBlogPostView",
        "loginView": "js/views/loginView",
        "homeView": "js/views/homeView",
        
        //Backbone routes
        "routes": "js/routers/routes",
        
        //Misc js deps
        "curtain": "js/curtain",
        "snowFlakes": "js/snow-flakes-anim",
        "fontLoader": "js/fontLoader",
        "backboneExtended": "js/backboneExtend",
        
        //Underscore templates
        "homeTemplate": "templates/home.tpl",
        "listViewTemplate": "templates/listView.tpl",
        "loginTemplate": "templates/login.tpl",
        "editListViewTemplate": "templates/editListView.tpl",
        "blogPostTemplate": "templates/blogPost.tpl",
        "editBlogPostTemplate": "templates/editBlogPost.tpl",
        
        //Boot file
        "app": "js/app",
    },
    shim: {
        "underscore": {
            "exports": "_"
        },
        "backbone": {
            "deps": ["jquery", "underscore"],
            "exports": "Backbone"
        },
        "ckeditor": {
            "exports": "CKEDITOR"
        },
    }
});