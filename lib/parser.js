/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"0":31,"1":34,"2":36,"3":38,"4":40,"5":43,"error":2,"file":3,"world":4,"EOF":5,"/**":6,"tags":7,"panino_and_includes_and_fires":8,"comment":9,"**/":10,"tag_list":11,"tag":12,",":13,"DEPRECATED":14,":":15,"NUMBER":16,"..":17,"READONLY":18,"INTERNAL":19,"HIDE":20,"CHAINABLE":21,"SECTION":22,"name":23,"ALIASOF":24,"RELATEDTO":25,"BELONGSTO":26,"EXTENSION":27,"METADATA":28,"JSON":29,"stability_list":30,"-":32,"Deprecated":33,"Experimental":35,"Unstable":37,"Stable":39,"API":41,"Frozen":42,"Locked":44,"panino":45,"INCLUDES":46,"names":47,"TEXT":48,"section":49,"namespace":50,"class":51,"mixin":52,">":53,"signatures":54,"argument_descriptions":55,"return_descriptions":56,"argument_description":57,"*-":58,"NAME":59,"popen":60,"names_alternation":61,"pclose":62,"**":63,"{":64,"}":65,"return_description":66,"*+":67,"(":68,"):":69,"events":70,"event":71,".":72,"#":73,"@":74,"?":75,"`":76,"[":77,"]":78,"|":79,"value":80,"STRING":81,"BOOLEAN":82,"REGEXP":83,"value_list":84,"...":85,"key_value_list":86,"value2":87,"TRUE":88,"FALSE":89,"NULL":90,"key":91,"name_or_value":92,"==":93,"string":94,"CLASS":95,"<":96,"MIXIN":97,"property":98,"->":99,"returns":100,"constant":101,"=":102,"signature":103,"method":104,"NEW":105,"args":106,")":107,"arg":108,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"/**",10:"**/",13:",",14:"DEPRECATED",15:":",16:"NUMBER",17:"..",18:"READONLY",19:"INTERNAL",20:"HIDE",21:"CHAINABLE",22:"SECTION",24:"ALIASOF",25:"RELATEDTO",26:"BELONGSTO",27:"EXTENSION",28:"METADATA",29:"JSON",31:"0",32:"-",33:"Deprecated",34:"1",35:"Experimental",36:"2",37:"Unstable",38:"3",39:"Stable",40:"4",41:"API",42:"Frozen",43:"5",44:"Locked",46:"INCLUDES",48:"TEXT",53:">",58:"*-",59:"NAME",63:"**",64:"{",65:"}",67:"*+",68:"(",69:"):",72:".",73:"#",74:"@",75:"?",76:"`",77:"[",78:"]",79:"|",81:"STRING",82:"BOOLEAN",83:"REGEXP",85:"...",88:"TRUE",89:"FALSE",90:"NULL",93:"==",94:"string",95:"CLASS",96:"<",97:"MIXIN",99:"->",102:"=",105:"NEW",107:")"},
productions_: [0,[3,2],[4,0],[4,6],[7,0],[7,1],[11,1],[11,3],[12,1],[12,3],[12,5],[12,1],[12,1],[12,1],[12,1],[12,3],[12,3],[12,3],[12,3],[12,1],[12,3],[30,3],[30,3],[30,3],[30,3],[30,4],[30,3],[8,1],[8,3],[9,0],[9,1],[45,1],[45,1],[45,1],[45,1],[45,2],[45,1],[45,2],[45,2],[45,3],[55,1],[55,2],[57,6],[57,6],[56,1],[56,2],[66,5],[60,1],[60,1],[62,1],[62,1],[70,1],[70,3],[71,1],[71,3],[23,1],[23,3],[23,3],[23,3],[47,1],[47,3],[61,1],[61,1],[61,3],[61,3],[61,3],[80,1],[80,1],[80,1],[80,1],[80,1],[80,3],[80,4],[80,3],[87,1],[87,1],[87,1],[87,1],[87,1],[87,1],[87,1],[87,3],[87,4],[87,3],[84,0],[84,1],[84,3],[86,0],[86,3],[86,5],[91,1],[91,1],[92,1],[49,3],[49,3],[50,1],[51,2],[51,4],[52,2],[98,3],[98,3],[101,3],[54,1],[54,2],[103,1],[103,3],[103,3],[103,1],[103,1],[103,2],[104,4],[104,5],[100,1],[100,1],[100,3],[106,0],[106,1],[106,3],[106,5],[106,4],[108,1],[108,4],[108,3],[108,2]],
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

	var stabilityList = ["0 - Deprecated", "1 - Experimental", "2 - Unstable", "3 - Stable", 
						 "4 - API Frozen", "5 - Locked" ];
	var stabilityPrefix = "> Stability: ";
	if (x.description.indexOf(stabilityPrefix) == 0) {
		x.description = x.description.substr(stabilityPrefix.length);
		var firstLine = x.description.replace(/\n\n[\s\S]*$/, '\n');
		var stability = stabilityList.filter(function(s) {
			if (s == firstLine.trim())
				return true;
			return false;
		});
		if (stability.length <= 0) {
			console.error("In " + x.id + " you tried to provide a stability of " + firstLine + 
					      ", but I didn't recognize it!");
			process.exit(1);
		}
		else {
			x.stability = stability[0];
			x.description = x.description.substr(firstLine.length);
		}
	}

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
case 20: this.$ = {metadata: JSON.parse($$[$0])} 
break;
case 28: this.$.included_mixins = $$[$0] 
break;
case 29: this.$ = {text: '', line: yy.lexer.yylloc.last_line} 
break;
case 30: this.$ = {text: $$[$0], line: yy.lexer.yylloc.last_line} 
break;
case 35: this.$ = {stability: $$[$0]} 
break;
case 37: 
    if ($$[$0-1].signatures) {
      $$[$0-1].signatures.forEach(function (signature) {
        if (signature.args) {
          var types = $$[$0].types;
          var c = -1;
          var cArgPos = 0;
          for (var a = 0; a < $$[$0].length; a++) {
            if (signature.args[a])
              signature.args[a].types = $$[$0][a].types;
            else { // we're looking at args for a callback
              if (c < 0)
                c = a == 0 ? a : a - 1;

                signature.callback.args[cArgPos].type = $$[$0][a].types;
                signature.callback.args[cArgPos].optional = $$[$0][a].optional;
                signature.callback.args[cArgPos].ellipsis = $$[$0][a].ellipsis;
            }
          }
        }
      });
    }
    this.$.arguments = $$[$0];
  
break;
case 38: this.$.retDesc = $$[$0] 
break;
case 39: 
    if ($$[$0-2].signatures) {
      $$[$0-2].signatures.forEach(function (signature) {
        if (signature.args) {
          var types = $$[$0-1].types;
          var c = -1;
          var cArgPos = 0;
          for (var a = 0; a < $$[$0-1].length; a++) {
            if (signature.args[a])
              signature.args[a].types = $$[$0-1][a].types;
            else { // we're looking at args for a callback
              if (c < 0)
                c = a == 0 ? a : a - 1;

                signature.callback.args[cArgPos].type = $$[$0-1][a].types;
                signature.callback.args[cArgPos].optional = $$[$0-1][a].optional;
                signature.callback.args[cArgPos].ellipsis = $$[$0-1][a].ellipsis;
            }
          }
        }
      });
    }
    this.$.arguments = $$[$0-1];
	  this.$.retDesc = $$[$0];
  
break;
case 40: this.$ = [$$[$0]] 
break;
case 41: this.$.push($$[$0]) 
break;
case 42:
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
case 43:
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
case 44: this.$ = [$$[$0]] 
break;
case 45: this.$.push($$[$0]) 
break;
case 46:
       this.$ = {
          types: $$[$0-2],
          isArray: $$[$0-2].isArray,
          description: $$[$0].replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
        };
     
break;
case 47:
       if (yy.useParenthesis === false || yy.useCurlies === true) {
          console.error("FATAL: You can't use opening parenthesis for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 48:
       if (yy.useParenthesis === true || yy.useCurlies === false) {
          console.error("FATAL: You can't use opening curlies for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 49:
       if (yy.useParenthesis === false || yy.useCurlies === true) {
          console.error("FATAL: You can't use closing parenthesis for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 50:
       if (yy.useParenthesis === true|| yy.useCurlies === false) {
          console.error("FATAL: You can't use closing curlies for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 51: this.$ = [$$[$0]] 
break;
case 52: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 54: this.$ += $$[$0-1] + $$[$0] 
break;
case 56: this.$ += $$[$0-1] + $$[$0] 
break;
case 57: this.$ += $$[$0-1] + $$[$0] 
break;
case 58: this.$ += $$[$0-1] + $$[$0] 
break;
case 59: this.$ = [$$[$0]] 
break;
case 60: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 61: this.$ = [] 
break;
case 62: this.$ = [$$[$0]] 
break;
case 63: this.$ = [$$[$0-1]] 
break;
case 64: this.$ = [$$[$0-1]]; this.$.isArray = true 
break;
case 65: this.$.push($$[$0]) 
break;
case 66: this.$ = String($$[$0]) 
break;
case 67: this.$ = Number($$[$0]) 
break;
case 68: this.$ = $$[$0] === 'true' ? true : false 
break;
case 69: this.$ = new RegExp($$[$0]) 
break;
case 71: this.$ = $$[$0-1]; this.$.array = true 
break;
case 72: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 73: this.$ = $$[$0-1] 
break;
case 74: this.$ = {value: String($$[$0]), type: 'string'} 
break;
case 75: this.$ = {value: Number($$[$0]), type: 'number'} 
break;
case 76: this.$ = {value: true, type: 'boolean'} 
break;
case 77: this.$ = {value: false, type: 'boolean'} 
break;
case 78: this.$ = {value: null, type: 'null'} 
break;
case 79: this.$ = {value: $$[$0], type: 'regexp'} 
break;
case 80: this.$ = {value: $$[$0], type: 'name'} 
break;
case 81: this.$ = $$[$0-1]; this.$.array = true 
break;
case 82: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 83: this.$ = $$[$0-1] 
break;
case 84: this.$ = [] 
break;
case 85: this.$ = [$$[$0]] 
break;
case 86: this.$.push($$[$0]) 
break;
case 87: this.$ = {} 
break;
case 88: this.$ = {}; this.$[$$[$0-2]] = $$[$0] 
break;
case 89: this.$[$$[$0-2]] = $$[$0] 
break;
case 93: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 94: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 95: this.$ = {id: $$[$0], type: 'namespace'}; 
break;
case 96: this.$ = {id: $$[$0], type: 'class'}; 
break;
case 97: this.$ = {id: $$[$0-2], type: 'class', superclass: $$[$0]}; 
break;
case 98: this.$ = {id: $$[$0], type: 'mixin'} 
break;
case 99: 
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 100: 
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 101: this.$ = {id: $$[$0-2], type: 'constant', returns: $$[$0]} 
break;
case 102:
    this.$ = $$[$0];
    if ($$[$0].args) {
      for (var a = 0; a < $$[$0].args.length; a++) {
        if ($$[$0].args[a].callback) {
          $$[$0].callback = $$[$0].args[a];
          break;
        }
      }
    }
    this.$.signatures = [{args: $$[$0].args, callback: $$[$0].callback, returns: $$[$0].returns}];
    delete this.$.args;
    delete this.$.callback;
    delete this.$.returns;
  
break;
case 103:
    if ($$[$0-1].args) {
      for (var a = 0; a < $$[$0-1].args.length; a++) {
        if ($$[$0-1].args[a].callback) {
          $$[$0-1].callback = $$[$0-1].args[a];
          break;
        }
      }
    }
    this.$.signatures = [{args: $$[$0-1].args, callback: $$[$0-1].callback, returns: $$[$0-1].returns}];
    delete this.$.args;
    delete this.$.callback;
    delete this.$.returns;
  
break;
case 105:
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 106:
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 109: this.$ = $$[$0]; this.$.id = this.$.id + '.' + $$[$0-1]; this.$.type = 'constructor' 
break;
case 110: this.$ = {id: $$[$0-3], type: 'method', args: $$[$0-1]} 
break;
case 111: this.$ = {id: $$[$0-4], type: 'method', args: $$[$0-1], bound: true} 
break;
case 112: this.$ = [{type: '?'}] 
break;
case 113:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$ = [ret];
  
break;
case 114:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$.push(ret);
  
break;
case 115: this.$ = [] 
break;
case 116: this.$ = [$$[$0]] 
break;
case 117: this.$.push($$[$0]) 
break;
case 118:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-4].push(a);
    });
  
break;
case 119:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-3].push(a);
    });
  
break;
case 120: this.$ = {name: $$[$0]} 
break;
case 121: this.$ = {name: $$[$0-3], args: $$[$0-1], callback: true}; 
break;
case 122: this.$.default_value = $$[$0] 
break;
case 123: this.$.ellipsis = true 
break;
}
},
table: [{3:1,4:2,5:[2,2],6:[2,2]},{1:[3]},{5:[1,3],6:[1,4]},{1:[2,1]},{7:5,11:6,12:7,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],22:[1,13],24:[1,14],25:[1,15],26:[1,16],27:[1,17],28:[1,18],53:[2,4],59:[2,4],93:[2,4],95:[2,4],97:[2,4],105:[2,4]},{8:19,23:28,45:20,49:21,50:22,51:23,52:24,53:[1,25],54:26,59:[1,32],93:[1,27],95:[1,29],97:[1,30],98:34,101:35,103:31,104:33,105:[1,36]},{13:[1,37],53:[2,5],59:[2,5],93:[2,5],95:[2,5],97:[2,5],105:[2,5]},{13:[2,6],53:[2,6],59:[2,6],93:[2,6],95:[2,6],97:[2,6],105:[2,6]},{13:[2,8],15:[1,38],53:[2,8],59:[2,8],93:[2,8],95:[2,8],97:[2,8],105:[2,8]},{13:[2,11],53:[2,11],59:[2,11],93:[2,11],95:[2,11],97:[2,11],105:[2,11]},{13:[2,12],53:[2,12],59:[2,12],93:[2,12],95:[2,12],97:[2,12],105:[2,12]},{13:[2,13],53:[2,13],59:[2,13],93:[2,13],95:[2,13],97:[2,13],105:[2,13]},{13:[2,14],53:[2,14],59:[2,14],93:[2,14],95:[2,14],97:[2,14],105:[2,14]},{15:[1,39]},{15:[1,40]},{15:[1,41]},{15:[1,42]},{13:[2,19],53:[2,19],59:[2,19],93:[2,19],95:[2,19],97:[2,19],105:[2,19]},{15:[1,43]},{9:44,10:[2,29],48:[1,45]},{10:[2,27],46:[1,46],48:[2,27]},{10:[2,31],46:[2,31],48:[2,31]},{10:[2,32],46:[2,32],48:[2,32]},{10:[2,33],46:[2,33],48:[2,33]},{10:[2,34],46:[2,34],48:[2,34]},{30:47,31:[1,48],34:[1,49],36:[1,50],38:[1,51],40:[1,52],43:[1,53]},{10:[2,36],23:62,46:[2,36],48:[2,36],55:54,56:55,57:57,58:[1,59],59:[1,32],63:[1,60],66:58,67:[1,61],98:34,101:35,103:56,104:33,105:[1,36]},{59:[1,64],94:[1,63]},{10:[2,95],13:[1,70],46:[2,95],48:[2,95],68:[1,68],72:[1,65],73:[1,66],74:[1,67],99:[1,69],102:[1,71]},{23:72,59:[1,32]},{23:73,59:[1,32]},{10:[2,102],46:[2,102],48:[2,102],58:[2,102],59:[2,102],63:[2,102],67:[2,102],105:[2,102]},{10:[2,55],13:[2,55],46:[2,55],48:[2,55],53:[2,55],58:[2,55],59:[2,55],63:[2,55],65:[2,55],67:[2,55],68:[2,55],69:[2,55],72:[2,55],73:[2,55],74:[2,55],76:[2,55],77:[2,55],78:[2,55],79:[2,55],85:[2,55],93:[2,55],95:[2,55],96:[2,55],97:[2,55],99:[2,55],102:[2,55],105:[2,55],107:[2,55]},{10:[2,104],13:[1,74],46:[2,104],48:[2,104],58:[2,104],59:[2,104],63:[2,104],67:[2,104],99:[1,75],105:[2,104]},{10:[2,107],46:[2,107],48:[2,107],58:[2,107],59:[2,107],63:[2,107],67:[2,107],105:[2,107]},{10:[2,108],46:[2,108],48:[2,108],58:[2,108],59:[2,108],63:[2,108],67:[2,108],105:[2,108]},{23:77,59:[1,32],104:76},{12:78,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],22:[1,13],24:[1,14],25:[1,15],26:[1,16],27:[1,17],28:[1,18]},{16:[1,79]},{23:80,59:[1,32]},{23:81,59:[1,32]},{23:82,59:[1,32]},{23:83,59:[1,32]},{29:[1,84]},{10:[1,85]},{10:[2,30]},{23:87,47:86,59:[1,32]},{10:[2,35],46:[2,35],48:[2,35]},{32:[1,88]},{32:[1,89]},{32:[1,90]},{32:[1,91]},{32:[1,92]},{32:[1,93]},{10:[2,37],46:[2,37],48:[2,37],56:94,57:95,58:[1,59],63:[1,60],66:58,67:[1,61]},{10:[2,38],46:[2,38],48:[2,38],66:96,67:[1,61]},{10:[2,103],46:[2,103],48:[2,103],58:[2,103],59:[2,103],63:[2,103],67:[2,103],105:[2,103]},{10:[2,40],46:[2,40],48:[2,40],58:[2,40],63:[2,40],67:[2,40]},{10:[2,44],46:[2,44],48:[2,44],67:[2,44]},{59:[1,97]},{59:[1,98]},{60:99,64:[1,101],68:[1,100]},{13:[1,70],68:[1,68],72:[1,65],73:[1,66],74:[1,67],99:[1,69],102:[1,71]},{93:[1,102]},{93:[1,103]},{59:[1,104]},{59:[1,105]},{59:[1,106]},{13:[2,115],59:[1,110],74:[1,108],77:[2,115],106:107,107:[2,115],108:109},{16:[1,116],23:119,59:[1,32],64:[1,121],75:[1,112],77:[1,120],80:114,81:[1,115],82:[1,117],83:[1,118],92:113,100:111},{16:[1,116],23:119,59:[1,32],64:[1,121],75:[1,112],77:[1,120],80:114,81:[1,115],82:[1,117],83:[1,118],92:113,100:122},{16:[1,116],23:119,59:[1,32],64:[1,121],75:[1,112],77:[1,120],80:114,81:[1,115],82:[1,117],83:[1,118],92:113,100:123},{10:[2,96],46:[2,96],48:[2,96],72:[1,65],73:[1,66],74:[1,67],96:[1,124]},{10:[2,98],46:[2,98],48:[2,98],72:[1,65],73:[1,66],74:[1,67]},{16:[1,116],23:119,59:[1,32],64:[1,121],75:[1,112],77:[1,120],80:114,81:[1,115],82:[1,117],83:[1,118],92:113,100:125},{16:[1,116],23:119,59:[1,32],64:[1,121],75:[1,112],77:[1,120],80:114,81:[1,115],82:[1,117],83:[1,118],92:113,100:126},{10:[2,109],46:[2,109],48:[2,109],58:[2,109],59:[2,109],63:[2,109],67:[2,109],105:[2,109]},{68:[1,68],72:[1,65],73:[1,66],74:[1,67]},{13:[2,7],53:[2,7],59:[2,7],93:[2,7],95:[2,7],97:[2,7],105:[2,7]},{13:[2,9],17:[1,127],53:[2,9],59:[2,9],93:[2,9],95:[2,9],97:[2,9],105:[2,9]},{13:[2,15],53:[2,15],59:[2,15],72:[1,65],73:[1,66],74:[1,67],93:[2,15],95:[2,15],97:[2,15],105:[2,15]},{13:[2,16],53:[2,16],59:[2,16],72:[1,65],73:[1,66],74:[1,67],93:[2,16],95:[2,16],97:[2,16],105:[2,16]},{13:[2,17],53:[2,17],59:[2,17],72:[1,65],73:[1,66],74:[1,67],93:[2,17],95:[2,17],97:[2,17],105:[2,17]},{13:[2,18],53:[2,18],59:[2,18],72:[1,65],73:[1,66],74:[1,67],93:[2,18],95:[2,18],97:[2,18],105:[2,18]},{13:[2,20],53:[2,20],59:[2,20],93:[2,20],95:[2,20],97:[2,20],105:[2,20]},{5:[2,3],6:[2,3]},{10:[2,28],13:[1,128],48:[2,28]},{10:[2,59],13:[2,59],48:[2,59],72:[1,65],73:[1,66],74:[1,67]},{33:[1,129]},{35:[1,130]},{37:[1,131]},{39:[1,132]},{41:[1,133]},{44:[1,134]},{10:[2,39],46:[2,39],48:[2,39],66:96,67:[1,61]},{10:[2,41],46:[2,41],48:[2,41],58:[2,41],63:[2,41],67:[2,41]},{10:[2,45],46:[2,45],48:[2,45],67:[2,45]},{60:135,64:[1,101],68:[1,100]},{64:[1,136]},{23:139,59:[1,32],61:137,75:[1,138],76:[1,140],77:[1,141]},{59:[2,47],75:[2,47],76:[2,47],77:[2,47]},{59:[2,48],75:[2,48],76:[2,48],77:[2,48]},{10:[2,93],46:[2,93],48:[2,93]},{10:[2,94],46:[2,94],48:[2,94]},{10:[2,56],13:[2,56],46:[2,56],48:[2,56],53:[2,56],58:[2,56],59:[2,56],63:[2,56],65:[2,56],67:[2,56],68:[2,56],69:[2,56],72:[2,56],73:[2,56],74:[2,56],76:[2,56],77:[2,56],78:[2,56],79:[2,56],85:[2,56],93:[2,56],95:[2,56],96:[2,56],97:[2,56],99:[2,56],102:[2,56],105:[2,56],107:[2,56]},{10:[2,57],13:[2,57],46:[2,57],48:[2,57],53:[2,57],58:[2,57],59:[2,57],63:[2,57],65:[2,57],67:[2,57],68:[2,57],69:[2,57],72:[2,57],73:[2,57],74:[2,57],76:[2,57],77:[2,57],78:[2,57],79:[2,57],85:[2,57],93:[2,57],95:[2,57],96:[2,57],97:[2,57],99:[2,57],102:[2,57],105:[2,57],107:[2,57]},{10:[2,58],13:[2,58],46:[2,58],48:[2,58],53:[2,58],58:[2,58],59:[2,58],63:[2,58],65:[2,58],67:[2,58],68:[2,58],69:[2,58],72:[2,58],73:[2,58],74:[2,58],76:[2,58],77:[2,58],78:[2,58],79:[2,58],85:[2,58],93:[2,58],95:[2,58],96:[2,58],97:[2,58],99:[2,58],102:[2,58],105:[2,58],107:[2,58]},{13:[1,143],77:[1,144],107:[1,142]},{13:[2,115],59:[1,110],77:[2,115],106:145,107:[2,115],108:109},{13:[2,116],77:[2,116],78:[2,116],85:[1,147],102:[1,146],107:[2,116]},{13:[2,120],68:[1,148],77:[2,120],78:[2,120],85:[2,120],102:[2,120],107:[2,120]},{10:[2,99],46:[2,99],48:[2,99],58:[2,99],59:[2,99],63:[2,99],67:[2,99],79:[1,149],105:[2,99]},{10:[2,112],46:[2,112],48:[2,112],58:[2,112],59:[2,112],63:[2,112],67:[2,112],79:[2,112],105:[2,112]},{10:[2,113],46:[2,113],48:[2,113],58:[2,113],59:[2,113],63:[2,113],67:[2,113],79:[2,113],105:[2,113]},{10:[2,92],13:[2,92],46:[2,92],48:[2,92],58:[2,92],59:[2,92],63:[2,92],67:[2,92],77:[2,92],78:[2,92],79:[2,92],85:[2,92],102:[2,92],105:[2,92],107:[2,92]},{10:[2,66],13:[2,66],46:[2,66],48:[2,66],58:[2,66],59:[2,66],63:[2,66],65:[2,66],67:[2,66],77:[2,66],78:[2,66],79:[2,66],85:[2,66],102:[2,66],105:[2,66],107:[2,66]},{10:[2,67],13:[2,67],46:[2,67],48:[2,67],58:[2,67],59:[2,67],63:[2,67],65:[2,67],67:[2,67],77:[2,67],78:[2,67],79:[2,67],85:[2,67],102:[2,67],105:[2,67],107:[2,67]},{10:[2,68],13:[2,68],46:[2,68],48:[2,68],58:[2,68],59:[2,68],63:[2,68],65:[2,68],67:[2,68],77:[2,68],78:[2,68],79:[2,68],85:[2,68],102:[2,68],105:[2,68],107:[2,68]},{10:[2,69],13:[2,69],46:[2,69],48:[2,69],58:[2,69],59:[2,69],63:[2,69],65:[2,69],67:[2,69],77:[2,69],78:[2,69],79:[2,69],85:[2,69],102:[2,69],105:[2,69],107:[2,69]},{10:[2,70],13:[2,70],46:[2,70],48:[2,70],58:[2,70],59:[2,70],63:[2,70],65:[2,70],67:[2,70],72:[1,65],73:[1,66],74:[1,67],77:[2,70],78:[2,70],79:[2,70],85:[2,70],102:[2,70],105:[2,70],107:[2,70]},{13:[2,84],16:[1,116],23:119,59:[1,32],64:[1,121],77:[1,120],78:[2,84],80:151,81:[1,115],82:[1,117],83:[1,118],84:150,85:[2,84]},{13:[2,87],59:[1,155],65:[2,87],81:[1,154],86:152,91:153},{10:[2,100],46:[2,100],48:[2,100],58:[2,100],59:[2,100],63:[2,100],67:[2,100],79:[1,149],105:[2,100]},{10:[2,101],46:[2,101],48:[2,101],58:[2,101],59:[2,101],63:[2,101],67:[2,101],79:[1,149],105:[2,101]},{23:156,59:[1,32]},{10:[2,105],46:[2,105],48:[2,105],58:[2,105],59:[2,105],63:[2,105],67:[2,105],79:[1,149],105:[2,105]},{10:[2,106],46:[2,106],48:[2,106],58:[2,106],59:[2,106],63:[2,106],67:[2,106],79:[1,149],105:[2,106]},{16:[1,157]},{23:158,59:[1,32]},{10:[2,21],46:[2,21],48:[2,21]},{10:[2,22],46:[2,22],48:[2,22]},{10:[2,23],46:[2,23],48:[2,23]},{10:[2,24],46:[2,24],48:[2,24]},{42:[1,159]},{10:[2,26],46:[2,26],48:[2,26]},{23:139,59:[1,32],61:160,75:[1,138],76:[1,140],77:[1,141]},{23:139,59:[1,32],61:161,75:[1,138],76:[1,140],77:[1,141]},{62:162,65:[1,165],69:[1,164],79:[1,163]},{65:[2,61],69:[2,61],79:[2,61]},{65:[2,62],69:[2,62],72:[1,65],73:[1,66],74:[1,67],79:[2,62]},{23:166,59:[1,32]},{23:167,59:[1,32]},{10:[2,110],13:[2,110],46:[2,110],48:[2,110],58:[2,110],59:[2,110],63:[2,110],67:[2,110],99:[2,110],105:[2,110]},{59:[1,110],77:[1,169],108:168},{13:[2,115],59:[1,110],77:[2,115],78:[2,115],106:170,108:109},{13:[1,143],77:[1,144],107:[1,171]},{16:[1,116],23:119,59:[1,32],64:[1,121],77:[1,120],80:114,81:[1,115],82:[1,117],83:[1,118],92:172},{13:[2,123],77:[2,123],78:[2,123],85:[2,123],102:[2,123],107:[2,123]},{13:[2,115],59:[1,110],77:[2,115],106:173,107:[2,115],108:109},{16:[1,116],23:119,59:[1,32],64:[1,121],77:[1,120],80:114,81:[1,115],82:[1,117],83:[1,118],92:174},{13:[1,177],78:[1,175],85:[1,176]},{13:[2,85],78:[2,85],85:[2,85]},{13:[1,179],65:[1,178]},{15:[1,180]},{15:[2,90]},{15:[2,91]},{10:[2,97],46:[2,97],48:[2,97],72:[1,65],73:[1,66],74:[1,67]},{13:[2,10],53:[2,10],59:[2,10],93:[2,10],95:[2,10],97:[2,10],105:[2,10]},{10:[2,60],13:[2,60],48:[2,60],72:[1,65],73:[1,66],74:[1,67]},{10:[2,25],46:[2,25],48:[2,25]},{62:181,65:[1,165],69:[1,164],79:[1,163]},{65:[1,182],79:[1,163]},{48:[1,183]},{23:184,59:[1,32]},{48:[2,49]},{48:[2,50]},{72:[1,65],73:[1,66],74:[1,67],76:[1,185]},{72:[1,65],73:[1,66],74:[1,67],78:[1,186]},{13:[2,117],77:[2,117],78:[2,117],85:[1,147],102:[1,146],107:[2,117]},{13:[2,115],59:[1,110],77:[2,115],78:[2,115],106:187,108:109},{13:[1,143],77:[1,144],78:[1,188]},{10:[2,111],13:[2,111],46:[2,111],48:[2,111],58:[2,111],59:[2,111],63:[2,111],67:[2,111],99:[2,111],105:[2,111]},{13:[2,122],77:[2,122],78:[2,122],85:[2,122],102:[2,122],107:[2,122]},{13:[1,143],77:[1,144],107:[1,189]},{10:[2,114],46:[2,114],48:[2,114],58:[2,114],59:[2,114],63:[2,114],67:[2,114],79:[2,114],105:[2,114]},{10:[2,71],13:[2,71],46:[2,71],48:[2,71],58:[2,71],59:[2,71],63:[2,71],65:[2,71],67:[2,71],77:[2,71],78:[2,71],79:[2,71],85:[2,71],102:[2,71],105:[2,71],107:[2,71]},{78:[1,190]},{16:[1,116],23:119,59:[1,32],64:[1,121],77:[1,120],80:191,81:[1,115],82:[1,117],83:[1,118]},{10:[2,73],13:[2,73],46:[2,73],48:[2,73],58:[2,73],59:[2,73],63:[2,73],65:[2,73],67:[2,73],77:[2,73],78:[2,73],79:[2,73],85:[2,73],102:[2,73],105:[2,73],107:[2,73]},{59:[1,155],81:[1,154],91:192},{16:[1,116],23:119,59:[1,32],64:[1,121],77:[1,120],80:193,81:[1,115],82:[1,117],83:[1,118]},{48:[1,194]},{48:[1,195]},{10:[2,46],46:[2,46],48:[2,46],67:[2,46]},{65:[2,65],69:[2,65],72:[1,65],73:[1,66],74:[1,67],79:[2,65]},{65:[2,63],69:[2,63],79:[2,63]},{65:[2,64],69:[2,64],79:[2,64]},{13:[1,143],77:[1,144],78:[1,196]},{13:[2,119],77:[2,119],78:[2,119],107:[2,119]},{13:[2,121],77:[2,121],78:[2,121],85:[2,121],102:[2,121],107:[2,121]},{10:[2,72],13:[2,72],46:[2,72],48:[2,72],58:[2,72],59:[2,72],63:[2,72],65:[2,72],67:[2,72],77:[2,72],78:[2,72],79:[2,72],85:[2,72],102:[2,72],105:[2,72],107:[2,72]},{13:[2,86],78:[2,86],85:[2,86]},{15:[1,197]},{13:[2,88],65:[2,88]},{10:[2,42],46:[2,42],48:[2,42],58:[2,42],63:[2,42],67:[2,42]},{10:[2,43],46:[2,43],48:[2,43],58:[2,43],63:[2,43],67:[2,43]},{13:[2,118],77:[2,118],78:[2,118],107:[2,118]},{16:[1,116],23:119,59:[1,32],64:[1,121],77:[1,120],80:198,81:[1,115],82:[1,117],83:[1,118]},{13:[2,89],65:[2,89]}],
defaultActions: {3:[2,1],45:[2,30],154:[2,90],155:[2,91],164:[2,49],165:[2,50]},
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
less:function (n) {
        this._input = this.match.slice(n) + this._input;
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
            if (this.done && this._input) this.done = false;
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
case 9:return 73
break;
case 10:return 72
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
case 24:return 28
break;
case 25:return 59
break;
case 26:return 81
break;
case 27:return 29
break;
case 28:this.popState(); return 10
break;
case 29:return 48
break;
case 30:/* skip whitespaces */
break;
case 31:this.begin('arg'); return 69
break;
case 32:this.begin('arg'); return 65
break;
case 33:return 63
break;
case 34:return 58
break;
case 35:return 67
break;
case 36:return 'FIRES'
break;
case 37:return 46
break;
case 38:/*return '*'*/
break;
case 39:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 81
break;
case 40:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 81
break;
case 41:return 16
break;
case 42:return 83
break;
case 43:return 82
break;
case 44:return 82
break;
case 45:return 73
break;
case 46:return 74
break;
case 47:return 75
break;
case 48:return 85
break;
case 49:return 72
break;
case 50:return 13
break;
case 51:return 99
break;
case 52:return 93
break;
case 53:return 102
break;
case 54:return 96
break;
case 55:return 15
break;
case 56:return 68
break;
case 57:return 107
break;
case 58:return 64
break;
case 59:return 65
break;
case 60:return 77
break;
case 61:return 78
break;
case 62:return 79
break;
case 63:return 76
break;
case 64:return 95
break;
case 65:return 97
break;
case 66:return 105
break;
case 67:return 59
break;
case 68:return 81
break;
case 69:this.popState(); return 48
break;
case 70:this.popState(); console.log('LEFTCOMM'); return 48
break;
}
};
lexer.rules = [/^(?:$)/,/^(?:\s+)/,/^(?:\/\*\*(?=([^/])))/,/^(?:.*)/,/^(?:\*\*\/)/,/^(?:\s*[\n])/,/^(?:, )/,/^(?:: )/,/^(?:\.\.)/,/^(?:#)/,/^(?:\.)/,/^(?:\s+)/,/^(?:(-?(?:[0-9]|[1-9][0-9]+))((?:\.[\.0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/,/^(?:deprecated\b)/,/^(?:read-only\b)/,/^(?:internal\b)/,/^(?:hide\b)/,/^(?:chainable\b)/,/^(?:section\b)/,/^(?:alias of\b)/,/^(?:alias\b)/,/^(?:related to\b)/,/^(?:belongs to\b)/,/^(?:extension\b)/,/^(?:metadata\b)/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9]*)))/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9 ]*)))/,/^(?:((?:\{["':$_a-zA-Z0-9 \,]*\})))/,/^(?:\*\*\/)/,/^(?:\*\s*?[\n][\s\S]*?(?=\*\*\/))/,/^(?:\s+)/,/^(?:\)\s*:)/,/^(?:\}\s+)/,/^(?:\*\s*\*)/,/^(?:\*\s*-)/,/^(?:\*\s*\+)/,/^(?:\*\s*fires\b)/,/^(?:\*\s*includes\b)/,/^(?:\*)/,/^(?:"(?:(\\)["bfnrt/(\\)]|(\\)u[a-fA-F0-9]{4}|[^"(\\)])*")/,/^(?:'(?:(\\)["bfnrt/(\\)]|(\\)u[a-fA-F0-9]{4}|[^'(\\)])*')/,/^(?:(-?(?:[0-9]|[1-9][0-9]+))((?:\.[\.0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/,/^(?:\/(?:[^\/]|\\\/)*\/[gim]*)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:#)/,/^(?:@)/,/^(?:\?)/,/^(?:\.\.\.)/,/^(?:\.)/,/^(?:,)/,/^(?:->)/,/^(?:==)/,/^(?:=)/,/^(?:<)/,/^(?::)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:\|)/,/^(?:`)/,/^(?:class\b)/,/^(?:mixin\b)/,/^(?:new\b)/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9]*)))/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9 ]*)))/,/^(?:[\s\S]*?(?=(\*\s*[\-\+\n])))/,/^(?:[\s\S]*?(?=\*\*\/))/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3],"inclusive":true},"tags":{"rules":[0,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],"inclusive":false},"def":{"rules":[0,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68],"inclusive":false},"arg":{"rules":[0,69],"inclusive":false},"comment":{"rules":[0,70],"inclusive":false}};
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