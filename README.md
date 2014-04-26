# NB-CCCP
IPython Notebook Collective Cut-Copy-Paste

Author: [Paul Ivanov](http://github.com/ivanov)

**Installation**

```sh
cd $(ipython locate)/nbextensions
git clone gh:ivanov/nb-cccp
```

And add these lines to your `$(ipython locate profile)/static/custom.js`

```js
require(["nbextensions/nb-cccp"], function (copy_paste) {
    copy_paste.load_ipython_extension();
    console.log('copy_paste extension loaded');
});
```
