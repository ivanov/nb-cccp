
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
    
    var copy_notebook = function () {
        if (!IPython.notebook) return;
        alert("copy");
    };

    var cut_notebook = function () {
        if (!IPython.notebook) return;
        alert("cut");
    };
    
    var paste_notebook = function () {
        if (!IPython.notebook) return;
        alert("paste");
    };
    
    var select_none = function () {
        if (!IPython.notebook) return;
        $(".btn-primary .input").removeClass('btn-primary');
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
        $("#nb_cccp").addClass('btn btn-primary');
        $("#nb_cccp_count").append('<span>0</span>').addClass('btn btn-mini btn-primary');
        }
    };
    
    var toggle_cell = function() {
        $('.selected').toggleClass('btn-primary');
        // update select cells count
        $("#nb_cccp_count span").text( $(".btn-primary .input").length );
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
        });
    };
    
    return {
        load_ipython_extension : load_ipython_extension,
    };
    
});
