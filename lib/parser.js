/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"file":3,"world":4,"EOF":5,"/**":6,"tags":7,"panino_and_includes_and_fires":8,"comment":9,"**/":10,"tag_list":11,"tag":12,",":13,"DEPRECATED":14,":":15,"NUMBER":16,"..":17,"READONLY":18,"INTERNAL":19,"CHAINABLE":20,"SECTION":21,"name":22,"ALIASOF":23,"RELATEDTO":24,"BELONGSTO":25,"panino":26,"INCLUDES":27,"names":28,"TEXT":29,"section":30,"namespace":31,"class":32,"mixin":33,"signatures":34,"argument_descriptions":35,"argument_description":36,"*-":37,"NAME":38,"(":39,"names_alternation":40,")":41,"**":42,"):":43,"events":44,"event":45,".":46,"#":47,"@":48,"?":49,"|":50,"value":51,"STRING":52,"BOOLEAN":53,"REGEXP":54,"[":55,"value_list":56,"]":57,"...":58,"{":59,"key_value_list":60,"}":61,"value2":62,"TRUE":63,"FALSE":64,"NULL":65,"key":66,"name_or_value":67,"==":68,"string":69,"CLASS":70,"<":71,"MIXIN":72,"property":73,"->":74,"returns":75,"constant":76,"=":77,"signature":78,"method":79,"NEW":80,"args":81,"arg":82,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"/**",10:"**/",13:",",14:"DEPRECATED",15:":",16:"NUMBER",17:"..",18:"READONLY",19:"INTERNAL",20:"CHAINABLE",21:"SECTION",23:"ALIASOF",24:"RELATEDTO",25:"BELONGSTO",27:"INCLUDES",29:"TEXT",37:"*-",38:"NAME",39:"(",41:")",42:"**",43:"):",46:".",47:"#",48:"@",49:"?",50:"|",52:"STRING",53:"BOOLEAN",54:"REGEXP",55:"[",57:"]",58:"...",59:"{",61:"}",63:"TRUE",64:"FALSE",65:"NULL",68:"==",69:"string",70:"CLASS",71:"<",72:"MIXIN",74:"->",77:"=",80:"NEW"},
productions_: [0,[3,2],[4,0],[4,6],[7,0],[7,1],[11,1],[11,3],[12,1],[12,3],[12,5],[12,1],[12,1],[12,1],[12,3],[12,3],[12,3],[12,3],[8,1],[8,3],[9,0],[9,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,2],[35,1],[35,2],[36,5],[36,5],[36,6],[36,6],[44,1],[44,3],[45,1],[45,3],[22,1],[22,3],[22,3],[22,3],[28,1],[28,3],[40,1],[40,1],[40,3],[51,1],[51,1],[51,1],[51,1],[51,1],[51,3],[51,4],[51,3],[62,1],[62,1],[62,1],[62,1],[62,1],[62,1],[62,1],[62,3],[62,4],[62,3],[56,0],[56,1],[56,3],[60,0],[60,3],[60,5],[66,1],[66,1],[67,1],[30,3],[30,3],[31,1],[32,2],[32,4],[33,2],[73,3],[73,3],[76,3],[34,1],[34,2],[78,1],[78,3],[78,3],[78,1],[78,1],[78,2],[79,4],[79,5],[75,1],[75,1],[75,3],[81,0],[81,1],[81,3],[81,5],[81,4],[82,1],[82,4],[82,3],[82,2]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return this.$ 
break;
case 2: this.$ = {} 
break;
case 3:
    var x = $$[$0-2];
    for (var i in $$[$0-3]) x[i] = $$[$0-3][i];
    // amend description
    var desq = $$[$0-1].text;
    // strip leading *
    desq = desq.replace(/\s*\n\s*\*/g, '\n').replace(/^\*\n*/, ''); 
    // trim leading spaces from description
    var lead = desq.match(/^\s+/);
    if (lead) {
      var re = new RegExp('\n' + lead[0], 'g');
      desq = desq.substring(lead[0].length).replace(re, '\n');
    }
    x.description = desq.trim();
    // short description lasts until the first empty line
    x.short_description = x.description.replace(/\n\n[\s\S]*$/, '\n');
    
    x.ellipsis_description = x.short_description;
    if (x.ellipsis_description.length > 120)
    {
      x.ellipsis_description = x.ellipsis_description.substring(0, 120 - 4) + "..."
    }
    else
      x.ellipsis_description = x.ellipsis_description + " ..."

    x.line = ($$[$0-1].line + 1);
    // register
    if (this.$[x.id]) {
      console.error('FATAL: name clash: ' + x.id);
      process.exit(1);
    }
    this.$[x.id] = x;
    // FIXME: remove once tree is build ok
    /*this.$[x.id] = {
      id: x.id,
      type: x.type,
      section: x.section
    };*/
  
break;
case 4: this.$ = {} 
break;
case 6: this.$ = {}; for (var i in $$[$0]) this.$[i] = $$[$0][i] 
break;
case 7: for (var i in $$[$0]) this.$[i] = $$[$0][i] 
break;
case 8: this.$ = {deprecated: true} 
break;
case 9: this.$ = {deprecated: {from: $$[$0]}} 
break;
case 10: this.$ = {deprecated: {from: $$[$0-2], off: $$[$0]}} 
break;
case 11: this.$ = {readonly: true} 
break;
case 12: this.$ = {internal: true} 
break;
case 13: this.$ = {chainable: true} 
break;
case 14: this.$ = {section: $$[$0]} 
break;
case 15: this.$ = {alias_of: $$[$0]} 
break;
case 16: this.$ = {related_to: $$[$0]} 
break;
case 17: this.$ = {belongs_to: $$[$0]} 
break;
case 19: this.$.included_mixins = $$[$0] 
break;
case 20: this.$ = {text: '', line: yy.lexer.yylloc.last_line} 
break;
case 21: this.$ = {text: $$[$0], line: yy.lexer.yylloc.last_line} 
break;
case 27: this.$.arguments = $$[$0] 
break;
case 28: this.$ = [$$[$0]] 
break;
case 29: this.$.push($$[$0]) 
break;
case 30:
       if (yy.useAsterisk) {
         console.error("FATAL: You can't use dashes for " + $$[$0-3].name);
         process.exit(1);
       }
       this.$ = {name: $$[$0-3], types: $$[$0-1]} 
     
break;
case 31:
       if (yy.useDash) {
         console.error("FATAL: You can't use asterisks for " + $$[$0-3]);
         process.exit(1);
       }
       this.$ = {name: $$[$0-3], types: $$[$0-1]} 
     
break;
case 32:
       if (yy.useAsterisk) {
         console.error("FATAL: You can't use dashes for " + $$[$0-4]);
         process.exit(1);
       }
      this.$ = {
        name: $$[$0-4],
        types: $$[$0-2],
        description: $$[$0].replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
      };
    
break;
case 33:
       if (yy.useDash) {
         console.error("FATAL: You can't use asterisks for " + $$[$0-4]);
         process.exit(1);
       }
      this.$ = {
        name: $$[$0-4],
        types: $$[$0-2],
        description: $$[$0].replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
      };
    
break;
case 34: this.$ = [$$[$0]] 
break;
case 35: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 37: this.$ += $$[$0-1] + $$[$0] 
break;
case 39: this.$ += $$[$0-1] + $$[$0] 
break;
case 40: this.$ += $$[$0-1] + $$[$0] 
break;
case 41: this.$ += $$[$0-1] + $$[$0] 
break;
case 42: this.$ = [$$[$0]] 
break;
case 43: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 44: this.$ = [] 
break;
case 45: this.$ = [$$[$0]] 
break;
case 46: this.$.push($$[$0]) 
break;
case 47: this.$ = String($$[$0]) 
break;
case 48: this.$ = Number($$[$0]) 
break;
case 49: this.$ = $$[$0] === 'true' ? true : false 
break;
case 50: this.$ = new RegExp($$[$0]) 
break;
case 52: this.$ = $$[$0-1]; this.$.array = true 
break;
case 53: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 54: this.$ = $$[$0-1] 
break;
case 55: this.$ = {value: String($$[$0]), type: 'string'} 
break;
case 56: this.$ = {value: Number($$[$0]), type: 'number'} 
break;
case 57: this.$ = {value: true, type: 'boolean'} 
break;
case 58: this.$ = {value: false, type: 'boolean'} 
break;
case 59: this.$ = {value: null, type: 'null'} 
break;
case 60: this.$ = {value: $$[$0], type: 'regexp'} 
break;
case 61: this.$ = {value: $$[$0], type: 'name'} 
break;
case 62: this.$ = $$[$0-1]; this.$.array = true 
break;
case 63: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 64: this.$ = $$[$0-1] 
break;
case 65: this.$ = [] 
break;
case 66: this.$ = [$$[$0]] 
break;
case 67: this.$.push($$[$0]) 
break;
case 68: this.$ = {} 
break;
case 69: this.$ = {}; this.$[$$[$0-2]] = $$[$0] 
break;
case 70: this.$[$$[$0-2]] = $$[$0] 
break;
case 74: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 75: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 76: this.$ = {id: $$[$0], type: 'namespace'}; 
break;
case 77: this.$ = {id: $$[$0], type: 'class'}; 
break;
case 78: this.$ = {id: $$[$0-2], type: 'class', superclass: $$[$0]}; 
break;
case 79: this.$ = {id: $$[$0], type: 'mixin'} 
break;
case 80: 
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 81: 
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 82: this.$ = {id: $$[$0-2], type: 'constant', returns: $$[$0]} 
break;
case 83:
    this.$ = $$[$0];
    this.$.signatures = [{args: $$[$0].args, returns: $$[$0].returns}];
    delete this.$.args;
    delete this.$.returns;
  
break;
case 84:
    this.$.signatures.push({args: $$[$0].args, returns: $$[$0].returns});
    delete this.$.args;
    delete this.$.returns;
  
break;
case 86:
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 87:
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 90: this.$ = $$[$0]; this.$.id = this.$.id + '.' + $$[$0-1]; this.$.type = 'constructor' 
break;
case 91: this.$ = {id: $$[$0-3], type: 'method', args: $$[$0-1]} 
break;
case 92: this.$ = {id: $$[$0-4], type: 'method', args: $$[$0-1], bound: true} 
break;
case 93: this.$ = [{type: '?'}] 
break;
case 94:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$ = [ret];
  
break;
case 95:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$.push(ret);
  
break;
case 96: this.$ = [] 
break;
case 97: this.$ = [$$[$0]] 
break;
case 98: this.$.push($$[$0]) 
break;
case 99:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-4].push(a);
    });
  
break;
case 100:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-3].push(a);
    });
  
break;
case 101: this.$ = {name: $$[$0]} 
break;
case 102: this.$ = {name: $$[$0-3], args: $$[$0-1]} 
break;
case 103: this.$.default_value = $$[$0] 
break;
case 104: this.$.ellipsis = true 
break;
}
},
table: [{3:1,4:2,5:[2,2],6:[2,2]},{1:[3]},{5:[1,3],6:[1,4]},{1:[2,1]},{7:5,11:6,12:7,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],23:[1,13],24:[1,14],25:[1,15],38:[2,4],68:[2,4],70:[2,4],72:[2,4],80:[2,4]},{8:16,22:24,26:17,30:18,31:19,32:20,33:21,34:22,38:[1,28],68:[1,23],70:[1,25],72:[1,26],73:30,76:31,78:27,79:29,80:[1,32]},{13:[1,33],38:[2,5],68:[2,5],70:[2,5],72:[2,5],80:[2,5]},{13:[2,6],38:[2,6],68:[2,6],70:[2,6],72:[2,6],80:[2,6]},{13:[2,8],15:[1,34],38:[2,8],68:[2,8],70:[2,8],72:[2,8],80:[2,8]},{13:[2,11],38:[2,11],68:[2,11],70:[2,11],72:[2,11],80:[2,11]},{13:[2,12],38:[2,12],68:[2,12],70:[2,12],72:[2,12],80:[2,12]},{13:[2,13],38:[2,13],68:[2,13],70:[2,13],72:[2,13],80:[2,13]},{15:[1,35]},{15:[1,36]},{15:[1,37]},{15:[1,38]},{9:39,10:[2,20],29:[1,40]},{10:[2,18],27:[1,41],29:[2,18]},{10:[2,22],27:[2,22],29:[2,22]},{10:[2,23],27:[2,23],29:[2,23]},{10:[2,24],27:[2,24],29:[2,24]},{10:[2,25],27:[2,25],29:[2,25]},{10:[2,26],22:47,27:[2,26],29:[2,26],35:42,36:44,37:[1,45],38:[1,28],42:[1,46],73:30,76:31,78:43,79:29,80:[1,32]},{38:[1,49],69:[1,48]},{10:[2,76],13:[1,55],27:[2,76],29:[2,76],39:[1,53],46:[1,50],47:[1,51],48:[1,52],74:[1,54],77:[1,56]},{22:57,38:[1,28]},{22:58,38:[1,28]},{10:[2,83],27:[2,83],29:[2,83],37:[2,83],38:[2,83],42:[2,83],80:[2,83]},{10:[2,38],13:[2,38],27:[2,38],29:[2,38],37:[2,38],38:[2,38],39:[2,38],41:[2,38],42:[2,38],43:[2,38],46:[2,38],47:[2,38],48:[2,38],50:[2,38],55:[2,38],57:[2,38],58:[2,38],61:[2,38],68:[2,38],70:[2,38],71:[2,38],72:[2,38],74:[2,38],77:[2,38],80:[2,38]},{10:[2,85],13:[1,59],27:[2,85],29:[2,85],37:[2,85],38:[2,85],42:[2,85],74:[1,60],80:[2,85]},{10:[2,88],27:[2,88],29:[2,88],37:[2,88],38:[2,88],42:[2,88],80:[2,88]},{10:[2,89],27:[2,89],29:[2,89],37:[2,89],38:[2,89],42:[2,89],80:[2,89]},{22:62,38:[1,28],79:61},{12:63,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],23:[1,13],24:[1,14],25:[1,15]},{16:[1,64]},{22:65,38:[1,28]},{22:66,38:[1,28]},{22:67,38:[1,28]},{22:68,38:[1,28]},{10:[1,69]},{10:[2,21]},{22:71,28:70,38:[1,28]},{10:[2,27],27:[2,27],29:[2,27],36:72,37:[1,45],42:[1,46]},{10:[2,84],27:[2,84],29:[2,84],37:[2,84],38:[2,84],42:[2,84],80:[2,84]},{10:[2,28],27:[2,28],29:[2,28],37:[2,28],42:[2,28]},{38:[1,73]},{38:[1,74]},{13:[1,55],39:[1,53],46:[1,50],47:[1,51],48:[1,52],74:[1,54],77:[1,56]},{68:[1,75]},{68:[1,76]},{38:[1,77]},{38:[1,78]},{38:[1,79]},{13:[2,96],38:[1,83],41:[2,96],48:[1,81],55:[2,96],81:80,82:82},{16:[1,89],22:92,38:[1,28],49:[1,85],51:87,52:[1,88],53:[1,90],54:[1,91],55:[1,93],59:[1,94],67:86,75:84},{16:[1,89],22:92,38:[1,28],49:[1,85],51:87,52:[1,88],53:[1,90],54:[1,91],55:[1,93],59:[1,94],67:86,75:95},{16:[1,89],22:92,38:[1,28],49:[1,85],51:87,52:[1,88],53:[1,90],54:[1,91],55:[1,93],59:[1,94],67:86,75:96},{10:[2,77],27:[2,77],29:[2,77],46:[1,50],47:[1,51],48:[1,52],71:[1,97]},{10:[2,79],27:[2,79],29:[2,79],46:[1,50],47:[1,51],48:[1,52]},{16:[1,89],22:92,38:[1,28],49:[1,85],51:87,52:[1,88],53:[1,90],54:[1,91],55:[1,93],59:[1,94],67:86,75:98},{16:[1,89],22:92,38:[1,28],49:[1,85],51:87,52:[1,88],53:[1,90],54:[1,91],55:[1,93],59:[1,94],67:86,75:99},{10:[2,90],27:[2,90],29:[2,90],37:[2,90],38:[2,90],42:[2,90],80:[2,90]},{39:[1,53],46:[1,50],47:[1,51],48:[1,52]},{13:[2,7],38:[2,7],68:[2,7],70:[2,7],72:[2,7],80:[2,7]},{13:[2,9],17:[1,100],38:[2,9],68:[2,9],70:[2,9],72:[2,9],80:[2,9]},{13:[2,14],38:[2,14],46:[1,50],47:[1,51],48:[1,52],68:[2,14],70:[2,14],72:[2,14],80:[2,14]},{13:[2,15],38:[2,15],46:[1,50],47:[1,51],48:[1,52],68:[2,15],70:[2,15],72:[2,15],80:[2,15]},{13:[2,16],38:[2,16],46:[1,50],47:[1,51],48:[1,52],68:[2,16],70:[2,16],72:[2,16],80:[2,16]},{13:[2,17],38:[2,17],46:[1,50],47:[1,51],48:[1,52],68:[2,17],70:[2,17],72:[2,17],80:[2,17]},{5:[2,3],6:[2,3]},{10:[2,19],13:[1,101],29:[2,19]},{10:[2,42],13:[2,42],29:[2,42],46:[1,50],47:[1,51],48:[1,52]},{10:[2,29],27:[2,29],29:[2,29],37:[2,29],42:[2,29]},{39:[1,102]},{39:[1,103]},{10:[2,74],27:[2,74],29:[2,74]},{10:[2,75],27:[2,75],29:[2,75]},{10:[2,39],13:[2,39],27:[2,39],29:[2,39],37:[2,39],38:[2,39],39:[2,39],41:[2,39],42:[2,39],43:[2,39],46:[2,39],47:[2,39],48:[2,39],50:[2,39],55:[2,39],57:[2,39],58:[2,39],61:[2,39],68:[2,39],70:[2,39],71:[2,39],72:[2,39],74:[2,39],77:[2,39],80:[2,39]},{10:[2,40],13:[2,40],27:[2,40],29:[2,40],37:[2,40],38:[2,40],39:[2,40],41:[2,40],42:[2,40],43:[2,40],46:[2,40],47:[2,40],48:[2,40],50:[2,40],55:[2,40],57:[2,40],58:[2,40],61:[2,40],68:[2,40],70:[2,40],71:[2,40],72:[2,40],74:[2,40],77:[2,40],80:[2,40]},{10:[2,41],13:[2,41],27:[2,41],29:[2,41],37:[2,41],38:[2,41],39:[2,41],41:[2,41],42:[2,41],43:[2,41],46:[2,41],47:[2,41],48:[2,41],50:[2,41],55:[2,41],57:[2,41],58:[2,41],61:[2,41],68:[2,41],70:[2,41],71:[2,41],72:[2,41],74:[2,41],77:[2,41],80:[2,41]},{13:[1,105],41:[1,104],55:[1,106]},{13:[2,96],38:[1,83],41:[2,96],55:[2,96],81:107,82:82},{13:[2,97],41:[2,97],55:[2,97],57:[2,97],58:[1,109],77:[1,108]},{13:[2,101],39:[1,110],41:[2,101],55:[2,101],57:[2,101],58:[2,101],77:[2,101]},{10:[2,80],27:[2,80],29:[2,80],37:[2,80],38:[2,80],42:[2,80],50:[1,111],80:[2,80]},{10:[2,93],27:[2,93],29:[2,93],37:[2,93],38:[2,93],42:[2,93],50:[2,93],80:[2,93]},{10:[2,94],27:[2,94],29:[2,94],37:[2,94],38:[2,94],42:[2,94],50:[2,94],80:[2,94]},{10:[2,73],13:[2,73],27:[2,73],29:[2,73],37:[2,73],38:[2,73],41:[2,73],42:[2,73],50:[2,73],55:[2,73],57:[2,73],58:[2,73],77:[2,73],80:[2,73]},{10:[2,47],13:[2,47],27:[2,47],29:[2,47],37:[2,47],38:[2,47],41:[2,47],42:[2,47],50:[2,47],55:[2,47],57:[2,47],58:[2,47],61:[2,47],77:[2,47],80:[2,47]},{10:[2,48],13:[2,48],27:[2,48],29:[2,48],37:[2,48],38:[2,48],41:[2,48],42:[2,48],50:[2,48],55:[2,48],57:[2,48],58:[2,48],61:[2,48],77:[2,48],80:[2,48]},{10:[2,49],13:[2,49],27:[2,49],29:[2,49],37:[2,49],38:[2,49],41:[2,49],42:[2,49],50:[2,49],55:[2,49],57:[2,49],58:[2,49],61:[2,49],77:[2,49],80:[2,49]},{10:[2,50],13:[2,50],27:[2,50],29:[2,50],37:[2,50],38:[2,50],41:[2,50],42:[2,50],50:[2,50],55:[2,50],57:[2,50],58:[2,50],61:[2,50],77:[2,50],80:[2,50]},{10:[2,51],13:[2,51],27:[2,51],29:[2,51],37:[2,51],38:[2,51],41:[2,51],42:[2,51],46:[1,50],47:[1,51],48:[1,52],50:[2,51],55:[2,51],57:[2,51],58:[2,51],61:[2,51],77:[2,51],80:[2,51]},{13:[2,65],16:[1,89],22:92,38:[1,28],51:113,52:[1,88],53:[1,90],54:[1,91],55:[1,93],56:112,57:[2,65],58:[2,65],59:[1,94]},{13:[2,68],38:[1,117],52:[1,116],60:114,61:[2,68],66:115},{10:[2,81],27:[2,81],29:[2,81],37:[2,81],38:[2,81],42:[2,81],50:[1,111],80:[2,81]},{10:[2,82],27:[2,82],29:[2,82],37:[2,82],38:[2,82],42:[2,82],50:[1,111],80:[2,82]},{22:118,38:[1,28]},{10:[2,86],27:[2,86],29:[2,86],37:[2,86],38:[2,86],42:[2,86],50:[1,111],80:[2,86]},{10:[2,87],27:[2,87],29:[2,87],37:[2,87],38:[2,87],42:[2,87],50:[1,111],80:[2,87]},{16:[1,119]},{22:120,38:[1,28]},{22:123,38:[1,28],40:121,49:[1,122]},{22:123,38:[1,28],40:124,49:[1,122]},{10:[2,91],13:[2,91],27:[2,91],29:[2,91],37:[2,91],38:[2,91],42:[2,91],74:[2,91],80:[2,91]},{38:[1,83],55:[1,126],82:125},{13:[2,96],38:[1,83],55:[2,96],57:[2,96],81:127,82:82},{13:[1,105],41:[1,128],55:[1,106]},{16:[1,89],22:92,38:[1,28],51:87,52:[1,88],53:[1,90],54:[1,91],55:[1,93],59:[1,94],67:129},{13:[2,104],41:[2,104],55:[2,104],57:[2,104],58:[2,104],77:[2,104]},{13:[2,96],38:[1,83],41:[2,96],55:[2,96],81:130,82:82},{16:[1,89],22:92,38:[1,28],51:87,52:[1,88],53:[1,90],54:[1,91],55:[1,93],59:[1,94],67:131},{13:[1,134],57:[1,132],58:[1,133]},{13:[2,66],57:[2,66],58:[2,66]},{13:[1,136],61:[1,135]},{15:[1,137]},{15:[2,71]},{15:[2,72]},{10:[2,78],27:[2,78],29:[2,78],46:[1,50],47:[1,51],48:[1,52]},{13:[2,10],38:[2,10],68:[2,10],70:[2,10],72:[2,10],80:[2,10]},{10:[2,43],13:[2,43],29:[2,43],46:[1,50],47:[1,51],48:[1,52]},{41:[1,138],43:[1,139],50:[1,140]},{41:[2,44],43:[2,44],50:[2,44]},{41:[2,45],43:[2,45],46:[1,50],47:[1,51],48:[1,52],50:[2,45]},{41:[1,141],43:[1,142],50:[1,140]},{13:[2,98],41:[2,98],55:[2,98],57:[2,98],58:[1,109],77:[1,108]},{13:[2,96],38:[1,83],55:[2,96],57:[2,96],81:143,82:82},{13:[1,105],55:[1,106],57:[1,144]},{10:[2,92],13:[2,92],27:[2,92],29:[2,92],37:[2,92],38:[2,92],42:[2,92],74:[2,92],80:[2,92]},{13:[2,103],41:[2,103],55:[2,103],57:[2,103],58:[2,103],77:[2,103]},{13:[1,105],41:[1,145],55:[1,106]},{10:[2,95],27:[2,95],29:[2,95],37:[2,95],38:[2,95],42:[2,95],50:[2,95],80:[2,95]},{10:[2,52],13:[2,52],27:[2,52],29:[2,52],37:[2,52],38:[2,52],41:[2,52],42:[2,52],50:[2,52],55:[2,52],57:[2,52],58:[2,52],61:[2,52],77:[2,52],80:[2,52]},{57:[1,146]},{16:[1,89],22:92,38:[1,28],51:147,52:[1,88],53:[1,90],54:[1,91],55:[1,93],59:[1,94]},{10:[2,54],13:[2,54],27:[2,54],29:[2,54],37:[2,54],38:[2,54],41:[2,54],42:[2,54],50:[2,54],55:[2,54],57:[2,54],58:[2,54],61:[2,54],77:[2,54],80:[2,54]},{38:[1,117],52:[1,116],66:148},{16:[1,89],22:92,38:[1,28],51:149,52:[1,88],53:[1,90],54:[1,91],55:[1,93],59:[1,94]},{10:[2,30],27:[2,30],29:[2,30],37:[2,30],42:[2,30]},{29:[1,150]},{22:151,38:[1,28]},{10:[2,31],27:[2,31],29:[2,31],37:[2,31],42:[2,31]},{29:[1,152]},{13:[1,105],55:[1,106],57:[1,153]},{13:[2,100],41:[2,100],55:[2,100],57:[2,100]},{13:[2,102],41:[2,102],55:[2,102],57:[2,102],58:[2,102],77:[2,102]},{10:[2,53],13:[2,53],27:[2,53],29:[2,53],37:[2,53],38:[2,53],41:[2,53],42:[2,53],50:[2,53],55:[2,53],57:[2,53],58:[2,53],61:[2,53],77:[2,53],80:[2,53]},{13:[2,67],57:[2,67],58:[2,67]},{15:[1,154]},{13:[2,69],61:[2,69]},{10:[2,32],27:[2,32],29:[2,32],37:[2,32],42:[2,32]},{41:[2,46],43:[2,46],46:[1,50],47:[1,51],48:[1,52],50:[2,46]},{10:[2,33],27:[2,33],29:[2,33],37:[2,33],42:[2,33]},{13:[2,99],41:[2,99],55:[2,99],57:[2,99]},{16:[1,89],22:92,38:[1,28],51:155,52:[1,88],53:[1,90],54:[1,91],55:[1,93],59:[1,94]},{13:[2,70],61:[2,70]}],
defaultActions: {3:[2,1],40:[2,21],116:[2,71],117:[2,72]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        _handle_error:
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + this.terminals_[symbol]+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/\n.*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
            this.yytext += match[0];
            this.match += match[0];
            this.yyleng = this.yytext.length;
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:return 5
break;
case 1:/* skip whitespaces */
break;
case 2:this.begin('tags'); return 6
break;
case 3:/* skip vanilla code */
break;
case 4:this.popState(); return 10
break;
case 5:this.popState(); this.begin('def')
break;
case 6:return 13 /* list separator */
break;
case 7:return 15 /* key/value delimiter */
break;
case 8:return 17 /* range */
break;
case 9:return 47
break;
case 10:return 46
break;
case 11:/* skip whitespaces */
break;
case 12:return 16
break;
case 13:return 14
break;
case 14:return 18
break;
case 15:return 19
break;
case 16:return 20
break;
case 17:return 21
break;
case 18:return 23
break;
case 19:/* N.B. shouldn't it be ALIAS, and reversed sense */ return 23
break;
case 20:return 24
break;
case 21:return 25
break;
case 22:return 38
break;
case 23:return 52
break;
case 24:this.popState(); return 10
break;
case 25:return 29
break;
case 26:/* skip whitespaces */
break;
case 27:this.begin('arg'); return 43
break;
case 28:return 42
break;
case 29:return 37
break;
case 30:return 'FIRES'
break;
case 31:return 27
break;
case 32:/*return '*'*/
break;
case 33:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 52
break;
case 34:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 52
break;
case 35:return 16
break;
case 36:return 54
break;
case 37:return 53
break;
case 38:return 53
break;
case 39:return 47
break;
case 40:return 48
break;
case 41:return 49
break;
case 42:return 58
break;
case 43:return 46
break;
case 44:return 13
break;
case 45:return 74
break;
case 46:return 68
break;
case 47:return 77
break;
case 48:return 71
break;
case 49:return 15
break;
case 50:return 39
break;
case 51:return 41
break;
case 52:return 55
break;
case 53:return 57
break;
case 54:return 59
break;
case 55:return 61
break;
case 56:return 50
break;
case 57:return 70
break;
case 58:return 72
break;
case 59:return 80
break;
case 60:return 38
break;
case 61:return 52
break;
case 62:this.popState(); return 29
break;
case 63:this.popState(); console.log('LEFTCOMM'); return 29
break;
}
};
lexer.rules = [/^$/,/^\s+/,/^\/\*\*(?=([^/]))/,/^.*/,/^\*\*\//,/^\s*[\n]/,/^, /,/^: /,/^\.\./,/^#/,/^\./,/^\s+/,/^-?(?:[0-9]|[1-9][0-9]+)(?:\.[\.0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,/^deprecated\b/,/^read-only\b/,/^internal\b/,/^chainable\b/,/^section\b/,/^alias of\b/,/^alias\b/,/^related to\b/,/^belongs to\b/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9]*)/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9 ]*)/,/^\*\*\//,/^\*\s*?[\n][\s\S]*?(?=\*\*\/)/,/^\s+/,/^\)\s*:/,/^\*\s*\*/,/^\*\s*-/,/^\*\s*fires\b/,/^\*\s*includes\b/,/^\*/,/^"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,/^'(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^'\\])*'/,/^-?(?:[0-9]|[1-9][0-9]+)(?:\.[\.0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,/^\/(?:[^\/]|\\\/)*\/[gim]*/,/^true\b/,/^false\b/,/^#/,/^@/,/^\?/,/^\.\.\./,/^\./,/^,/,/^->/,/^==/,/^=/,/^</,/^:/,/^\(/,/^\)/,/^\[/,/^\]/,/^\{/,/^\}/,/^\|/,/^class\b/,/^mixin\b/,/^new\b/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9]*)/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9 ]*)/,/^[\s\S]*?(?=(\*\s*[-\n]))/,/^[\s\S]*?(?=\*\*\/)/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3],"inclusive":true},"tags":{"rules":[0,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],"inclusive":false},"def":{"rules":[0,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61],"inclusive":false},"arg":{"rules":[0,62],"inclusive":false},"comment":{"rules":[0,63],"inclusive":false}};
return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}