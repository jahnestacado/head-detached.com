<form class="form-horizontal ">
    <div class="form-group">
        <label for="inputTitle" class="control-label col-xs-1">Title</label>
        <div class="col-xs-10">
            <input type="text" class="form-control" id="post-title" placeholder="title"  value="<%= title %>" >
        </div>
    </div>
    <div class="form-group">
        <label for="body" class="col-sm-1 control-label">Message</label>
        <div class="col-sm-10">
            <textarea class="form-control" id="post-body" rows="10" name="body"><%= body %></textarea>
        </div>
    </div>

    <div class="form-group">
        <div class="col-xs-offset-2 col-xs-10">
            <button type="submit" id="submit-btn" class="btn btn-primary"><%= buttonAction %></button>
        </div>
    </div>
</form>