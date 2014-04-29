# NB-CCCP
IPython Notebook Collective Cut-Copy-Paste

Author: [Paul Ivanov](http://github.com/ivanov)

A working prototype for multi-cell cut-copy-paste in the notebook. This 
functionality will be in the next version of IPython, this is just the first
stab at an implementation so we (and you!) can start playing with it.

![img](https://cloud.githubusercontent.com/assets/118211/2823948/f234fa5c-cf27-11e3-9c14-827250e03277.png)

**Installation**

```sh
cd $(ipython locate)/nbextensions
git clone https://github.com/ivanov/nb-cccp
echo "require(['nbextensions/nb-cccp/copy-paste'], function (copy_paste) {
    copy_paste.load_ipython_extension();
    console.log('copy_paste extension loaded');
    });" >> $(ipython locate profile)/static/custom/custom.js
```

The `echo` lines just add the following javascript to your `$(ipython locate
profile)/static/custom/custom.js`

```js
require(["nbextensions/nb-cccp/copy-paste"], function (copy_paste) {
    copy_paste.load_ipython_extension();
    console.log('copy_paste extension loaded');
});
```

**Usage**
If the installation worked, reload a notebook and you should see a new set of
blue cut/copy/paste icons with a blue border around the button group. 

In *Command Mode*, toggle the selection of individual cells with `Space`,
`Ctrl-Space`, or `Shift-Space`. The selection does not need not be contiguous.
You're welcome ;) 

In fact, just click the `In [ ]` area of code cells and the same place for
markdown cells to toggle selection state.

To the right of the blue CCP action is a blue indicator telling you how many
cells are selected. If you click it, you will unselect all cells.

Using `Shift-Up` and `Shift-Down`, you will toggle the selection status of the
current cell and transition to the next cell.

*NOTE:* Due to the current implementation, you may be surprised that without
having any cells selected, `Shift-Down` `Shift-Up` will actually select **two**
cells. It's easiest to just think of *sweeping* over the cells you want, and
while the `Shift` key is down, you are performing the sweep.

**Limitations**
For now, there are some limitations:

    [ ] only works in the current notebook (not across notebooks)
    [ ] the CCP actions are only triggered via mouseclick on the blue toolbar icons.
    [ ] probably others, let me know

**Feedback**

Please use [IPython issue #5746](https://github.com/ipython/ipython/issues/5746)
for feedback and discussion on the user interface / user experience.
