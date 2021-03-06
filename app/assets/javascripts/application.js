// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(function () {
    if (window.location.pathname == '/project/index') {
        fetchProjects();
    }
});

var favUnfav = function (projectId) {
    var el = $('#fav-unfav-' + projectId).find('i').attr("class") == 'icon-eye-open';
    $.ajax({
        url:'/project/toggle_fav',
        data:'id=' + projectId + '&fav=' + el,
        success:function () {
            if (el) {
                $('#fav-unfav-' + projectId).html("<i class='icon-eye-close'></i>Not Favorite");
            } else {
                $('#fav-unfav-' + projectId).html("<i class='icon-eye-open'></i>Favorite");
            }

            var affected_li = $('#fav-unfav-' + projectId).parents('li.span4');
            $(affected_li).remove();

            if (el) {
                $('ul#fav').append(affected_li);
            } else {
                $('ul#unfav').append(affected_li);
            }
        }
    });
}

var fetchProjects = function () {
    $.ajax({
        url:'/project/fetch_projects',
        success:function (data) {
            $("#projects").html(data);
        }
    });
}

var fetchProgress = function () {
    var projects = $.merge($('ul#fav').find('div#project-data'), $('ul#unfav').find('div#project-data'));
    $.each(projects, function (ind, val) {
        var p_name = $(val).attr('data-project');
        var o_name= $(val).attr('data-owner');
        var p_id = $(val).attr('data-id');

        $.ajax({
            url: '/project/fetch_progress',
            data: 'project_name=' + p_name + '&owner=' + o_name + '&id=' + p_id,
            dataType: 'json',
            success: function (data) {
                var el = $("#bar-" + p_id);
                $(el).attr("style", ('width:' + data.completeness + '%'));
                $(el).find('p').html(data.completeness + '%');
                $(el).parent().attr('class', 'progress progress-success');
                $('#mile-' + p_id).text(data.total + ' Milestones');
            }
        });
    });
}