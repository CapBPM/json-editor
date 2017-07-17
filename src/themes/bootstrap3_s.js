JSONEditor.defaults.themes.bootstrap3_s = JSONEditor.defaults.themes.bootstrap3.extend({
  createSelect: function(editor){
      var select = document.createElement('select');
      select.style.marginLeft = '1em';
      select.style.border = '1px solid #ccc';
      select.style.borderRadius = '4px';
      select.style.backgroundColor = '#fff';
      select.style.backgroundImage = 'none';
      select.dataset.schemapath =  editor.path;
      select.className = 'comparison';

      var comparators = [
          {id:'dontcare', name:"don't care", selected:true},  // don't compare
          {id:'equals', name:'=='},                       // use strict equals
          {id:'notequals', name:'!='},
          {id:'empty', name:'empty'},
          {id:'notempty', name:"doesn't empty"}
      ];

      if( !! editor.options.schema.$ref ){
          return null;
      } else if( editor.options.schema.type === 'string' ){
          comparators.push({id:'regex', name:'regex'});       // use regex for compare
          comparators.push({id:'contains', name:'contains'});       // use regex for compare
          comparators.push({id:'notcontains', name:"doesn't contain"});       // use regex for compare
      } else if( editor.options.schema.type === 'number' ){
          comparators.push({id:'greater', name:'>'});
          comparators.push({id:'egreater', name:'>='});
          comparators.push({id:'less', name:'<'});
          comparators.push({id:'eless', name:'<='});
      } else if( editor.options.schema.type === 'array' ){
          comparators.push({id:'weakequals', name:'weak equals (without order)'}); // order doesn't matter for comarison
          comparators.push({id:'actualinwo', name:'all actual in expected w/o ordering'});
          comparators.push({id:'actualino', name:'all actual in expected with ordering'});
          comparators.push({id:'expectedinwo', name:'all expected in actual w/o ordering'});
          comparators.push({id:'expectedino', name:'all expected in actual with ordering'});
      }

      window.jQuery.each(comparators, function(index, item){
          var option = document.createElement('option');
          option.value = item.id;
          option.innerHTML = item.name;
          if( !! item.selected ){
              option.selected = 'selected';
          }
          select.appendChild(option);
      });
      return select;
  },

  getTableHeaderCell: function(editor, column_editor, text) {
    var el = document.createElement('th');
    el.style = el.style || {};
    el.appendChild(document.createTextNode(text));

    if(text != ' '){
        el.style.minWidth = '200px';
        el.style.verticalAlign = 'top';
        if( !! column_editor ){
            var select = this.createSelect(column_editor);
            if( !! select ){
                select.style.display = 'block';
                select.style.marginLeft = '';
                el.appendChild(select);
            }
        }
    }

    return el;
  },

  getHeader: function(editor, text) {
    var el = document.createElement('h3');
    el.style.whiteSpace = 'nowrap';
    el.style.display = 'inline-block';

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

    var enumerationBtn = '<button class="btn btn-xs btn-add-enums pull-right" name="{text}" style="margin-left: 5px"> <i name="{text}" class="fa fa-pencil-square-o fa-lg"></i> </button>';
    enumerationBtn = enumerationBtn.replace('{text}',text);
    enumerationBtn = enumerationBtn.replace('{text}',text);
    el.innerHTML += enumerationBtn;

    el.className +=' clearfix';
    el.style.width = '100%';
    return el;
  }
});
