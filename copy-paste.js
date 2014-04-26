
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


    var cccp_button = function () {
        if (!IPython.toolbar) {
            $([IPython.events]).on("app_initialized.NotebookApp", ccccp_button);
            return;
        }
        if ($("#nb_cccp").length === 0) {
            IPython.toolbar.add_buttons_group([
                {
                    'label'   : 'cut several cells',
                    'icon'    : 'icon-cut btn btn-small btn-primary',
                    //'icon'    : ' icon-flag  icon-circle',
                    'callback': cut_notebook,
                    'id'      : 'cut_notebook'
                },
                {
                    'label'   : 'copy several cells',
                    'icon'    : 'icon-copy btn btn-small btn-primary',
                    //'icon'    : ' icon-flag  icon-circle',
                    'callback': copy_notebook,
                    'id'      : 'copy_notebook'
                },
                {
                    'label'   : 'paste several cells',
                    'icon'    : 'icon-paste btn btn-small btn-primary',
                    //'icon'    : ' icon-flag  icon-circle',
                    'callback': paste_notebook,
                    'id'      : 'cut_notebook'
                },
            ], 'nb_cccp').
        $("#nb_cccp").addClass('btn-primary alert-info');
        }
    };
    
    var load_ipython_extension = function () {
        cccp_button();
        //$([IPython.events]).on("notebook_loaded.Notebook", function () {};
    };
    
    return {
        load_ipython_extension : load_ipython_extension,
    };
    
});
