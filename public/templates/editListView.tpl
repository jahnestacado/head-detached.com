<div  class="panel panel read-only-panel">
    <div class="panel-heading">
        <h3 class="panel-title active">Available Posts</h3>
    </div>
    <div class="list-group">

        <% _.each( posts, function( post){ %>
        <a href=<%= post.getHashPath()%>  class="list-group-item" > <%= post.get("title") %> <span class="icon icon-bin2 delete-btn pull-right" data-id=<%= post.get("_id") %>></span> </a>
        <% }); %>

    </div>
</div>