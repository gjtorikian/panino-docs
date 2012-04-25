/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"file":3,"world":4,"EOF":5,"/**":6,"tags":7,"panino_and_includes_and_fires":8,"comment":9,"**/":10,"tag_list":11,"tag":12,",":13,"DEPRECATED":14,":":15,"NUMBER":16,"..":17,"READONLY":18,"INTERNAL":19,"HIDE":20,"CHAINABLE":21,"SECTION":22,"name":23,"ALIASOF":24,"RELATEDTO":25,"BELONGSTO":26,"EXTENSION":27,"panino":28,"INCLUDES":29,"names":30,"TEXT":31,"section":32,"namespace":33,"class":34,"mixin":35,"signatures":36,"argument_descriptions":37,"return_descriptions":38,"argument_description":39,"*-":40,"NAME":41,"(":42,"names_alternation":43,")":44,"**":45,"):":46,"return_description":47,"*+":48,"events":49,"event":50,".":51,"#":52,"@":53,"?":54,"`":55,"[":56,"]":57,"|":58,"value":59,"STRING":60,"BOOLEAN":61,"REGEXP":62,"value_list":63,"...":64,"{":65,"key_value_list":66,"}":67,"value2":68,"TRUE":69,"FALSE":70,"NULL":71,"key":72,"name_or_value":73,"==":74,"string":75,"CLASS":76,"<":77,"MIXIN":78,"property":79,"->":80,"returns":81,"constant":82,"=":83,"signature":84,"method":85,"NEW":86,"args":87,"arg":88,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"/**",10:"**/",13:",",14:"DEPRECATED",15:":",16:"NUMBER",17:"..",18:"READONLY",19:"INTERNAL",20:"HIDE",21:"CHAINABLE",22:"SECTION",24:"ALIASOF",25:"RELATEDTO",26:"BELONGSTO",27:"EXTENSION",29:"INCLUDES",31:"TEXT",40:"*-",41:"NAME",42:"(",44:")",45:"**",46:"):",48:"*+",51:".",52:"#",53:"@",54:"?",55:"`",56:"[",57:"]",58:"|",60:"STRING",61:"BOOLEAN",62:"REGEXP",64:"...",65:"{",67:"}",69:"TRUE",70:"FALSE",71:"NULL",74:"==",75:"string",76:"CLASS",77:"<",78:"MIXIN",80:"->",83:"=",86:"NEW"},
productions_: [0,[3,2],[4,0],[4,6],[7,0],[7,1],[11,1],[11,3],[12,1],[12,3],[12,5],[12,1],[12,1],[12,1],[12,1],[12,3],[12,3],[12,3],[12,3],[12,1],[8,1],[8,3],[9,0],[9,1],[28,1],[28,1],[28,1],[28,1],[28,1],[28,2],[28,2],[28,3],[37,1],[37,2],[39,5],[39,5],[39,6],[39,6],[38,1],[38,2],[47,4],[47,5],[49,1],[49,3],[50,1],[50,3],[23,1],[23,3],[23,3],[23,3],[30,1],[30,3],[43,1],[43,1],[43,3],[43,3],[43,3],[59,1],[59,1],[59,1],[59,1],[59,1],[59,3],[59,4],[59,3],[68,1],[68,1],[68,1],[68,1],[68,1],[68,1],[68,1],[68,3],[68,4],[68,3],[63,0],[63,1],[63,3],[66,0],[66,3],[66,5],[72,1],[72,1],[73,1],[32,3],[32,3],[33,1],[34,2],[34,4],[35,2],[79,3],[79,3],[82,3],[36,1],[36,2],[84,1],[84,3],[84,3],[84,1],[84,1],[84,2],[85,4],[85,5],[81,1],[81,1],[81,3],[87,0],[87,1],[87,3],[87,5],[87,4],[88,1],[88,4],[88,3],[88,2]],
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

    // trim leading spaces from description (might be buggy with namp, consider removing)
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
case 13: this.$ = {hide: true} 
break;
case 14: this.$ = {chainable: true} 
break;
case 15: this.$ = {section: $$[$0]} 
break;
case 16: this.$ = {alias_of: $$[$0]} 
break;
case 17: this.$ = {related_to: $$[$0]} 
break;
case 18: this.$ = {belongs_to: $$[$0]} 
break;
case 19: this.$ = {extension: true} 
break;
case 21: this.$.included_mixins = $$[$0] 
break;
case 22: this.$ = {text: '', line: yy.lexer.yylloc.last_line} 
break;
case 23: this.$ = {text: $$[$0], line: yy.lexer.yylloc.last_line} 
break;
case 29: this.$.arguments = $$[$0] 
break;
case 30: this.$.retDesc = $$[$0] 
break;
case 31: this.$.arguments = $$[$0-1]; this.$.retDesc = $$[$0] 
break;
case 32: this.$ = [$$[$0]] 
break;
case 33: this.$.push($$[$0]) 
break;
case 34:
       if (yy.useAsterisk) {
         console.error("FATAL: You can't use dashes for " + $$[$0-3].name);
         process.exit(1);
       }
       this.$ = {name: $$[$0-3], types: $$[$0-1]} 
     
break;
case 35:
       if (yy.useDash) {
         console.error("FATAL: You can't use asterisks for " + $$[$0-3]);
         process.exit(1);
       }
       this.$ = {name: $$[$0-3], types: $$[$0-1]} 
     
break;
case 36:
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
case 37:
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
case 38: this.$ = [$$[$0]] 
break;
case 39: this.$.push($$[$0]) 
break;
case 40:
       this.$ = { types: $$[$0-1]} 
     
break;
case 41:
      this.$ = {
        types: $$[$0-2],
        isArray: $$[$0-2].isArray,
        description: $$[$0].replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
      };
     
break;
case 42: this.$ = [$$[$0]] 
break;
case 43: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 45: this.$ += $$[$0-1] + $$[$0] 
break;
case 47: this.$ += $$[$0-1] + $$[$0] 
break;
case 48: this.$ += $$[$0-1] + $$[$0] 
break;
case 49: this.$ += $$[$0-1] + $$[$0] 
break;
case 50: this.$ = [$$[$0]] 
break;
case 51: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 52: this.$ = [] 
break;
case 53: this.$ = [$$[$0]] 
break;
case 54: this.$ = [$$[$0-1]] 
break;
case 55: this.$ = [$$[$0-1]]; this.$.isArray = true 
break;
case 56: this.$.push($$[$0]) 
break;
case 57: this.$ = String($$[$0]) 
break;
case 58: this.$ = Number($$[$0]) 
break;
case 59: this.$ = $$[$0] === 'true' ? true : false 
break;
case 60: this.$ = new RegExp($$[$0]) 
break;
case 62: this.$ = $$[$0-1]; this.$.array = true 
break;
case 63: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 64: this.$ = $$[$0-1] 
break;
case 65: this.$ = {value: String($$[$0]), type: 'string'} 
break;
case 66: this.$ = {value: Number($$[$0]), type: 'number'} 
break;
case 67: this.$ = {value: true, type: 'boolean'} 
break;
case 68: this.$ = {value: false, type: 'boolean'} 
break;
case 69: this.$ = {value: null, type: 'null'} 
break;
case 70: this.$ = {value: $$[$0], type: 'regexp'} 
break;
case 71: this.$ = {value: $$[$0], type: 'name'} 
break;
case 72: this.$ = $$[$0-1]; this.$.array = true 
break;
case 73: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 74: this.$ = $$[$0-1] 
break;
case 75: this.$ = [] 
break;
case 76: this.$ = [$$[$0]] 
break;
case 77: this.$.push($$[$0]) 
break;
case 78: this.$ = {} 
break;
case 79: this.$ = {}; this.$[$$[$0-2]] = $$[$0] 
break;
case 80: this.$[$$[$0-2]] = $$[$0] 
break;
case 84: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 85: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 86: this.$ = {id: $$[$0], type: 'namespace'}; 
break;
case 87: this.$ = {id: $$[$0], type: 'class'}; 
break;
case 88: this.$ = {id: $$[$0-2], type: 'class', superclass: $$[$0]}; 
break;
case 89: this.$ = {id: $$[$0], type: 'mixin'} 
break;
case 90: 
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 91: 
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 92: this.$ = {id: $$[$0-2], type: 'constant', returns: $$[$0]} 
break;
case 93:
    this.$ = $$[$0];
    this.$.signatures = [{args: $$[$0].args, returns: $$[$0].returns}];
    delete this.$.args;
    delete this.$.returns;
  
break;
case 94:
    this.$.signatures.push({args: $$[$0].args, returns: $$[$0].returns});
    delete this.$.args;
    delete this.$.returns;
  
break;
case 96:
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 97:
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 100: this.$ = $$[$0]; this.$.id = this.$.id + '.' + $$[$0-1]; this.$.type = 'constructor' 
break;
case 101: this.$ = {id: $$[$0-3], type: 'method', args: $$[$0-1]} 
break;
case 102: this.$ = {id: $$[$0-4], type: 'method', args: $$[$0-1], bound: true} 
break;
case 103: this.$ = [{type: '?'}] 
break;
case 104:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$ = [ret];
  
break;
case 105:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$.push(ret);
  
break;
case 106: this.$ = [] 
break;
case 107: this.$ = [$$[$0]] 
break;
case 108: this.$.push($$[$0]) 
break;
case 109:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-4].push(a);
    });
  
break;
case 110:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-3].push(a);
    });
  
break;
case 111: this.$ = {name: $$[$0]} 
break;
case 112: this.$ = {name: $$[$0-3], args: $$[$0-1]} 
break;
case 113: this.$.default_value = $$[$0] 
break;
case 114: this.$.ellipsis = true 
break;
}
},
table: [{3:1,4:2,5:[2,2],6:[2,2]},{1:[3]},{5:[1,3],6:[1,4]},{1:[2,1]},{7:5,11:6,12:7,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],22:[1,13],24:[1,14],25:[1,15],26:[1,16],27:[1,17],41:[2,4],74:[2,4],76:[2,4],78:[2,4],86:[2,4]},{8:18,23:26,28:19,32:20,33:21,34:22,35:23,36:24,41:[1,30],74:[1,25],76:[1,27],78:[1,28],79:32,82:33,84:29,85:31,86:[1,34]},{13:[1,35],41:[2,5],74:[2,5],76:[2,5],78:[2,5],86:[2,5]},{13:[2,6],41:[2,6],74:[2,6],76:[2,6],78:[2,6],86:[2,6]},{13:[2,8],15:[1,36],41:[2,8],74:[2,8],76:[2,8],78:[2,8],86:[2,8]},{13:[2,11],41:[2,11],74:[2,11],76:[2,11],78:[2,11],86:[2,11]},{13:[2,12],41:[2,12],74:[2,12],76:[2,12],78:[2,12],86:[2,12]},{13:[2,13],41:[2,13],74:[2,13],76:[2,13],78:[2,13],86:[2,13]},{13:[2,14],41:[2,14],74:[2,14],76:[2,14],78:[2,14],86:[2,14]},{15:[1,37]},{15:[1,38]},{15:[1,39]},{15:[1,40]},{13:[2,19],41:[2,19],74:[2,19],76:[2,19],78:[2,19],86:[2,19]},{9:41,10:[2,22],31:[1,42]},{10:[2,20],29:[1,43],31:[2,20]},{10:[2,24],29:[2,24],31:[2,24]},{10:[2,25],29:[2,25],31:[2,25]},{10:[2,26],29:[2,26],31:[2,26]},{10:[2,27],29:[2,27],31:[2,27]},{10:[2,28],23:52,29:[2,28],31:[2,28],37:44,38:45,39:47,40:[1,49],41:[1,30],45:[1,50],47:48,48:[1,51],79:32,82:33,84:46,85:31,86:[1,34]},{41:[1,54],75:[1,53]},{10:[2,86],13:[1,60],29:[2,86],31:[2,86],42:[1,58],51:[1,55],52:[1,56],53:[1,57],80:[1,59],83:[1,61]},{23:62,41:[1,30]},{23:63,41:[1,30]},{10:[2,93],29:[2,93],31:[2,93],40:[2,93],41:[2,93],45:[2,93],48:[2,93],86:[2,93]},{10:[2,46],13:[2,46],29:[2,46],31:[2,46],40:[2,46],41:[2,46],42:[2,46],44:[2,46],45:[2,46],46:[2,46],48:[2,46],51:[2,46],52:[2,46],53:[2,46],55:[2,46],56:[2,46],57:[2,46],58:[2,46],64:[2,46],67:[2,46],74:[2,46],76:[2,46],77:[2,46],78:[2,46],80:[2,46],83:[2,46],86:[2,46]},{10:[2,95],13:[1,64],29:[2,95],31:[2,95],40:[2,95],41:[2,95],45:[2,95],48:[2,95],80:[1,65],86:[2,95]},{10:[2,98],29:[2,98],31:[2,98],40:[2,98],41:[2,98],45:[2,98],48:[2,98],86:[2,98]},{10:[2,99],29:[2,99],31:[2,99],40:[2,99],41:[2,99],45:[2,99],48:[2,99],86:[2,99]},{23:67,41:[1,30],85:66},{12:68,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],22:[1,13],24:[1,14],25:[1,15],26:[1,16],27:[1,17]},{16:[1,69]},{23:70,41:[1,30]},{23:71,41:[1,30]},{23:72,41:[1,30]},{23:73,41:[1,30]},{10:[1,74]},{10:[2,23]},{23:76,30:75,41:[1,30]},{10:[2,29],29:[2,29],31:[2,29],38:77,39:78,40:[1,49],45:[1,50],47:48,48:[1,51]},{10:[2,30],29:[2,30],31:[2,30],47:79,48:[1,51]},{10:[2,94],29:[2,94],31:[2,94],40:[2,94],41:[2,94],45:[2,94],48:[2,94],86:[2,94]},{10:[2,32],29:[2,32],31:[2,32],40:[2,32],45:[2,32],48:[2,32]},{10:[2,38],29:[2,38],31:[2,38],48:[2,38]},{41:[1,80]},{41:[1,81]},{42:[1,82]},{13:[1,60],42:[1,58],51:[1,55],52:[1,56],53:[1,57],80:[1,59],83:[1,61]},{74:[1,83]},{74:[1,84]},{41:[1,85]},{41:[1,86]},{41:[1,87]},{13:[2,106],41:[1,91],44:[2,106],53:[1,89],56:[2,106],87:88,88:90},{16:[1,97],23:100,41:[1,30],54:[1,93],56:[1,101],59:95,60:[1,96],61:[1,98],62:[1,99],65:[1,102],73:94,81:92},{16:[1,97],23:100,41:[1,30],54:[1,93],56:[1,101],59:95,60:[1,96],61:[1,98],62:[1,99],65:[1,102],73:94,81:103},{16:[1,97],23:100,41:[1,30],54:[1,93],56:[1,101],59:95,60:[1,96],61:[1,98],62:[1,99],65:[1,102],73:94,81:104},{10:[2,87],29:[2,87],31:[2,87],51:[1,55],52:[1,56],53:[1,57],77:[1,105]},{10:[2,89],29:[2,89],31:[2,89],51:[1,55],52:[1,56],53:[1,57]},{16:[1,97],23:100,41:[1,30],54:[1,93],56:[1,101],59:95,60:[1,96],61:[1,98],62:[1,99],65:[1,102],73:94,81:106},{16:[1,97],23:100,41:[1,30],54:[1,93],56:[1,101],59:95,60:[1,96],61:[1,98],62:[1,99],65:[1,102],73:94,81:107},{10:[2,100],29:[2,100],31:[2,100],40:[2,100],41:[2,100],45:[2,100],48:[2,100],86:[2,100]},{42:[1,58],51:[1,55],52:[1,56],53:[1,57]},{13:[2,7],41:[2,7],74:[2,7],76:[2,7],78:[2,7],86:[2,7]},{13:[2,9],17:[1,108],41:[2,9],74:[2,9],76:[2,9],78:[2,9],86:[2,9]},{13:[2,15],41:[2,15],51:[1,55],52:[1,56],53:[1,57],74:[2,15],76:[2,15],78:[2,15],86:[2,15]},{13:[2,16],41:[2,16],51:[1,55],52:[1,56],53:[1,57],74:[2,16],76:[2,16],78:[2,16],86:[2,16]},{13:[2,17],41:[2,17],51:[1,55],52:[1,56],53:[1,57],74:[2,17],76:[2,17],78:[2,17],86:[2,17]},{13:[2,18],41:[2,18],51:[1,55],52:[1,56],53:[1,57],74:[2,18],76:[2,18],78:[2,18],86:[2,18]},{5:[2,3],6:[2,3]},{10:[2,21],13:[1,109],31:[2,21]},{10:[2,50],13:[2,50],31:[2,50],51:[1,55],52:[1,56],53:[1,57]},{10:[2,31],29:[2,31],31:[2,31],47:79,48:[1,51]},{10:[2,33],29:[2,33],31:[2,33],40:[2,33],45:[2,33],48:[2,33]},{10:[2,39],29:[2,39],31:[2,39],48:[2,39]},{42:[1,110]},{42:[1,111]},{23:114,41:[1,30],43:112,54:[1,113],55:[1,115],56:[1,116]},{10:[2,84],29:[2,84],31:[2,84]},{10:[2,85],29:[2,85],31:[2,85]},{10:[2,47],13:[2,47],29:[2,47],31:[2,47],40:[2,47],41:[2,47],42:[2,47],44:[2,47],45:[2,47],46:[2,47],48:[2,47],51:[2,47],52:[2,47],53:[2,47],55:[2,47],56:[2,47],57:[2,47],58:[2,47],64:[2,47],67:[2,47],74:[2,47],76:[2,47],77:[2,47],78:[2,47],80:[2,47],83:[2,47],86:[2,47]},{10:[2,48],13:[2,48],29:[2,48],31:[2,48],40:[2,48],41:[2,48],42:[2,48],44:[2,48],45:[2,48],46:[2,48],48:[2,48],51:[2,48],52:[2,48],53:[2,48],55:[2,48],56:[2,48],57:[2,48],58:[2,48],64:[2,48],67:[2,48],74:[2,48],76:[2,48],77:[2,48],78:[2,48],80:[2,48],83:[2,48],86:[2,48]},{10:[2,49],13:[2,49],29:[2,49],31:[2,49],40:[2,49],41:[2,49],42:[2,49],44:[2,49],45:[2,49],46:[2,49],48:[2,49],51:[2,49],52:[2,49],53:[2,49],55:[2,49],56:[2,49],57:[2,49],58:[2,49],64:[2,49],67:[2,49],74:[2,49],76:[2,49],77:[2,49],78:[2,49],80:[2,49],83:[2,49],86:[2,49]},{13:[1,118],44:[1,117],56:[1,119]},{13:[2,106],41:[1,91],44:[2,106],56:[2,106],87:120,88:90},{13:[2,107],44:[2,107],56:[2,107],57:[2,107],64:[1,122],83:[1,121]},{13:[2,111],42:[1,123],44:[2,111],56:[2,111],57:[2,111],64:[2,111],83:[2,111]},{10:[2,90],29:[2,90],31:[2,90],40:[2,90],41:[2,90],45:[2,90],48:[2,90],58:[1,124],86:[2,90]},{10:[2,103],29:[2,103],31:[2,103],40:[2,103],41:[2,103],45:[2,103],48:[2,103],58:[2,103],86:[2,103]},{10:[2,104],29:[2,104],31:[2,104],40:[2,104],41:[2,104],45:[2,104],48:[2,104],58:[2,104],86:[2,104]},{10:[2,83],13:[2,83],29:[2,83],31:[2,83],40:[2,83],41:[2,83],44:[2,83],45:[2,83],48:[2,83],56:[2,83],57:[2,83],58:[2,83],64:[2,83],83:[2,83],86:[2,83]},{10:[2,57],13:[2,57],29:[2,57],31:[2,57],40:[2,57],41:[2,57],44:[2,57],45:[2,57],48:[2,57],56:[2,57],57:[2,57],58:[2,57],64:[2,57],67:[2,57],83:[2,57],86:[2,57]},{10:[2,58],13:[2,58],29:[2,58],31:[2,58],40:[2,58],41:[2,58],44:[2,58],45:[2,58],48:[2,58],56:[2,58],57:[2,58],58:[2,58],64:[2,58],67:[2,58],83:[2,58],86:[2,58]},{10:[2,59],13:[2,59],29:[2,59],31:[2,59],40:[2,59],41:[2,59],44:[2,59],45:[2,59],48:[2,59],56:[2,59],57:[2,59],58:[2,59],64:[2,59],67:[2,59],83:[2,59],86:[2,59]},{10:[2,60],13:[2,60],29:[2,60],31:[2,60],40:[2,60],41:[2,60],44:[2,60],45:[2,60],48:[2,60],56:[2,60],57:[2,60],58:[2,60],64:[2,60],67:[2,60],83:[2,60],86:[2,60]},{10:[2,61],13:[2,61],29:[2,61],31:[2,61],40:[2,61],41:[2,61],44:[2,61],45:[2,61],48:[2,61],51:[1,55],52:[1,56],53:[1,57],56:[2,61],57:[2,61],58:[2,61],64:[2,61],67:[2,61],83:[2,61],86:[2,61]},{13:[2,75],16:[1,97],23:100,41:[1,30],56:[1,101],57:[2,75],59:126,60:[1,96],61:[1,98],62:[1,99],63:125,64:[2,75],65:[1,102]},{13:[2,78],41:[1,130],60:[1,129],66:127,67:[2,78],72:128},{10:[2,91],29:[2,91],31:[2,91],40:[2,91],41:[2,91],45:[2,91],48:[2,91],58:[1,124],86:[2,91]},{10:[2,92],29:[2,92],31:[2,92],40:[2,92],41:[2,92],45:[2,92],48:[2,92],58:[1,124],86:[2,92]},{23:131,41:[1,30]},{10:[2,96],29:[2,96],31:[2,96],40:[2,96],41:[2,96],45:[2,96],48:[2,96],58:[1,124],86:[2,96]},{10:[2,97],29:[2,97],31:[2,97],40:[2,97],41:[2,97],45:[2,97],48:[2,97],58:[1,124],86:[2,97]},{16:[1,132]},{23:133,41:[1,30]},{23:114,41:[1,30],43:134,54:[1,113],55:[1,115],56:[1,116]},{23:114,41:[1,30],43:135,54:[1,113],55:[1,115],56:[1,116]},{44:[1,136],46:[1,137],58:[1,138]},{44:[2,52],46:[2,52],58:[2,52]},{44:[2,53],46:[2,53],51:[1,55],52:[1,56],53:[1,57],58:[2,53]},{23:139,41:[1,30]},{23:140,41:[1,30]},{10:[2,101],13:[2,101],29:[2,101],31:[2,101],40:[2,101],41:[2,101],45:[2,101],48:[2,101],80:[2,101],86:[2,101]},{41:[1,91],56:[1,142],88:141},{13:[2,106],41:[1,91],56:[2,106],57:[2,106],87:143,88:90},{13:[1,118],44:[1,144],56:[1,119]},{16:[1,97],23:100,41:[1,30],56:[1,101],59:95,60:[1,96],61:[1,98],62:[1,99],65:[1,102],73:145},{13:[2,114],44:[2,114],56:[2,114],57:[2,114],64:[2,114],83:[2,114]},{13:[2,106],41:[1,91],44:[2,106],56:[2,106],87:146,88:90},{16:[1,97],23:100,41:[1,30],56:[1,101],59:95,60:[1,96],61:[1,98],62:[1,99],65:[1,102],73:147},{13:[1,150],57:[1,148],64:[1,149]},{13:[2,76],57:[2,76],64:[2,76]},{13:[1,152],67:[1,151]},{15:[1,153]},{15:[2,81]},{15:[2,82]},{10:[2,88],29:[2,88],31:[2,88],51:[1,55],52:[1,56],53:[1,57]},{13:[2,10],41:[2,10],74:[2,10],76:[2,10],78:[2,10],86:[2,10]},{10:[2,51],13:[2,51],31:[2,51],51:[1,55],52:[1,56],53:[1,57]},{44:[1,154],46:[1,155],58:[1,138]},{44:[1,156],46:[1,157],58:[1,138]},{10:[2,40],29:[2,40],31:[2,40],48:[2,40]},{31:[1,158]},{23:159,41:[1,30]},{51:[1,55],52:[1,56],53:[1,57],55:[1,160]},{51:[1,55],52:[1,56],53:[1,57],57:[1,161]},{13:[2,108],44:[2,108],56:[2,108],57:[2,108],64:[1,122],83:[1,121]},{13:[2,106],41:[1,91],56:[2,106],57:[2,106],87:162,88:90},{13:[1,118],56:[1,119],57:[1,163]},{10:[2,102],13:[2,102],29:[2,102],31:[2,102],40:[2,102],41:[2,102],45:[2,102],48:[2,102],80:[2,102],86:[2,102]},{13:[2,113],44:[2,113],56:[2,113],57:[2,113],64:[2,113],83:[2,113]},{13:[1,118],44:[1,164],56:[1,119]},{10:[2,105],29:[2,105],31:[2,105],40:[2,105],41:[2,105],45:[2,105],48:[2,105],58:[2,105],86:[2,105]},{10:[2,62],13:[2,62],29:[2,62],31:[2,62],40:[2,62],41:[2,62],44:[2,62],45:[2,62],48:[2,62],56:[2,62],57:[2,62],58:[2,62],64:[2,62],67:[2,62],83:[2,62],86:[2,62]},{57:[1,165]},{16:[1,97],23:100,41:[1,30],56:[1,101],59:166,60:[1,96],61:[1,98],62:[1,99],65:[1,102]},{10:[2,64],13:[2,64],29:[2,64],31:[2,64],40:[2,64],41:[2,64],44:[2,64],45:[2,64],48:[2,64],56:[2,64],57:[2,64],58:[2,64],64:[2,64],67:[2,64],83:[2,64],86:[2,64]},{41:[1,130],60:[1,129],72:167},{16:[1,97],23:100,41:[1,30],56:[1,101],59:168,60:[1,96],61:[1,98],62:[1,99],65:[1,102]},{10:[2,34],29:[2,34],31:[2,34],40:[2,34],45:[2,34],48:[2,34]},{31:[1,169]},{10:[2,35],29:[2,35],31:[2,35],40:[2,35],45:[2,35],48:[2,35]},{31:[1,170]},{10:[2,41],29:[2,41],31:[2,41],48:[2,41]},{44:[2,56],46:[2,56],51:[1,55],52:[1,56],53:[1,57],58:[2,56]},{44:[2,54],46:[2,54],58:[2,54]},{44:[2,55],46:[2,55],58:[2,55]},{13:[1,118],56:[1,119],57:[1,171]},{13:[2,110],44:[2,110],56:[2,110],57:[2,110]},{13:[2,112],44:[2,112],56:[2,112],57:[2,112],64:[2,112],83:[2,112]},{10:[2,63],13:[2,63],29:[2,63],31:[2,63],40:[2,63],41:[2,63],44:[2,63],45:[2,63],48:[2,63],56:[2,63],57:[2,63],58:[2,63],64:[2,63],67:[2,63],83:[2,63],86:[2,63]},{13:[2,77],57:[2,77],64:[2,77]},{15:[1,172]},{13:[2,79],67:[2,79]},{10:[2,36],29:[2,36],31:[2,36],40:[2,36],45:[2,36],48:[2,36]},{10:[2,37],29:[2,37],31:[2,37],40:[2,37],45:[2,37],48:[2,37]},{13:[2,109],44:[2,109],56:[2,109],57:[2,109]},{16:[1,97],23:100,41:[1,30],56:[1,101],59:173,60:[1,96],61:[1,98],62:[1,99],65:[1,102]},{13:[2,80],67:[2,80]}],
defaultActions: {3:[2,1],42:[2,23],129:[2,81],130:[2,82]},
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
case 9:return 52
break;
case 10:return 51
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
case 18:return 22
break;
case 19:return 24
break;
case 20:/* N.B. shouldn't it be ALIAS, and reversed sense */ return 24
break;
case 21:return 25
break;
case 22:return 26
break;
case 23:return 27
break;
case 24:return 41
break;
case 25:return 60
break;
case 26:this.popState(); return 10
break;
case 27:return 31
break;
case 28:/* skip whitespaces */
break;
case 29:this.begin('arg'); return 46
break;
case 30:return 45
break;
case 31:return 40
break;
case 32:return 48
break;
case 33:return 'FIRES'
break;
case 34:return 29
break;
case 35:/*return '*'*/
break;
case 36:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 60
break;
case 37:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 60
break;
case 38:return 16
break;
case 39:return 62
break;
case 40:return 61
break;
case 41:return 61
break;
case 42:return 52
break;
case 43:return 53
break;
case 44:return 54
break;
case 45:return 64
break;
case 46:return 51
break;
case 47:return 13
break;
case 48:return 80
break;
case 49:return 74
break;
case 50:return 83
break;
case 51:return 77
break;
case 52:return 15
break;
case 53:return 42
break;
case 54:return 44
break;
case 55:return 56
break;
case 56:return 57
break;
case 57:return 65
break;
case 58:return 67
break;
case 59:return 58
break;
case 60:return 55
break;
case 61:return 76
break;
case 62:return 78
break;
case 63:return 86
break;
case 64:return 41
break;
case 65:return 60
break;
case 66:this.popState(); return 31
break;
case 67:this.popState(); console.log('LEFTCOMM'); return 31
break;
}
};
lexer.rules = [/^$/,/^\s+/,/^\/\*\*(?=([^/]))/,/^.*/,/^\*\*\//,/^\s*[\n]/,/^, /,/^: /,/^\.\./,/^#/,/^\./,/^\s+/,/^-?(?:[0-9]|[1-9][0-9]+)(?:\.[\.0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,/^deprecated\b/,/^read-only\b/,/^internal\b/,/^hide\b/,/^chainable\b/,/^section\b/,/^alias of\b/,/^alias\b/,/^related to\b/,/^belongs to\b/,/^extension\b/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9]*)/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9 ]*)/,/^\*\*\//,/^\*\s*?[\n][\s\S]*?(?=\*\*\/)/,/^\s+/,/^\)\s*:/,/^\*\s*\*/,/^\*\s*-/,/^\*\s*\+/,/^\*\s*fires\b/,/^\*\s*includes\b/,/^\*/,/^"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,/^'(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^'\\])*'/,/^-?(?:[0-9]|[1-9][0-9]+)(?:\.[\.0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,/^\/(?:[^\/]|\\\/)*\/[gim]*/,/^true\b/,/^false\b/,/^#/,/^@/,/^\?/,/^\.\.\./,/^\./,/^,/,/^->/,/^==/,/^=/,/^</,/^:/,/^\(/,/^\)/,/^\[/,/^\]/,/^\{/,/^\}/,/^\|/,/^`/,/^class\b/,/^mixin\b/,/^new\b/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9]*)/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9 ]*)/,/^[\s\S]*?(?=(\*\s*[\-\+\n]))/,/^[\s\S]*?(?=\*\*\/)/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3],"inclusive":true},"tags":{"rules":[0,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"inclusive":false},"def":{"rules":[0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65],"inclusive":false},"arg":{"rules":[0,66],"inclusive":false},"comment":{"rules":[0,67],"inclusive":false}};
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