/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"file":3,"world":4,"EOF":5,"/**":6,"tags":7,"panino_and_includes_and_fires":8,"comment":9,"**/":10,"tag_list":11,"tag":12,",":13,"DEPRECATED":14,":":15,"NUMBER":16,"..":17,"READONLY":18,"INTERNAL":19,"HIDE":20,"CHAINABLE":21,"SECTION":22,"name":23,"ALIASOF":24,"RELATEDTO":25,"BELONGSTO":26,"panino":27,"INCLUDES":28,"names":29,"TEXT":30,"section":31,"namespace":32,"class":33,"mixin":34,"signatures":35,"argument_descriptions":36,"return_descriptions":37,"argument_description":38,"*-":39,"NAME":40,"(":41,"names_alternation":42,")":43,"**":44,"):":45,"return_description":46,"*+":47,"events":48,"event":49,".":50,"#":51,"@":52,"?":53,"|":54,"value":55,"STRING":56,"BOOLEAN":57,"REGEXP":58,"[":59,"value_list":60,"]":61,"...":62,"{":63,"key_value_list":64,"}":65,"value2":66,"TRUE":67,"FALSE":68,"NULL":69,"key":70,"name_or_value":71,"==":72,"string":73,"CLASS":74,"<":75,"MIXIN":76,"property":77,"->":78,"returns":79,"constant":80,"=":81,"signature":82,"method":83,"NEW":84,"args":85,"arg":86,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"/**",10:"**/",13:",",14:"DEPRECATED",15:":",16:"NUMBER",17:"..",18:"READONLY",19:"INTERNAL",20:"HIDE",21:"CHAINABLE",22:"SECTION",24:"ALIASOF",25:"RELATEDTO",26:"BELONGSTO",28:"INCLUDES",30:"TEXT",39:"*-",40:"NAME",41:"(",43:")",44:"**",45:"):",47:"*+",50:".",51:"#",52:"@",53:"?",54:"|",56:"STRING",57:"BOOLEAN",58:"REGEXP",59:"[",61:"]",62:"...",63:"{",65:"}",67:"TRUE",68:"FALSE",69:"NULL",72:"==",73:"string",74:"CLASS",75:"<",76:"MIXIN",78:"->",81:"=",84:"NEW"},
productions_: [0,[3,2],[4,0],[4,6],[7,0],[7,1],[11,1],[11,3],[12,1],[12,3],[12,5],[12,1],[12,1],[12,1],[12,1],[12,3],[12,3],[12,3],[12,3],[8,1],[8,3],[9,0],[9,1],[27,1],[27,1],[27,1],[27,1],[27,1],[27,2],[27,2],[27,3],[36,1],[36,2],[38,5],[38,5],[38,6],[38,6],[37,1],[37,2],[46,4],[46,5],[48,1],[48,3],[49,1],[49,3],[23,1],[23,3],[23,3],[23,3],[29,1],[29,3],[42,1],[42,1],[42,3],[55,1],[55,1],[55,1],[55,1],[55,1],[55,3],[55,4],[55,3],[66,1],[66,1],[66,1],[66,1],[66,1],[66,1],[66,1],[66,3],[66,4],[66,3],[60,0],[60,1],[60,3],[64,0],[64,3],[64,5],[70,1],[70,1],[71,1],[31,3],[31,3],[32,1],[33,2],[33,4],[34,2],[77,3],[77,3],[80,3],[35,1],[35,2],[82,1],[82,3],[82,3],[82,1],[82,1],[82,2],[83,4],[83,5],[79,1],[79,1],[79,3],[85,0],[85,1],[85,3],[85,5],[85,4],[86,1],[86,4],[86,3],[86,2]],
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
    // trim leading spaces from description, but keep 4 space indentations
    
    x.description = desq; 
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
case 20: this.$.included_mixins = $$[$0] 
break;
case 21: this.$ = {text: '', line: yy.lexer.yylloc.last_line} 
break;
case 22: this.$ = {text: $$[$0], line: yy.lexer.yylloc.last_line} 
break;
case 28: this.$.arguments = $$[$0] 
break;
case 29: this.$.retDesc = $$[$0] 
break;
case 30: this.$.arguments = $$[$0-1]; this.$.retDesc = $$[$0] 
break;
case 31: this.$ = [$$[$0]] 
break;
case 32: this.$.push($$[$0]) 
break;
case 33:
       if (yy.useAsterisk) {
         console.error("FATAL: You can't use dashes for " + $$[$0-3].name);
         process.exit(1);
       }
       this.$ = {name: $$[$0-3], types: $$[$0-1]} 
     
break;
case 34:
       if (yy.useDash) {
         console.error("FATAL: You can't use asterisks for " + $$[$0-3]);
         process.exit(1);
       }
       this.$ = {name: $$[$0-3], types: $$[$0-1]} 
     
break;
case 35:
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
case 36:
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
case 37: this.$ = [$$[$0]] 
break;
case 38: this.$.push($$[$0]) 
break;
case 39:
       this.$ = { types: $$[$0-1]} 
     
break;
case 40:
      this.$ = {
        types: $$[$0-2],
        description: $$[$0].replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
      };
    
break;
case 41: this.$ = [$$[$0]] 
break;
case 42: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 44: this.$ += $$[$0-1] + $$[$0] 
break;
case 46: this.$ += $$[$0-1] + $$[$0] 
break;
case 47: this.$ += $$[$0-1] + $$[$0] 
break;
case 48: this.$ += $$[$0-1] + $$[$0] 
break;
case 49: this.$ = [$$[$0]] 
break;
case 50: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 51: this.$ = [] 
break;
case 52: this.$ = [$$[$0]] 
break;
case 53: this.$.push($$[$0]) 
break;
case 54: this.$ = String($$[$0]) 
break;
case 55: this.$ = Number($$[$0]) 
break;
case 56: this.$ = $$[$0] === 'true' ? true : false 
break;
case 57: this.$ = new RegExp($$[$0]) 
break;
case 59: this.$ = $$[$0-1]; this.$.array = true 
break;
case 60: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 61: this.$ = $$[$0-1] 
break;
case 62: this.$ = {value: String($$[$0]), type: 'string'} 
break;
case 63: this.$ = {value: Number($$[$0]), type: 'number'} 
break;
case 64: this.$ = {value: true, type: 'boolean'} 
break;
case 65: this.$ = {value: false, type: 'boolean'} 
break;
case 66: this.$ = {value: null, type: 'null'} 
break;
case 67: this.$ = {value: $$[$0], type: 'regexp'} 
break;
case 68: this.$ = {value: $$[$0], type: 'name'} 
break;
case 69: this.$ = $$[$0-1]; this.$.array = true 
break;
case 70: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 71: this.$ = $$[$0-1] 
break;
case 72: this.$ = [] 
break;
case 73: this.$ = [$$[$0]] 
break;
case 74: this.$.push($$[$0]) 
break;
case 75: this.$ = {} 
break;
case 76: this.$ = {}; this.$[$$[$0-2]] = $$[$0] 
break;
case 77: this.$[$$[$0-2]] = $$[$0] 
break;
case 81: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 82: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 83: this.$ = {id: $$[$0], type: 'namespace'}; 
break;
case 84: this.$ = {id: $$[$0], type: 'class'}; 
break;
case 85: this.$ = {id: $$[$0-2], type: 'class', superclass: $$[$0]}; 
break;
case 86: this.$ = {id: $$[$0], type: 'mixin'} 
break;
case 87: 
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 88: 
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 89: this.$ = {id: $$[$0-2], type: 'constant', returns: $$[$0]} 
break;
case 90:
    this.$ = $$[$0];
    this.$.signatures = [{args: $$[$0].args, returns: $$[$0].returns}];
    delete this.$.args;
    delete this.$.returns;
  
break;
case 91:
    this.$.signatures.push({args: $$[$0].args, returns: $$[$0].returns});
    delete this.$.args;
    delete this.$.returns;
  
break;
case 93:
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 94:
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 97: this.$ = $$[$0]; this.$.id = this.$.id + '.' + $$[$0-1]; this.$.type = 'constructor' 
break;
case 98: this.$ = {id: $$[$0-3], type: 'method', args: $$[$0-1]} 
break;
case 99: this.$ = {id: $$[$0-4], type: 'method', args: $$[$0-1], bound: true} 
break;
case 100: this.$ = [{type: '?'}] 
break;
case 101:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$ = [ret];
  
break;
case 102:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$.push(ret);
  
break;
case 103: this.$ = [] 
break;
case 104: this.$ = [$$[$0]] 
break;
case 105: this.$.push($$[$0]) 
break;
case 106:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-4].push(a);
    });
  
break;
case 107:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-3].push(a);
    });
  
break;
case 108: this.$ = {name: $$[$0]} 
break;
case 109: this.$ = {name: $$[$0-3], args: $$[$0-1]} 
break;
case 110: this.$.default_value = $$[$0] 
break;
case 111: this.$.ellipsis = true 
break;
}
},
table: [{3:1,4:2,5:[2,2],6:[2,2]},{1:[3]},{5:[1,3],6:[1,4]},{1:[2,1]},{7:5,11:6,12:7,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],22:[1,13],24:[1,14],25:[1,15],26:[1,16],40:[2,4],72:[2,4],74:[2,4],76:[2,4],84:[2,4]},{8:17,23:25,27:18,31:19,32:20,33:21,34:22,35:23,40:[1,29],72:[1,24],74:[1,26],76:[1,27],77:31,80:32,82:28,83:30,84:[1,33]},{13:[1,34],40:[2,5],72:[2,5],74:[2,5],76:[2,5],84:[2,5]},{13:[2,6],40:[2,6],72:[2,6],74:[2,6],76:[2,6],84:[2,6]},{13:[2,8],15:[1,35],40:[2,8],72:[2,8],74:[2,8],76:[2,8],84:[2,8]},{13:[2,11],40:[2,11],72:[2,11],74:[2,11],76:[2,11],84:[2,11]},{13:[2,12],40:[2,12],72:[2,12],74:[2,12],76:[2,12],84:[2,12]},{13:[2,13],40:[2,13],72:[2,13],74:[2,13],76:[2,13],84:[2,13]},{13:[2,14],40:[2,14],72:[2,14],74:[2,14],76:[2,14],84:[2,14]},{15:[1,36]},{15:[1,37]},{15:[1,38]},{15:[1,39]},{9:40,10:[2,21],30:[1,41]},{10:[2,19],28:[1,42],30:[2,19]},{10:[2,23],28:[2,23],30:[2,23]},{10:[2,24],28:[2,24],30:[2,24]},{10:[2,25],28:[2,25],30:[2,25]},{10:[2,26],28:[2,26],30:[2,26]},{10:[2,27],23:51,28:[2,27],30:[2,27],36:43,37:44,38:46,39:[1,48],40:[1,29],44:[1,49],46:47,47:[1,50],77:31,80:32,82:45,83:30,84:[1,33]},{40:[1,53],73:[1,52]},{10:[2,83],13:[1,59],28:[2,83],30:[2,83],41:[1,57],50:[1,54],51:[1,55],52:[1,56],78:[1,58],81:[1,60]},{23:61,40:[1,29]},{23:62,40:[1,29]},{10:[2,90],28:[2,90],30:[2,90],39:[2,90],40:[2,90],44:[2,90],47:[2,90],84:[2,90]},{10:[2,45],13:[2,45],28:[2,45],30:[2,45],39:[2,45],40:[2,45],41:[2,45],43:[2,45],44:[2,45],45:[2,45],47:[2,45],50:[2,45],51:[2,45],52:[2,45],54:[2,45],59:[2,45],61:[2,45],62:[2,45],65:[2,45],72:[2,45],74:[2,45],75:[2,45],76:[2,45],78:[2,45],81:[2,45],84:[2,45]},{10:[2,92],13:[1,63],28:[2,92],30:[2,92],39:[2,92],40:[2,92],44:[2,92],47:[2,92],78:[1,64],84:[2,92]},{10:[2,95],28:[2,95],30:[2,95],39:[2,95],40:[2,95],44:[2,95],47:[2,95],84:[2,95]},{10:[2,96],28:[2,96],30:[2,96],39:[2,96],40:[2,96],44:[2,96],47:[2,96],84:[2,96]},{23:66,40:[1,29],83:65},{12:67,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],22:[1,13],24:[1,14],25:[1,15],26:[1,16]},{16:[1,68]},{23:69,40:[1,29]},{23:70,40:[1,29]},{23:71,40:[1,29]},{23:72,40:[1,29]},{10:[1,73]},{10:[2,22]},{23:75,29:74,40:[1,29]},{10:[2,28],28:[2,28],30:[2,28],37:76,38:77,39:[1,48],44:[1,49],46:47,47:[1,50]},{10:[2,29],28:[2,29],30:[2,29],46:78,47:[1,50]},{10:[2,91],28:[2,91],30:[2,91],39:[2,91],40:[2,91],44:[2,91],47:[2,91],84:[2,91]},{10:[2,31],28:[2,31],30:[2,31],39:[2,31],44:[2,31],47:[2,31]},{10:[2,37],28:[2,37],30:[2,37],47:[2,37]},{40:[1,79]},{40:[1,80]},{41:[1,81]},{13:[1,59],41:[1,57],50:[1,54],51:[1,55],52:[1,56],78:[1,58],81:[1,60]},{72:[1,82]},{72:[1,83]},{40:[1,84]},{40:[1,85]},{40:[1,86]},{13:[2,103],40:[1,90],43:[2,103],52:[1,88],59:[2,103],85:87,86:89},{16:[1,96],23:99,40:[1,29],53:[1,92],55:94,56:[1,95],57:[1,97],58:[1,98],59:[1,100],63:[1,101],71:93,79:91},{16:[1,96],23:99,40:[1,29],53:[1,92],55:94,56:[1,95],57:[1,97],58:[1,98],59:[1,100],63:[1,101],71:93,79:102},{16:[1,96],23:99,40:[1,29],53:[1,92],55:94,56:[1,95],57:[1,97],58:[1,98],59:[1,100],63:[1,101],71:93,79:103},{10:[2,84],28:[2,84],30:[2,84],50:[1,54],51:[1,55],52:[1,56],75:[1,104]},{10:[2,86],28:[2,86],30:[2,86],50:[1,54],51:[1,55],52:[1,56]},{16:[1,96],23:99,40:[1,29],53:[1,92],55:94,56:[1,95],57:[1,97],58:[1,98],59:[1,100],63:[1,101],71:93,79:105},{16:[1,96],23:99,40:[1,29],53:[1,92],55:94,56:[1,95],57:[1,97],58:[1,98],59:[1,100],63:[1,101],71:93,79:106},{10:[2,97],28:[2,97],30:[2,97],39:[2,97],40:[2,97],44:[2,97],47:[2,97],84:[2,97]},{41:[1,57],50:[1,54],51:[1,55],52:[1,56]},{13:[2,7],40:[2,7],72:[2,7],74:[2,7],76:[2,7],84:[2,7]},{13:[2,9],17:[1,107],40:[2,9],72:[2,9],74:[2,9],76:[2,9],84:[2,9]},{13:[2,15],40:[2,15],50:[1,54],51:[1,55],52:[1,56],72:[2,15],74:[2,15],76:[2,15],84:[2,15]},{13:[2,16],40:[2,16],50:[1,54],51:[1,55],52:[1,56],72:[2,16],74:[2,16],76:[2,16],84:[2,16]},{13:[2,17],40:[2,17],50:[1,54],51:[1,55],52:[1,56],72:[2,17],74:[2,17],76:[2,17],84:[2,17]},{13:[2,18],40:[2,18],50:[1,54],51:[1,55],52:[1,56],72:[2,18],74:[2,18],76:[2,18],84:[2,18]},{5:[2,3],6:[2,3]},{10:[2,20],13:[1,108],30:[2,20]},{10:[2,49],13:[2,49],30:[2,49],50:[1,54],51:[1,55],52:[1,56]},{10:[2,30],28:[2,30],30:[2,30],46:78,47:[1,50]},{10:[2,32],28:[2,32],30:[2,32],39:[2,32],44:[2,32],47:[2,32]},{10:[2,38],28:[2,38],30:[2,38],47:[2,38]},{41:[1,109]},{41:[1,110]},{23:113,40:[1,29],42:111,53:[1,112]},{10:[2,81],28:[2,81],30:[2,81]},{10:[2,82],28:[2,82],30:[2,82]},{10:[2,46],13:[2,46],28:[2,46],30:[2,46],39:[2,46],40:[2,46],41:[2,46],43:[2,46],44:[2,46],45:[2,46],47:[2,46],50:[2,46],51:[2,46],52:[2,46],54:[2,46],59:[2,46],61:[2,46],62:[2,46],65:[2,46],72:[2,46],74:[2,46],75:[2,46],76:[2,46],78:[2,46],81:[2,46],84:[2,46]},{10:[2,47],13:[2,47],28:[2,47],30:[2,47],39:[2,47],40:[2,47],41:[2,47],43:[2,47],44:[2,47],45:[2,47],47:[2,47],50:[2,47],51:[2,47],52:[2,47],54:[2,47],59:[2,47],61:[2,47],62:[2,47],65:[2,47],72:[2,47],74:[2,47],75:[2,47],76:[2,47],78:[2,47],81:[2,47],84:[2,47]},{10:[2,48],13:[2,48],28:[2,48],30:[2,48],39:[2,48],40:[2,48],41:[2,48],43:[2,48],44:[2,48],45:[2,48],47:[2,48],50:[2,48],51:[2,48],52:[2,48],54:[2,48],59:[2,48],61:[2,48],62:[2,48],65:[2,48],72:[2,48],74:[2,48],75:[2,48],76:[2,48],78:[2,48],81:[2,48],84:[2,48]},{13:[1,115],43:[1,114],59:[1,116]},{13:[2,103],40:[1,90],43:[2,103],59:[2,103],85:117,86:89},{13:[2,104],43:[2,104],59:[2,104],61:[2,104],62:[1,119],81:[1,118]},{13:[2,108],41:[1,120],43:[2,108],59:[2,108],61:[2,108],62:[2,108],81:[2,108]},{10:[2,87],28:[2,87],30:[2,87],39:[2,87],40:[2,87],44:[2,87],47:[2,87],54:[1,121],84:[2,87]},{10:[2,100],28:[2,100],30:[2,100],39:[2,100],40:[2,100],44:[2,100],47:[2,100],54:[2,100],84:[2,100]},{10:[2,101],28:[2,101],30:[2,101],39:[2,101],40:[2,101],44:[2,101],47:[2,101],54:[2,101],84:[2,101]},{10:[2,80],13:[2,80],28:[2,80],30:[2,80],39:[2,80],40:[2,80],43:[2,80],44:[2,80],47:[2,80],54:[2,80],59:[2,80],61:[2,80],62:[2,80],81:[2,80],84:[2,80]},{10:[2,54],13:[2,54],28:[2,54],30:[2,54],39:[2,54],40:[2,54],43:[2,54],44:[2,54],47:[2,54],54:[2,54],59:[2,54],61:[2,54],62:[2,54],65:[2,54],81:[2,54],84:[2,54]},{10:[2,55],13:[2,55],28:[2,55],30:[2,55],39:[2,55],40:[2,55],43:[2,55],44:[2,55],47:[2,55],54:[2,55],59:[2,55],61:[2,55],62:[2,55],65:[2,55],81:[2,55],84:[2,55]},{10:[2,56],13:[2,56],28:[2,56],30:[2,56],39:[2,56],40:[2,56],43:[2,56],44:[2,56],47:[2,56],54:[2,56],59:[2,56],61:[2,56],62:[2,56],65:[2,56],81:[2,56],84:[2,56]},{10:[2,57],13:[2,57],28:[2,57],30:[2,57],39:[2,57],40:[2,57],43:[2,57],44:[2,57],47:[2,57],54:[2,57],59:[2,57],61:[2,57],62:[2,57],65:[2,57],81:[2,57],84:[2,57]},{10:[2,58],13:[2,58],28:[2,58],30:[2,58],39:[2,58],40:[2,58],43:[2,58],44:[2,58],47:[2,58],50:[1,54],51:[1,55],52:[1,56],54:[2,58],59:[2,58],61:[2,58],62:[2,58],65:[2,58],81:[2,58],84:[2,58]},{13:[2,72],16:[1,96],23:99,40:[1,29],55:123,56:[1,95],57:[1,97],58:[1,98],59:[1,100],60:122,61:[2,72],62:[2,72],63:[1,101]},{13:[2,75],40:[1,127],56:[1,126],64:124,65:[2,75],70:125},{10:[2,88],28:[2,88],30:[2,88],39:[2,88],40:[2,88],44:[2,88],47:[2,88],54:[1,121],84:[2,88]},{10:[2,89],28:[2,89],30:[2,89],39:[2,89],40:[2,89],44:[2,89],47:[2,89],54:[1,121],84:[2,89]},{23:128,40:[1,29]},{10:[2,93],28:[2,93],30:[2,93],39:[2,93],40:[2,93],44:[2,93],47:[2,93],54:[1,121],84:[2,93]},{10:[2,94],28:[2,94],30:[2,94],39:[2,94],40:[2,94],44:[2,94],47:[2,94],54:[1,121],84:[2,94]},{16:[1,129]},{23:130,40:[1,29]},{23:113,40:[1,29],42:131,53:[1,112]},{23:113,40:[1,29],42:132,53:[1,112]},{43:[1,133],45:[1,134],54:[1,135]},{43:[2,51],45:[2,51],54:[2,51]},{43:[2,52],45:[2,52],50:[1,54],51:[1,55],52:[1,56],54:[2,52]},{10:[2,98],13:[2,98],28:[2,98],30:[2,98],39:[2,98],40:[2,98],44:[2,98],47:[2,98],78:[2,98],84:[2,98]},{40:[1,90],59:[1,137],86:136},{13:[2,103],40:[1,90],59:[2,103],61:[2,103],85:138,86:89},{13:[1,115],43:[1,139],59:[1,116]},{16:[1,96],23:99,40:[1,29],55:94,56:[1,95],57:[1,97],58:[1,98],59:[1,100],63:[1,101],71:140},{13:[2,111],43:[2,111],59:[2,111],61:[2,111],62:[2,111],81:[2,111]},{13:[2,103],40:[1,90],43:[2,103],59:[2,103],85:141,86:89},{16:[1,96],23:99,40:[1,29],55:94,56:[1,95],57:[1,97],58:[1,98],59:[1,100],63:[1,101],71:142},{13:[1,145],61:[1,143],62:[1,144]},{13:[2,73],61:[2,73],62:[2,73]},{13:[1,147],65:[1,146]},{15:[1,148]},{15:[2,78]},{15:[2,79]},{10:[2,85],28:[2,85],30:[2,85],50:[1,54],51:[1,55],52:[1,56]},{13:[2,10],40:[2,10],72:[2,10],74:[2,10],76:[2,10],84:[2,10]},{10:[2,50],13:[2,50],30:[2,50],50:[1,54],51:[1,55],52:[1,56]},{43:[1,149],45:[1,150],54:[1,135]},{43:[1,151],45:[1,152],54:[1,135]},{10:[2,39],28:[2,39],30:[2,39],47:[2,39]},{30:[1,153]},{23:154,40:[1,29]},{13:[2,105],43:[2,105],59:[2,105],61:[2,105],62:[1,119],81:[1,118]},{13:[2,103],40:[1,90],59:[2,103],61:[2,103],85:155,86:89},{13:[1,115],59:[1,116],61:[1,156]},{10:[2,99],13:[2,99],28:[2,99],30:[2,99],39:[2,99],40:[2,99],44:[2,99],47:[2,99],78:[2,99],84:[2,99]},{13:[2,110],43:[2,110],59:[2,110],61:[2,110],62:[2,110],81:[2,110]},{13:[1,115],43:[1,157],59:[1,116]},{10:[2,102],28:[2,102],30:[2,102],39:[2,102],40:[2,102],44:[2,102],47:[2,102],54:[2,102],84:[2,102]},{10:[2,59],13:[2,59],28:[2,59],30:[2,59],39:[2,59],40:[2,59],43:[2,59],44:[2,59],47:[2,59],54:[2,59],59:[2,59],61:[2,59],62:[2,59],65:[2,59],81:[2,59],84:[2,59]},{61:[1,158]},{16:[1,96],23:99,40:[1,29],55:159,56:[1,95],57:[1,97],58:[1,98],59:[1,100],63:[1,101]},{10:[2,61],13:[2,61],28:[2,61],30:[2,61],39:[2,61],40:[2,61],43:[2,61],44:[2,61],47:[2,61],54:[2,61],59:[2,61],61:[2,61],62:[2,61],65:[2,61],81:[2,61],84:[2,61]},{40:[1,127],56:[1,126],70:160},{16:[1,96],23:99,40:[1,29],55:161,56:[1,95],57:[1,97],58:[1,98],59:[1,100],63:[1,101]},{10:[2,33],28:[2,33],30:[2,33],39:[2,33],44:[2,33],47:[2,33]},{30:[1,162]},{10:[2,34],28:[2,34],30:[2,34],39:[2,34],44:[2,34],47:[2,34]},{30:[1,163]},{10:[2,40],28:[2,40],30:[2,40],47:[2,40]},{43:[2,53],45:[2,53],50:[1,54],51:[1,55],52:[1,56],54:[2,53]},{13:[1,115],59:[1,116],61:[1,164]},{13:[2,107],43:[2,107],59:[2,107],61:[2,107]},{13:[2,109],43:[2,109],59:[2,109],61:[2,109],62:[2,109],81:[2,109]},{10:[2,60],13:[2,60],28:[2,60],30:[2,60],39:[2,60],40:[2,60],43:[2,60],44:[2,60],47:[2,60],54:[2,60],59:[2,60],61:[2,60],62:[2,60],65:[2,60],81:[2,60],84:[2,60]},{13:[2,74],61:[2,74],62:[2,74]},{15:[1,165]},{13:[2,76],65:[2,76]},{10:[2,35],28:[2,35],30:[2,35],39:[2,35],44:[2,35],47:[2,35]},{10:[2,36],28:[2,36],30:[2,36],39:[2,36],44:[2,36],47:[2,36]},{13:[2,106],43:[2,106],59:[2,106],61:[2,106]},{16:[1,96],23:99,40:[1,29],55:166,56:[1,95],57:[1,97],58:[1,98],59:[1,100],63:[1,101]},{13:[2,77],65:[2,77]}],
defaultActions: {3:[2,1],41:[2,22],126:[2,78],127:[2,79]},
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
case 9:return 51
break;
case 10:return 50
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
case 23:return 40
break;
case 24:return 56
break;
case 25:this.popState(); return 10
break;
case 26:return 30
break;
case 27:/* skip whitespaces */
break;
case 28:this.begin('arg'); return 45
break;
case 29:return 44
break;
case 30:return 39
break;
case 31:return 47
break;
case 32:return 'FIRES'
break;
case 33:return 28
break;
case 34:/*return '*'*/
break;
case 35:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 56
break;
case 36:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 56
break;
case 37:return 16
break;
case 38:return 58
break;
case 39:return 57
break;
case 40:return 57
break;
case 41:return 51
break;
case 42:return 52
break;
case 43:return 53
break;
case 44:return 62
break;
case 45:return 50
break;
case 46:return 13
break;
case 47:return 78
break;
case 48:return 72
break;
case 49:return 81
break;
case 50:return 75
break;
case 51:return 15
break;
case 52:return 41
break;
case 53:return 43
break;
case 54:return 59
break;
case 55:return 61
break;
case 56:return 63
break;
case 57:return 65
break;
case 58:return 54
break;
case 59:return 74
break;
case 60:return 76
break;
case 61:return 84
break;
case 62:return 40
break;
case 63:return 56
break;
case 64:this.popState(); return 30
break;
case 65:this.popState(); console.log('LEFTCOMM'); return 30
break;
}
};
lexer.rules = [/^$/,/^\s+/,/^\/\*\*(?=([^/]))/,/^.*/,/^\*\*\//,/^\s*[\n]/,/^, /,/^: /,/^\.\./,/^#/,/^\./,/^\s+/,/^-?(?:[0-9]|[1-9][0-9]+)(?:\.[\.0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,/^deprecated\b/,/^read-only\b/,/^internal\b/,/^hide\b/,/^chainable\b/,/^section\b/,/^alias of\b/,/^alias\b/,/^related to\b/,/^belongs to\b/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9]*)/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9 ]*)/,/^\*\*\//,/^\*\s*?[\n][\s\S]*?(?=\*\*\/)/,/^\s+/,/^\)\s*:/,/^\*\s*\*/,/^\*\s*-/,/^\*\s*\+/,/^\*\s*fires\b/,/^\*\s*includes\b/,/^\*/,/^"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,/^'(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^'\\])*'/,/^-?(?:[0-9]|[1-9][0-9]+)(?:\.[\.0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,/^\/(?:[^\/]|\\\/)*\/[gim]*/,/^true\b/,/^false\b/,/^#/,/^@/,/^\?/,/^\.\.\./,/^\./,/^,/,/^->/,/^==/,/^=/,/^</,/^:/,/^\(/,/^\)/,/^\[/,/^\]/,/^\{/,/^\}/,/^\|/,/^class\b/,/^mixin\b/,/^new\b/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9]*)/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9 ]*)/,/^[\s\S]*?(?=(\*\s*[-\n\+]))/,/^[\s\S]*?(?=\*\*\/)/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3],"inclusive":true},"tags":{"rules":[0,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"inclusive":false},"def":{"rules":[0,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],"inclusive":false},"arg":{"rules":[0,64],"inclusive":false},"comment":{"rules":[0,65],"inclusive":false}};
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