JSONEditor.defaults.themes.bootstrap3_s = JSONEditor.defaults.themes.bootstrap3.extend({
  getFormInputLabel: function(text) {
    var el = document.createElement('label');
    var chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.className = 'actual-field';
    el.appendChild(chk);
    el.appendChild(document.createTextNode(text));
    var btn = '<button class="btn btn-xs btn-add-notes pull-right" name="{text}" style="margin-left: 5px"> <i name="{text}" class="fa fa-sticky-note fa-lg"></i> </button>';
    btn = btn.replace('{text}',text);
    btn = btn.replace('{text}',text);
    el.innerHTML += btn;
    el.className +=' clearfix';
    el.style.width = '100%';
    return el;
  }
});
