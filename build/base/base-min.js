YUI.add("base-base",function(B){var M=B.Lang;function E(L){this._plugins={};}E.prototype={plug:function(U,L){if(U){if(M.isFunction(U)){this._plug(U,L);}else{if(M.isArray(U)){for(var O=0,T=U.length;O<T;O++){this.plug(U[O]);}}else{this._plug(U.fn,U.cfg);}}}return this;},unplug:function(O){if(O){this._unplug(O);}else{var L;for(L in this._plugins){if(this._plugins.hasOwnProperty(L)){this._unplug(L);}}}return this;},hasPlugin:function(L){return(this._plugins[L]&&this[L]);},_initPlugins:function(O){var U=(this._getClasses)?this._getClasses():null,L=[],V={},T,W,Y,Z,X;if(U){for(W=U.length-1;W>=0;W--){T=U[W];Z=T._UNPLUG;if(Z){B.mix(V,Z,true);}Y=T._PLUG;if(Y){B.mix(L,Y,true);}}}for(X in L){if(L.hasOwnProperty(X)){if(!V[X]){this.plug(L[X]);}}}if(O&&O.plugins){this.plug(O.plugins);}},_destroyPlugins:function(){this._unplug();},_plug:function(T,L){if(T&&T.NS){var O=T.NS;L=L||{};L.host=this;if(this.hasPlugin(O)){this[O].setAttrs(L);}else{this[O]=new T(L);this._plugins[O]=T;}}},_unplug:function(T){var O=T,L=this._plugins;if(M.isFunction(T)){O=T.NS;if(O&&(!L[O]||L[O]!==T)){O=null;}}if(O){if(this[O]){this[O].destroy();delete this[O];}if(L[O]){delete L[O];}}}};E.plug=function(O,W,U){var X,V,L,T;if(O!==B.Base){O._PLUG=O._PLUG||{};if(!M.isArray(W)){if(U){W={fn:W,cfg:U};}W=[W];}for(V=0,L=W.length;V<L;V++){X=W[V];T=X.NAME||X.fn.NAME;O._PLUG[T]=X;}}};E.unplug=function(O,V){var W,U,L,T;if(O!==B.Base){O._UNPLUG=O._UNPLUG||{};if(!M.isArray(V)){V=[V];}for(U=0,L=V.length;U<L;U++){W=V[U];T=W.NAME;if(!O._PLUG[T]){O._UNPLUG[T]=W;}else{delete O._PLUG[T];}}}};B.namespace("Plugin").Host=E;var J=B.Object,K=".",G="destroy",R="init",Q="initialized",I="destroyed",D="initializer",C=Object.prototype.constructor,N="deep",S="shallow",H="value",P="destructor",A=B.Attribute;function F(){A.call(this);E.call(this);if(this._lazyAddAttrs!==false){this._lazyAddAttrs=true;}this.init.apply(this,arguments);}F._ATTR_CFG=A._ATTR_CFG.concat("cloneDefaultValue");F.NAME="base";F.ATTRS={initialized:{readOnly:true,value:false},destroyed:{readOnly:true,value:false}};F.prototype={init:function(L){this._yuievt.config.prefix=this.name=this.constructor.NAME;this.publish(R,{queuable:false,defaultFn:this._defInitFn});if(L){if(L.on){this.on(L.on);}if(L.after){this.after(L.after);}}this.fire(R,{cfg:L});return this;},destroy:function(){this.publish(G,{queuable:false,defaultFn:this._defDestroyFn});this.fire(G);return this;},_defInitFn:function(L){this._initHierarchy(L.cfg);this._initPlugins(L.cfg);this._set(Q,true);},_defDestroyFn:function(L){this._destroyHierarchy();this._destroyPlugins();this._set(I,true);},_getClasses:function(){if(!this._classes){this._initHierarchyData();}return this._classes;},_getAttrCfgs:function(){if(!this._attrs){this._initHierarchyData();}return this._attrs;},_filterAttrCfgs:function(V,O){var T=null,L,U=V.ATTRS;if(U){for(L in U){if(U.hasOwnProperty(L)&&O[L]){T=T||{};T[L]=O[L];delete O[L];}}}return T;},_initHierarchyData:function(){var T=this.constructor,O=[],L=[];while(T){O[O.length]=T;if(T.ATTRS){L[L.length]=T.ATTRS;}T=T.superclass?T.superclass.constructor:null;}this._classes=O;this._attrs=this._aggregateAttrs(L);},_aggregateAttrs:function(Y){var V,Z,U,L,a,O,X,T=F._ATTR_CFG,W={};if(Y){for(O=Y.length-1;O>=0;--O){Z=Y[O];for(V in Z){if(Z.hasOwnProperty(V)){U=B.mix({},Z[V],true,T);L=U.value;X=U.cloneDefaultValue;if(L){if((X===undefined&&(C===L.constructor||M.isArray(L)))||X===N||X===true){U.value=B.clone(L);}else{if(X===S){U.value=B.merge(L);}}}a=null;if(V.indexOf(K)!==-1){a=V.split(K);V=a.shift();}if(a&&W[V]&&W[V].value){J.setValue(W[V].value,a,L);}else{if(!a){if(!W[V]){W[V]=U;}else{B.mix(W[V],U,true,T);}}}}}}}return W;},_initHierarchy:function(W){var T=this._lazyAddAttrs,X,Y,Z,U,O,V=this._getClasses(),L=this._getAttrCfgs();for(Z=V.length-1;Z>=0;Z--){X=V[Z];Y=X.prototype;if(X._yuibuild&&X._yuibuild.exts&&!X._yuibuild.dynamic){for(U=0,O=X._yuibuild.exts.length;U<O;U++){X._yuibuild.exts[U].apply(this,arguments);}}this.addAttrs(this._filterAttrCfgs(X,L),W,T);if(Y.hasOwnProperty(D)){Y.initializer.apply(this,arguments);}}},_destroyHierarchy:function(){var V,O,U,L,T=this._getClasses();for(U=0,L=T.length;U<L;U++){V=T[U];O=V.prototype;if(O.hasOwnProperty(P)){O.destructor.apply(this,arguments);}}},toString:function(){return this.constructor.NAME+"["+B.stamp(this)+"]";}};B.mix(F,A,false,null,1);B.mix(F,E,false,null,1);F.plug=E.plug;F.unplug=E.unplug;F.prototype.constructor=F;B.Base=F;},"@VERSION@",{requires:["attribute"]});YUI.add("base-build",function(C){var B=C.Base,A=C.Lang;B._buildCfg={aggregates:["ATTRS","_PLUG","_UNPLUG"]};B.build=function(D,I,M,L){var O=B.build,E=O._getClass(I,L),K=O._getAggregates(I,L),G=E._yuibuild.dynamic,J,H,F,N;if(G){if(K){for(J=0,H=K.length;J<H;++J){F=K[J];if(I.hasOwnProperty(F)){E[F]=A.isArray(I[F])?[]:{};}}C.aggregate(E,I,true,K);}}for(J=0,H=M.length;J<H;J++){N=M[J];if(K){C.aggregate(E,N,true,K);}C.mix(E,N,true,null,1);E._yuibuild.exts.push(N);}E.prototype.hasImpl=O._hasImpl;if(G){E.NAME=D;E.prototype.constructor=E;}return E;};C.mix(B.build,{_template:function(D){function E(){E.superclass.constructor.apply(this,arguments);var H=E._yuibuild.exts,F=H.length,G;for(G=0;G<F;G++){H[G].apply(this,arguments);}return this;}C.extend(E,D);return E;},_hasImpl:function(G){var J=this._getClasses();for(var I=0,E=J.length;I<E;I++){var D=J[I];if(D._yuibuild){var H=D._yuibuild.exts,K=H.length,F;for(F=0;F<K;F++){if(H[F]===G){return true;}}}}return false;},_getClass:function(D,E){var F=(E&&false===E.dynamic)?false:true,G=(F)?B.build._template(D):D;G._yuibuild={id:null,exts:[],dynamic:F};return G;},_getAggregates:function(D,E){var F=[],H=(E&&E.aggregates),I=D,G;while(I&&I.prototype){G=I._buildCfg&&I._buildCfg.aggregates;if(G){F=F.concat(G);}I=I.superclass?I.superclass.constructor:null;}if(H){F=F.concat(H);}return F;}});},"@VERSION@",{requires:["base-base"]});YUI.add("base",function(A){},"@VERSION@",{use:["base-base","base-build"]});