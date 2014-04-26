
/*
 * IPython Notebook's Collective Cut-Copy-Paste
 * Author: paul @ivanov
 
cd $(ipython locate)/nbextensions
git clone gh:ivanov/nb-cccp
And load it with:

require(["nbextensions/nb-cccp"], function (copy_paste) {
    console.log('copy_paste extension loaded');
    copy_paste.load_ipython_extension();
});

*/
define( function () {
   
    var cells = null;
    var copy_notebook = function () {
        if (!IPython.notebook) return;
        nb = IPython.notebook;
        nb.cccp = [];
        cells = nb.cccp;
        $.each( nb.get_cell_elements(), function (index, value) {
            if ( value.classList.contains('btn-primary') ) {
                cells.push(nb.get_cell(index).toJSON());
                //value.classList.add('disabled');
            }
        })
    };

    var cut_notebook = function () {
        if (!IPython.notebook) return;
        nb = IPython.notebook;
        nb.cccp = [];
        cells = nb.cccp;
        // I worry about indices changing underneath me as i start deleting cells
        var del_indices = [];
        $.each( nb.get_cell_elements(), function (index, value) {
            if ( value.classList.contains('btn-primary') ) {
                cells.push(nb.get_cell(index).toJSON());
                del_indices.push(index)
            }
        })

        for (var i=0; i < cells.length; i++) {
            nb.delete_cell(del_indices[i]-i);
        }
        $('div.cell.btn-primary').removeClass('btn-primary');
        // update select cells count
        $("#nb_cccp_count span").text( $('div.cell.btn-primary').length);
    };

    var paste_notebook = function () {
        if (!IPython.notebook) return;
        if (!cells) return;
        nb = IPython.notebook;
        cells = nb.cccp;
        select_none();
        var new_cell = null;
        var cell_data;
        for (var i=0; i < cells.length; i++) {
            new_cell = nb.insert_cell_below(cells[i].cell_type);
            new_cell.fromJSON(cells[i]);
            new_cell.focus_cell();
            // TODO: doesn't work
            new_cell.value[0].classList.add('btn-primary');
        }
        // update select cells count
        $("#nb_cccp_count span").text( $('div.cell.btn-primary').length);
    };
    
    var select_none = function () {
        if (!IPython.notebook) return;
        $('div.cell.btn-primary').removeClass('btn-primary');
    };


    var cccp_button = function () {
        if (!IPython.toolbar) {
            $([IPython.events]).on("app_initialized.NotebookApp", cccp_button);
            return;
        }
        if ($("#nb_cccp").length === 0) {
            IPython.toolbar.add_buttons_group([
                {
                    'label'   : 'cut several cells',
                    'icon'    : 'icon-cut  btn btn-mini btn-primary',
                    //'icon'    : ' icon-flag  icon-circle',
                    'callback': cut_notebook,
                    'id'      : 'cut_notebook'
                },
                {
                    'label'   : 'copy several cells',
                    'icon'    : 'icon-copy btn btn-mini btn-primary',
                    //'icon'    : ' icon-flag  icon-circle',
                    'callback': copy_notebook,
                    'id'      : 'copy_notebook'
                },
                {
                    'label'   : 'paste several cells',
                    'icon'    : 'icon-paste btn btn-mini btn-primary',
                    //'icon'    : ' icon-flag  icon-circle',
                    'callback': paste_notebook,
                    'id'      : 'cut_notebook'
                },
            ], 'nb_cccp');

            IPython.toolbar.add_buttons_group([
                {
                    'label'   : 'number of cells selected (click to select none)',
                    //'icon'    : ' icon-flag  icon-circle',
                    'callback': select_none,
                    'id'      : 'nb_cccp_count'
                },
                ]);
        $("#nb_cccp").addClass('btn btn-mini btn-primary');
        $("#nb_cccp_count").append('<span>0</span>').addClass('btn btn-mini btn-primary');
        }
    };
    
    var toggle_cell = function() {
        $('.selected').toggleClass('btn-primary');
        // update select cells count
        $("#nb_cccp_count span").text( $('div.cell.btn-primary').length);
    };

    var load_ipython_extension = function () {
        cccp_button();
        $([IPython.events]).on("notebook_loaded.Notebook", function () {
                var cm = IPython.keyboard_manager.command_shortcuts;

                cm.add_shortcut("shift-down", function() { 
                    toggle_cell();
                    IPython.notebook.select_next();
                });
                cm.add_shortcut("shift-up", function() { 
                    toggle_cell();
                    IPython.notebook.select_prev();
                });
                cm.add_shortcut("shift-space", function() { 
                    toggle_cell();
                });

                cm.add_shortcut("ctrl-space", function() { 
                    toggle_cell();
                });
                cm.add_shortcut("ctrl-down", function() { 
                    IPython.notebook.select_next();
                });
                cm.add_shortcut("ctrl-up", function() { 
                    IPython.notebook.select_prev();
                });

                // actually, space bar is a pretty awesome shortcut
                cm.add_shortcut("space", function() { 
                    toggle_cell();
                });
                // add selection logic to all In[ ] prompts
                $(".input_prompt").on('click', toggle_cell);


        // add toggle_cell to new cells and cell that change their type
        $([IPython.events]).on('selected_cell_type_changed.Notebook', function(evt, data) {
            //{'cell': cell, 'index': index});index
            // XXX: Next line should work, but something wonky's going on, so
            //      we'll just be greedy
            //$('.selected .input_prompt').on('click', toggle_cell_click);
            $('.input_prompt').off('click', toggle_cell);
            $('.input_prompt').on('click', toggle_cell);
        });
        $([IPython.events]).on('create.Cell', function(evt, data) {
            // XXX: Next line should work, but something wonky's going on, so
            //      we'll just be greedy
            //$('.selected .input_prompt').on('click', toggle_cell_click);
            $('.input_prompt').off('click', toggle_cell);
            $('.input_prompt').on('click', toggle_cell);
        });

        });
    };
    
    return {
        load_ipython_extension : load_ipython_extension,
    };
    
});
