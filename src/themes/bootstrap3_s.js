JSONEditor.defaults.themes.bootstrap3_s = JSONEditor.defaults.themes.bootstrap3.extend({
  createSelect: function(editor){
      var select = document.createElement('select');
      select.style.marginLeft = '1em';
      var comparators = [
          {id:'dontcare', name:"don't care", selected:true},  // don't compare
          {id:'equals', name:'equals'},                       // use strict equals
          {id:'notequals', name:'not equals'}
      ];

      if( !! editor.options.schema.$ref ){
          return null;
      } else if( editor.options.schema.type === 'string' ){
          comparators.push({id:'regex', name:'regex'});       // use regex for compare
      } else if( editor.options.schema.type === 'array' ){
          comparators.push({id:'empty', name:'empty'});
          comparators.push({id:'notempty', name:'not empty'});
          comparators.push({id:'weakequals', name:'weak equals'}); // order doesn't matter for comarison
          comparators.push({id:'actualinwo', name:'all actual in expected w/o ordering'});
          comparators.push({id:'actualino', name:'all actual in expected with ordering'});
          comparators.push({id:'expectedinwo', name:'all expected in actual w/o ordering'});
          comparators.push({id:'expectedino', name:'all expected in actual with ordering'});
      }

      window.jQuery.each(comparators, function(index, item){
          var option = document.createElement('option');
          option.value = item.id;
          option.innerHTML = item.name;
          if( item.selected ){
              option.selected = 'selected';
          }
          select.appendChild(option);
      });
      return select;
  },

  getHeader: function(editor, text) {
    var el = document.createElement('h3');
    el.style.whiteSpace = 'nowrap';
    el.style.display = 'inline';

    if(typeof text === "string") {
      el.textContent = text;
    }
    else {
      el.appendChild(text);
    }

    var select = this.createSelect(editor);
    if( !! select ){
        var div = document.createElement('span');
        div.appendChild(el);
        div.appendChild(this.createSelect(editor));
        return div;
    }
    return el;
  },

  getFormInputLabel: function(editor, text) {
    var el = document.createElement('label');

    el.appendChild(document.createTextNode(text));
    el.appendChild(this.createSelect(editor));

    var btn = '<button class="btn btn-xs btn-add-notes pull-right" name="{text}" style="margin-left: 5px"> <i name="{text}" class="fa fa-sticky-note fa-lg"></i> </button>';
    btn = btn.replace('{text}',text);
    btn = btn.replace('{text}',text);
    el.innerHTML += btn;
    el.className +=' clearfix';
    el.style.width = '100%';
    return el;
  }
});
