(this["webpackJsonpkarteikarten-webapp"]=this["webpackJsonpkarteikarten-webapp"]||[]).push([[0],{41:function(e,t,n){},62:function(e,t,n){e.exports=n(88)},67:function(e,t,n){},88:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(26),o=n.n(r),l=(n(67),n(48)),s=n(49),i=n(60),u=n(50),d=n(61),m=(n(41),n(12)),p=n(16),f=(n(72),n(19)),b=Object(f.a)(),v=n(21),E=n(59),h=n(11),x=n(10),O={loggedIn:!1},j={newCollection:null,newCard:null,editCollection:null,collections:[]},k={reviewCollection:null,cardIndex:0,scorecards:[]},g={busy:!1,error:null},w=n(29),y={globalContext:{}},C=Object(v.c)({routing:h.routerReducer,network:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0;return"pending"===t.status?Object(x.a)({},e,{busy:!0}):"error"===t.status?Object(x.a)({},e,{busy:!1,error:t.error}):"success"===t.status?Object(x.a)({},e,{error:null,busy:!1}):g},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;if("pending"===t.status)return e;switch(t.type){case"login":return"success"===t.status?(localStorage.setItem("access_token",t.accessToken),Object(x.a)({},e,{loggedIn:!0})):(localStorage.removeItem("access_token"),Object(x.a)({},e,{loggedIn:!1}));default:return e}},coreData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments.length>1?arguments[1]:void 0;if("pending"===t.status)return e;switch(t.type){case"create-collection":return"success"===t.status?Object(x.a)({},e,{newCollection:Object(x.a)({},t.collection,{items:[]})}):e;case"create-card-in-new-collection":return"success"===t.status&&e.newCollection&&t.collection.id===e.newCollection.id?Object(x.a)({},e,{newCollection:Object(x.a)({},e.newCollection,{item_ids:e.newCollection.item_ids.concat(t.card.id),items:e.newCollection.items.concat(t.card)}),newCard:t.card}):e;case"update-card-in-collection":if("success"===t.status){var n=Object(x.a)({},t.collection,{items:t.collection.items.map((function(e){return e.id===t.card.id?t.card:e}))});return Object(x.a)({},e,{editCollection:n})}return e;case"fetch-collections":case"fetch-recent-collections":return"success"===t.status?Object(x.a)({},e,{collections:t.collections}):e;case"view-collection":return"success"===t.status?Object(x.a)({},e,{editCollection:Object(x.a)({},t.collection)}):e;default:return e}},review:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;if("pending"===t.status)return e;switch(t.type){case"review-collection":return"success"===t.status?Object(x.a)({},e,{scorecards:[],reviewCollection:Object(x.a)({},t.collection),cardIndex:t.cardIndex,complete:!1}):e;case"review-card":return"success"===t.status?Object(x.a)({},e,{cardIndex:t.cardIndex}):e;case"answer-match":return"success"===t.status?Object(x.a)({},e,{scorecards:e.scorecards.concat(t.scorecard)}):e;case"review-result":return"success"===t.status?Object(x.a)({},e,{complete:!0}):e;default:return e}},media:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;if("pending"===t.status)return e;if("success"!==t.status)return e;switch(t.type){case"upload-asset":case"rotate-image-left":case"rotate-image-right":return Object(x.a)({},e,Object(w.a)({},t.mediaContext,t.media))}return e}}),N=n(7),I=n.n(N),_=n(4);function S(e,t){var n,a,c,r,o=arguments;return I.a.async((function(l){for(;;)switch(l.prev=l.next){case 0:return n=o.length>2&&void 0!==o[2]?o[2]:null,a=localStorage.getItem("access_token"),c=Object(x.a)({"Content-Type":"application/json"},a?{Authorization:"Bearer ".concat(a)}:{}),n instanceof FormData&&delete c["Content-Type"],l.next=6,I.a.awrap(fetch(e,{method:t,headers:c,body:"application/json"===c["Content-Type"]?n&&JSON.stringify(n):n}));case 6:if(!((r=l.sent).status<500)){l.next=11;break}return l.abrupt("return",r.json());case 11:return l.abrupt("return",r.text());case 12:case"end":return l.stop()}}))}function D(e){return I.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",S(e,"get"));case 1:case"end":return t.stop()}}))}var P=function(e){return{post:function(t,n){return function(e,t){return I.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",S(e,"post",t));case 1:case"end":return n.stop()}}))}("".concat(e).concat(t),n)},patch:function(t,n){return function(e,t){return I.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",S(e,"patch",t));case 1:case"end":return n.stop()}}))}("".concat(e).concat(t),n)},put:function(t,n){return function(e,t){return I.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",S(e,"put",t));case 1:case"end":return n.stop()}}))}("".concat(e).concat(t),n)},get:function(t){return D("".concat(e).concat(t))}}},L=I.a.mark(T),M=I.a.mark(R),F=P("https://karkeikarten.herokuapp.com").post;function T(e){var t,n;return I.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.authData,a.next=3,F("/auth/register",{id_token:t.tokenId});case 3:if((n=a.sent).ok){a.next=9;break}return a.next=7,Object(_.b)({type:"login",status:"error",error:n.error});case 7:a.next=13;break;case 9:return a.next=11,Object(_.b)({type:"login",status:"success",accessToken:n.access_token});case 11:return a.next=13,Object(_.b)(Object(h.replace)("/"));case 13:case"end":return a.stop()}}),L)}function R(){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(_.d)((function(e){var t=e.type,n=e.status;return"login"===t&&"pending"===n}),T);case 2:case"end":return e.stop()}}),M)}var A=n(32),B=I.a.mark(ee),V=I.a.mark(te),z=I.a.mark(ne),W=I.a.mark(ae),Y=I.a.mark(ce),X=I.a.mark(re),J=I.a.mark(oe),K=I.a.mark(le),U=I.a.mark(se),q=I.a.mark(ie),G=I.a.mark(ue),H=P("https://karkeikarten.herokuapp.com"),$=H.get,Q=H.patch,Z=H.post;function ee(e){var t,n;return I.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.collection,a.next=3,Z("/collections",t);case 3:if((n=a.sent).ok){a.next=9;break}return a.next=7,Object(_.b)({type:"create-collection",status:"error",error:n.error});case 7:a.next=13;break;case 9:return a.next=11,Object(_.b)({type:"create-collection",status:"success",collection:n.collection});case 11:return a.next=13,Object(_.b)(Object(h.replace)("/create-collection/step-1"));case 13:case"end":return a.stop()}}),B)}function te(e){var t,n,a,c,r;return I.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t=e.type,n=e.collection,a=e.card,o.next=3,Z("/cards",a);case 3:if((c=o.sent).ok){o.next=8;break}return o.next=7,Object(_.b)({type:t,status:"error",error:c.error});case 7:return o.abrupt("return");case 8:return o.next=10,Q("/collections/".concat(n.id),{item_ids:n.item_ids.concat(c.card.id)});case 10:if(r=o.sent,c.ok){o.next=15;break}return o.next=14,Object(_.b)({type:t,status:"error",error:r.error});case 14:return o.abrupt("return");case 15:if("create-card-in-new-collection"!==t){o.next=20;break}return o.next=18,Object(_.b)({type:t,status:"success",collection:r.collection,card:c.card});case 18:o.next=22;break;case 20:return o.next=22,ce({collectionId:r.collection.id});case 22:case"end":return o.stop()}}),V)}function ne(e){var t;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$("/collections?features=stats");case 2:if((t=e.sent).ok){e.next=7;break}return e.next=6,Object(_.b)({type:"fetch-collections",status:"error",error:t.error});case 6:return e.abrupt("return");case 7:return e.next=9,Object(_.b)({type:"fetch-collections",status:"success",collections:t.collections});case 9:case"end":return e.stop()}}),z)}function ae(e){var t,n;return I.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.type,a.next=3,$("/collections/recent?features=stats");case 3:if((n=a.sent).ok){a.next=8;break}return a.next=7,Object(_.b)({type:t,status:"error",error:n.error});case 7:return a.abrupt("return");case 8:return a.next=10,Object(_.b)({type:t,status:"success",collections:n.collections});case 10:case"end":return a.stop()}}),W)}function ce(e){var t,n;return I.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.collectionId,a.next=3,$("/collections/".concat(t));case 3:if((n=a.sent).ok){a.next=8;break}return a.next=7,Object(_.b)({type:"view-collection",status:"error",error:n.error});case 7:return a.abrupt("return");case 8:return a.next=10,Object(_.b)({type:"view-collection",status:"success",collection:n.collection});case 10:case"end":return a.stop()}}),Y)}function re(e){var t,n,a,c;return I.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.collection,n=t.id,a=Object(A.a)(t,["id"]),r.next=3,Q("/collections/".concat(n),a);case 3:if((c=r.sent).ok){r.next=8;break}return r.next=7,Object(_.b)({type:"update-collection",status:"error",error:c.error});case 7:return r.abrupt("return");case 8:return r.next=10,Object(_.b)({type:"update-collection",status:"success",collection:c.collection});case 10:case"end":return r.stop()}}),X)}function oe(e){var t,n,a,c,r,o;return I.a.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return t=e.type,n=e.collection,a=e.card,c=a.id,r=Object(A.a)(a,["id"]),l.next=3,Q("/cards/".concat(c),r);case 3:if((o=l.sent).ok){l.next=8;break}return l.next=7,Object(_.b)({type:t,status:"error",error:o.error});case 7:return l.abrupt("return");case 8:return l.next=10,Object(_.b)({type:t,status:"success",collection:n,card:o.card});case 10:case"end":return l.stop()}}),J)}function le(e){var t,n,a,c,r,o,l;return I.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return t=e.type,n=e.cardId,a=e.toCollectionId,s.next=3,Object(_.c)((function(e){return e.coreData.editCollection.id}));case 3:return c=s.sent,s.next=6,$("/collections/".concat(a));case 6:if(r=s.sent,o=r.collection){s.next=12;break}return s.next=11,Object(_.b)({type:"copy-card",status:"error",error:"Collection not found"});case 11:return s.abrupt("return");case 12:return s.next=14,Q("/collections/".concat(a),Object(x.a)({},o,{item_ids:o.item_ids.concat(n)}));case 14:if((l=s.sent).ok){s.next=19;break}return s.next=18,Object(_.b)({type:"copy-card",status:"error",error:l.error});case 18:return s.abrupt("return");case 19:return s.next=21,Object(_.b)({type:t,status:"success",collection:l.collection});case 21:return s.next=23,ce({collectionId:c});case 23:case"end":return s.stop()}}),K)}function se(e){var t,n,a,c,r,o,l,s,i,u,d;return I.a.wrap((function(m){for(;;)switch(m.prev=m.next){case 0:return t=e.type,n=e.cardId,a=e.toCollectionId,m.next=3,$("/cards/".concat(n));case 3:if(c=m.sent,r=c.card){m.next=9;break}return m.next=8,Object(_.b)({type:"clone-card",status:"error",error:"Card not found"});case 8:return m.abrupt("return");case 9:return m.next=11,Z("/cards",{front:r.front,back:r.back});case 11:if(o=m.sent,l=o.card,s=(l=void 0===l?{}:l).id){m.next=19;break}return m.next=18,Object(_.b)({type:"clone-card",status:"error",error:"Card not found"});case 18:return m.abrupt("return");case 19:return m.next=21,$("/collections/".concat(a));case 21:if(i=m.sent,u=i.collection){m.next=27;break}return m.next=26,Object(_.b)({type:"clone-card",status:"error",error:"Collection not found"});case 26:return m.abrupt("return");case 27:return m.next=29,Q("/collections/".concat(a),Object(x.a)({},u,{item_ids:u.item_ids.map((function(e){return e===n?s:e}))}));case 29:if((d=m.sent).ok){m.next=34;break}return m.next=33,Object(_.b)({type:"clone-card",status:"error",error:d.error});case 33:return m.abrupt("return");case 34:return m.next=36,Object(_.b)({type:t,status:"success",collection:d.collection});case 36:return m.next=38,ce({collectionId:a});case 38:case"end":return m.stop()}}),U)}function ie(e){var t,n,a,c,r,o,l,s,i,u;return I.a.wrap((function(d){for(;;)switch(d.prev=d.next){case 0:return t=e.type,n=e.cardId,a=e.fromCollectionId,c=e.toCollectionId,d.next=3,$("/collections/".concat(a));case 3:if(r=d.sent,o=r.collection){d.next=9;break}return d.next=8,Object(_.b)({type:"move-card",status:"error",error:"Collection not found"});case 8:return d.abrupt("return");case 9:return d.next=11,$("/collections/".concat(c));case 11:if(l=d.sent,s=l.collection){d.next=17;break}return d.next=16,Object(_.b)({type:"move-card",status:"error",error:"Collection not found"});case 16:return d.abrupt("return");case 17:return d.next=19,Q("/collections/".concat(a),Object(x.a)({},o,{item_ids:o.item_ids.filter((function(e){return e!==n}))}));case 19:if((i=d.sent).ok){d.next=24;break}return d.next=23,Object(_.b)({type:"copy-card",status:"error",error:i.error});case 23:return d.abrupt("return");case 24:return d.next=26,Q("/collections/".concat(c),Object(x.a)({},s,{item_ids:s.item_ids.concat(n)}));case 26:if((u=d.sent).ok){d.next=31;break}return d.next=30,Object(_.b)({type:"copy-card",status:"error",error:u.error});case 30:return d.abrupt("return");case 31:return d.next=33,Object(_.b)({type:t,status:"success"});case 33:return d.next=35,ce({collectionId:a});case 35:case"end":return d.stop()}}),q)}function ue(){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(_.d)((function(e){var t=e.type,n=e.status;return"create-collection"===t&&"pending"===n}),ee);case 2:return e.next=4,Object(_.d)((function(e){var t=e.type,n=e.status;return("create-card-in-new-collection"===t||"create-card-in-collection"===t)&&"pending"===n}),te);case 4:return e.next=6,Object(_.d)((function(e){var t=e.type,n=e.status;return"update-card-in-collection"===t&&"pending"===n}),oe);case 6:return e.next=8,Object(_.d)((function(e){var t=e.type,n=e.status;return"fetch-collections"===t&&"pending"===n}),ne);case 8:return e.next=10,Object(_.d)((function(e){var t=e.type,n=e.status;return"fetch-recent-collections"===t&&"pending"===n}),ae);case 10:return e.next=12,Object(_.d)((function(e){var t=e.type,n=e.status;return"view-collection"===t&&"pending"===n}),ce);case 12:return e.next=14,Object(_.d)((function(e){var t=e.type,n=e.status;return"update-collection"===t&&"pending"===n}),re);case 14:return e.next=16,Object(_.d)((function(e){var t=e.type,n=e.status;return"copy-card"===t&&"pending"===n}),le);case 16:return e.next=18,Object(_.d)((function(e){var t=e.type,n=e.status;return"move-card"===t&&"pending"===n}),ie);case 18:return e.next=20,Object(_.d)((function(e){var t=e.type,n=e.status;return"clone-card"===t&&"pending"===n}),se);case 20:case"end":return e.stop()}}),G)}var de=n(52),me=n.n(de),pe=I.a.mark(xe),fe=I.a.mark(Oe),be=I.a.mark(je),ve=P("https://karkeikarten.herokuapp.com"),Ee=ve.get,he=ve.patch;function xe(e){var t,n,a,c,r;return I.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t=e.collectionId,o.next=3,Ee("/collections/".concat(t));case 3:if((n=o.sent).ok){o.next=8;break}return o.next=7,Object(_.b)({type:"review-collection",status:"error",error:n.error});case 7:return o.abrupt("return");case 8:return o.next=10,he("/me/recent-collections",{collection_id:t});case 10:return(a=n.collection.items).sort((function(){return Math.round(2*Math.random()-1)})),4,c=me()(a,"back"),r=a.map((function(e){var t=new Array(Math.min(c.length-1,4)).fill(0).map((function(){return c[Math.floor(Math.random()*c.length)]})),n=t.findIndex((function(t){return e.back===t.back}));return-1===n&&(n=Math.floor(4*Math.random())),t.splice(n,1,e),Object(x.a)({},e,{choices:t})})),o.next=17,Object(_.b)({type:"review-collection",status:"success",collection:Object(x.a)({},n.collection,{items:r}),cardIndex:0});case 17:case"end":return o.stop()}}),pe)}function Oe(e){var t,n,a,c,r,o,l,s;return I.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return t=e.answer,n=t.card,a=t.choice,c=n.id===a.id?{corrects:1}:{wrongs:1},i.next=4,he("/me/scorecard/".concat(n.id),c);case 4:if((r=i.sent).ok){i.next=9;break}return i.next=8,Object(_.b)({type:"answer-match",status:"error",error:r.error});case 8:return i.abrupt("return");case 9:return i.next=11,Object(_.b)({type:"answer-match",status:"success",scorecard:Object(x.a)({},r.scorecard,{card:n,correct:n.id===a.id})});case 11:return i.next=13,Object(_.c)((function(e){return{reviewCollection:e.review.reviewCollection,cardIndex:e.review.cardIndex}}));case 13:if(o=i.sent,l=o.reviewCollection,!((s=o.cardIndex)<l.items.length-1)){i.next=21;break}return i.next=19,Object(_.b)({type:"review-card",status:"success",cardIndex:s+1});case 19:i.next=25;break;case 21:return i.next=23,Object(_.b)({type:"review-result",status:"success"});case 23:return i.next=25,Object(_.b)(Object(h.replace)("/review/result"));case 25:case"end":return i.stop()}}),fe)}function je(){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(_.d)((function(e){var t=e.type,n=e.status;return"review-collection"===t&&"pending"===n}),xe);case 2:return e.next=4,Object(_.d)((function(e){var t=e.type,n=e.status;return"answer-match"===t&&"pending"===n}),Oe);case 4:case"end":return e.stop()}}),be)}var ke=I.a.mark(_e),ge=I.a.mark(De),we=I.a.mark(Pe),ye=I.a.mark(Le),Ce=P("https://karkeikarten.herokuapp.com"),Ne=Ce.post,Ie=Ce.put;function _e(e){var t,n,a,c,r;return I.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t=e.type,n=e.mediaContext,a=e.file,(c=new FormData).append("file",a),o.prev=3,o.next=6,Ne("/media",c);case 6:if((r=o.sent).ok){o.next=12;break}return o.next=10,Object(_.b)({type:t,status:"error",error:r.error});case 10:o.next=14;break;case 12:return o.next=14,Object(_.b)({type:t,status:"success",mediaContext:n,media:r.media});case 14:o.next=20;break;case 16:return o.prev=16,o.t0=o.catch(3),o.next=20,Object(_.b)({type:t,status:"error",error:o.t0});case 20:case"end":return o.stop()}}),ke,null,[[3,16]])}function Se(e,t){return I.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log("Rotating media ".concat(e,"...")),n.abrupt("return",Ie("/media/".concat(e,"?op=").concat(t)));case 2:case"end":return n.stop()}}))}function De(e){var t,n,a,c;return I.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.type,n=e.mediaContext,a=e.media,r.prev=1,r.next=4,Se(a.id,"rotate_left");case 4:return c=r.sent,r.next=7,Object(_.b)({type:t,status:"success",mediaContext:n,media:c.media});case 7:r.next=13;break;case 9:return r.prev=9,r.t0=r.catch(1),r.next=13,Object(_.b)({type:t,status:"error",mediaContext:n,error:r.t0});case 13:case"end":return r.stop()}}),ge,null,[[1,9]])}function Pe(e){var t,n,a,c;return I.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.type,n=e.mediaContext,a=e.media,r.prev=1,r.next=4,Se(a.id,"rotate_right");case 4:return c=r.sent,r.next=7,Object(_.b)({type:t,status:"success",mediaContext:n,media:c.media});case 7:r.next=13;break;case 9:return r.prev=9,r.t0=r.catch(1),r.next=13,Object(_.b)({type:t,status:"error",mediaContext:n,error:r.t0});case 13:case"end":return r.stop()}}),we,null,[[1,9]])}function Le(){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(_.d)((function(e){var t=e.type,n=e.status;return"upload-asset"===t&&"pending"===n}),_e);case 2:return e.next=4,Object(_.d)((function(e){var t=e.type,n=e.status;return"rotate-image-left"===t&&"pending"===n}),De);case 4:return e.next=6,Object(_.d)((function(e){var t=e.type,n=e.status;return"rotate-image-right"===t&&"pending"===n}),Pe);case 6:case"end":return e.stop()}}),ye)}var Me=I.a.mark(Fe);function Fe(){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(_.a)([R(),ue(),je(),Le()]);case 2:case"end":return e.stop()}}),Me)}var Te=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({shouldHotReload:!1}):v.d,Re=Object(E.a)(),Ae=Object(h.routerMiddleware)(b);var Be=n(89),Ve=n(90),ze=n(91),We=n(92),Ye=Object(m.b)(null,(function(e){return{dispatch:e}}))((function(e){var t=e.dispatch,n=e.className,a=e.children;return c.a.createElement(Be.a,{className:n},c.a.createElement(Ve.a,null,c.a.createElement(ze.a,null,c.a.createElement(We.a,{onClick:function(){return t(Object(h.replace)("/"))}},"Karteikarten")),a))})),Xe=n(53),Je=n.n(Xe),Ke=Object(m.b)(null,(function(e){return{dispatch:e}}))((function(e){var t=e.dispatch;return c.a.createElement("div",{className:"container-fluid"},c.a.createElement("div",{className:"row justify-content-center"},c.a.createElement("div",{className:"col-7 karteikarten-login"},c.a.createElement("h1",null,"Login"),c.a.createElement(Je.a,{buttonText:"Login with Google",approvalPrompt:"force",clientId:"166406152582-opsa1qh4maknpa82s4vddn46psutaeth.apps.googleusercontent.com",scope:"profile email",onSuccess:function(e){return t({type:"login",status:"pending",authData:e})},onFailure:function(e){return t({type:"login",status:"error",authData:e})}}))))})),Ue=n(107),qe=n(95),Ge=n(96),He=n(94),$e=n(97),Qe=n(98),Ze=n(54),et=n(55),tt=n(93),nt=n(24),at=n(23),ct=function(e){var t=e.stats;return t.corrects_ratio>=.625?c.a.createElement(at.a,{icon:nt.d,className:"text-success",title:"Correct ratio ".concat(100*t.corrects_ratio,"%")}):c.a.createElement(at.a,{icon:nt.c,className:"text-warning",title:"Correct ratio ".concat(100*t.corrects_ratio,"%")})},rt=function(e){var t=e.dispatch,n=e.collections,a=e.className;return c.a.createElement(Ze.a,{className:a||"",flush:!0},n.map((function(e){return c.a.createElement(et.a,{className:"pl-0 pr-0"},c.a.createElement("div",{className:"float-right"},e.stats&&c.a.createElement(ct,{stats:e.stats}),c.a.createElement(tt.a,null,c.a.createElement(He.a,{size:"sm",color:"link",onClick:function(){return t(Object(h.push)("/collections/".concat(e.id)))}},"View"),c.a.createElement(He.a,{size:"sm",color:"link",onClick:function(){return t(Object(h.push)("/review/".concat(e.id)))}},"Review"))),c.a.createElement(c.a.Fragment,null,c.a.createElement(at.a,{icon:nt.a})," ",e.title))})))};rt.defaultProps={collections:[]};var ot=Object(m.b)(null,(function(e){return{dispatch:e}}))(rt),lt=function(e){var t=e.dispatch,n=e.isLoading,r=e.collections;return Object(a.useEffect)((function(){t({type:"fetch-recent-collections",status:"pending"})}),[]),n?c.a.createElement("div",{className:"text-center"},"Loading..."):r.length?c.a.createElement($e.a,null,c.a.createElement("h1",{className:"page-title"},"Dashboard"),c.a.createElement(Ge.a,null,c.a.createElement(Qe.a,{widths:[12]},c.a.createElement("h2",null,"Recent collections"),c.a.createElement(ot,{collections:r})))):c.a.createElement(Ue.a,{isOpen:!0},c.a.createElement(qe.a,null,c.a.createElement("p",{className:"display-4 text-center"},"Welcome to Karteikarten!"),c.a.createElement("p",null,"Let's create your first collection!"),c.a.createElement(Ge.a,{className:"justify-content-center"},c.a.createElement(He.a,{color:"primary",onClick:function(){return t(Object(h.replace)("/create-collection"))}},"Let's go!"))))};lt.defaultProps={isLoading:!0,collections:[]};var st=Object(m.b)((function(e){return{collections:e.coreData.collections,isLoading:e.network.busy}}),(function(e){return{dispatch:e}}))(lt),it=n(17),ut=n(99),dt=n(100),mt=Object(m.b)((function(e){return{newCollection:e.coreData.newCollection||void 0}}),(function(e){return{dispatch:e}}))((function(e){var t=e.dispatch,n=e.newCollection,r=void 0===n?{id:null,title:""}:n,o=Object(p.e)(),l=Object(a.useState)(r),s=Object(it.a)(l,2),i=s[0],u=s[1],d=Object(a.useState)({id:null,isPristine:!0,front:"",back:""}),m=Object(it.a)(d,2),f=m[0],b=m[1];Object(a.useEffect)((function(){u(r)}),[r.id]),Object(a.useEffect)((function(){b({id:null,isPristine:!0,front:"",back:""})}),[r.id,r.items]);var v=o&&o.step||"step-0";return c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-12"},c.a.createElement("h1",{className:"page-title"},"Create Your Collection"),"step-0"===v&&c.a.createElement(Ge.a,null,c.a.createElement(ut.a,{className:"col-form-label text-right col-3"},"Title"),c.a.createElement(dt.a,{className:"col-7 font-weight-bold",value:i.title,placeholder:"No name",onChange:function(e){var t=e.target.value;u(Object(x.a)({},r,{title:t}))}}),c.a.createElement("div",{className:"col-2"},c.a.createElement(He.a,{color:"primary",onClick:function(){return t({type:"create-collection",status:"pending",collection:i})}},"Create"))),"step-1"===v&&c.a.createElement(c.a.Fragment,null,c.a.createElement(Ge.a,null,c.a.createElement("ul",{className:"list-inline"},r.items&&r.items.map((function(e){return c.a.createElement("li",{className:"list-inline-item"},e.front)})))),c.a.createElement(Ge.a,null,c.a.createElement(ut.a,{className:"col-form-label text-right col-3"},"Front"),c.a.createElement(dt.a,{className:"col-7 font-weight-bold",value:f.front,placeholder:"Empty",onChange:function(e){var t=e.target.value;b(Object(x.a)({},f,{isPristine:!1,front:t}))}})),c.a.createElement(Ge.a,{className:"pt-2"},c.a.createElement(ut.a,{className:"col-form-label text-right col-3"},"Back"),c.a.createElement(dt.a,{className:"col-7 font-weight-bold",value:f.back,placeholder:"Empty",onChange:function(e){var t=e.target.value;b(Object(x.a)({},f,{back:t}))}})),c.a.createElement(Ge.a,{className:"justify-content-center pt-3"},c.a.createElement(He.a,{color:"primary",onClick:function(){return t({type:"create-card-in-new-collection",status:"pending",collection:r,card:f})}},"Add to Collection"),c.a.createElement(He.a,{color:"default",onClick:function(){return t(Object(h.replace)("/collections"))}},"Finish"))))))})),pt=Object(m.b)((function(e){return{collections:e.coreData.collections||[]}}),(function(e){return{dispatch:e}}))((function(e){var t=e.dispatch,n=e.collections;return Object(a.useEffect)((function(){t({type:"fetch-collections",status:"pending"})}),[]),c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-12"},c.a.createElement("h1",{className:"page-title"},"Your Collections"),c.a.createElement(Ge.a,{className:"justify-content-end pr-3"},c.a.createElement(He.a,{color:"link",onClick:function(){return t(Object(h.push)("/create-collection"))}},"Create Collection")),c.a.createElement(ot,{collections:n}))))})),ft=n(105),bt=n(102),vt=n(103),Et=n(101),ht=n(104),xt=n(58),Ot=function(e){var t=e.dispatch,n=e.media,r=e.mediaContext,o=e.card,l=e.onSave,s=e.onClose,i=Object(a.useState)(o),u=Object(it.a)(i,2),d=u[0],m=u[1],p=Object(a.useCallback)((function(e){var n=(e||[]).filter((function(){return!0}));n.length&&t({type:"upload-asset",status:"pending",mediaContext:r,file:n[0]})}),[]),f=Object(a.useCallback)((function(e){e.stopPropagation();var a=n||Object(x.a)({id:o.media_id},o.media);t({type:"rotate-image-left",status:"pending",mediaContext:r,media:a})})),b=Object(a.useCallback)((function(e){e.stopPropagation();var a=n||Object(x.a)({id:o.media_id},o.media);t({type:"rotate-image-right",status:"pending",mediaContext:r,media:a})})),v=Object(xt.a)({onDrop:p}),E=v.getRootProps,h=v.getInputProps,O=v.isDragActive;return Object(a.useEffect)((function(){m(Object(x.a)({},o,{isPristine:!0}))}),[o]),c.a.createElement(Ue.a,{isOpen:!0},c.a.createElement(Et.a,null,"Card"),c.a.createElement(qe.a,null,c.a.createElement(bt.a,null,c.a.createElement(vt.a,{row:!0,inline:!0},c.a.createElement(ut.a,{className:"col-form-label text-right col-3"},"Front"),c.a.createElement("div",{className:"col-9"},c.a.createElement(dt.a,{className:"font-weight-bold",value:d.front,placeholder:"Empty",onChange:function(e){var t=e.target.value;m(Object(x.a)({},d,{isPristine:!1,front:t}))}}))),c.a.createElement(vt.a,{row:!0,inline:!0},c.a.createElement(ut.a,{className:"col-form-label text-right col-3"},"Back"),c.a.createElement("div",{className:"col-9"},c.a.createElement(dt.a,{className:"font-weight-bold",value:d.back,placeholder:"Empty",onChange:function(e){var t=e.target.value;m(Object(x.a)({},d,{isPristine:!1,back:t}))}}))),c.a.createElement("div",Object.assign({},E(),{className:"border border-secondary bg-light text-center pt-4 pb-4"}),c.a.createElement("input",h()),O?c.a.createElement("p",{className:"m-0"},"Drop the files here ..."):c.a.createElement("p",{className:"m-0"},"Drop in a picture or sound file"),o&&o.media&&o.media.url?c.a.createElement(Ge.a,{className:"justify-content-center card-media"},c.a.createElement("img",{className:"card-media-image",src:"".concat(o.media.url,"?t=").concat(Date.now())}),c.a.createElement("div",{className:"card-media-controls"},c.a.createElement(tt.a,null,c.a.createElement(He.a,{color:"light",onClick:f},c.a.createElement(at.a,{icon:nt.e})),c.a.createElement(He.a,{color:"light",onClick:b},c.a.createElement(at.a,{icon:nt.b}))))):n?c.a.createElement(Ge.a,{className:"justify-content-center card-media"},c.a.createElement("img",{className:"card-media-image",src:"".concat(n.url,"?t=").concat(Date.now())}),c.a.createElement("div",{className:"card-media-controls"},c.a.createElement(tt.a,null,c.a.createElement(He.a,{color:"light",onClick:f},c.a.createElement(at.a,{icon:nt.e})),c.a.createElement(He.a,{color:"light",onClick:b},c.a.createElement(at.a,{icon:nt.b}))))):null))),c.a.createElement(ht.a,null,c.a.createElement(He.a,{color:"default",onClick:function(){return s()}},"Cancel"),c.a.createElement(He.a,{color:"primary",onClick:function(){n&&d.media_id!==n.id?l(Object(x.a)({},d,{media_id:n.id})):l(d)}},"Save")))};Ot.defaultProps={card:{isNew:!0}};var jt=Object(m.b)((function(e,t){var n=t.mediaContext;return n in e.media?{media:e.media[n]}:{media:null}}),(function(e){return{dispatch:e}}))(Ot),kt=Object(m.b)(null,(function(e){return{dispatch:e}}))((function(e){e.dispatch;var t=e.card,n=e.onAccept,r=e.onClose,o=Object(a.useState)(null),l=Object(it.a)(o,2),s=l[0],i=l[1],u=Object(a.useState)(null),d=Object(it.a)(u,2),m=d[0],p=d[1],f=Object(a.useCallback)((function(){return D("/collections")}),[]),b=Object(a.useState)(null),v=Object(it.a)(b,2),E=v[0],h=v[1];return c.a.createElement(Ue.a,{isOpen:!0},c.a.createElement(Et.a,null,c.a.createElement("span",{className:"font-italic"},t.front)),c.a.createElement(qe.a,null,c.a.createElement(bt.a,null,c.a.createElement(vt.a,{row:!0,inline:!0},c.a.createElement(ut.a,{className:"col-3 col-form-label text-right"},"Action"),c.a.createElement("div",{className:"form-check-inline"},c.a.createElement("label",{className:"form-check-label"},c.a.createElement(dt.a,{type:"radio",className:"form-check-input",name:"action",onClick:function(){i("MOVE"),f().then((function(e){var t=e.collections;return p(t)}))}})," Move")),c.a.createElement("div",{className:"form-check-inline"},c.a.createElement("label",{className:"form-check-label"},c.a.createElement(dt.a,{type:"radio",className:"form-check-input",name:"action",onClick:function(){i("COPY"),f().then((function(e){var t=e.collections;return p(t)}))}})," Copy")),c.a.createElement("div",{className:"form-check-inline"},c.a.createElement("label",{className:"form-check-label"},c.a.createElement(dt.a,{type:"radio",className:"form-check-input",name:"action",onClick:function(){i("CLONE"),p(null)}})," Clone"))),m&&c.a.createElement(vt.a,null,c.a.createElement(ut.a,null,"Move/Copy to..."),c.a.createElement("select",{className:"form-control",onChange:function(e){var t=e.target.value;return h(t)}},m.map((function(e){return c.a.createElement("option",{value:e.id},e.title)})))))),c.a.createElement(ht.a,null,c.a.createElement(He.a,{color:"default",onClick:r},"Cancel"),c.a.createElement(He.a,{color:"primary",onClick:function(){return n({action:s,cardId:t.id,collectionId:E})}},"OK")))})),gt=Object(m.b)((function(e){return{collection:e.coreData.editCollection||{id:null}}}),(function(e){return{dispatch:e}}))((function(e){var t=e.dispatch,n=e.collection,r=Object(p.e)().collectionId,o=Object(a.useState)({}),l=Object(it.a)(o,2),s=l[0],i=l[1],u=Object(a.useState)(!1),d=Object(it.a)(u,2),m=d[0],f=d[1],b=Object(a.useState)(!1),v=Object(it.a)(b,2),E=v[0],O=v[1],j=Object(a.useState)(null),k=Object(it.a)(j,2),g=k[0],w=k[1],y=Object(a.useState)(!1),C=Object(it.a)(y,2),N=C[0],I=C[1];return Object(a.useEffect)((function(){t({type:"view-collection",status:"pending",collectionId:r})}),[]),Object(a.useEffect)((function(){i(n),f(!1),O(!1),I(!1)}),[n]),s&&s.items?c.a.createElement(c.a.Fragment,null,c.a.createElement(Be.a,null,c.a.createElement(Ve.a,null,c.a.createElement(ze.a,null,c.a.createElement(ft.a,{href:"javascript: void 0",onClick:function(){return t(Object(h.replace)("/collections"))}},"\u2039 Collections")))),c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-12"},c.a.createElement("h1",{className:"page-title"},"Your Collection"),c.a.createElement(bt.a,null,c.a.createElement(vt.a,{row:!0,inline:!0},c.a.createElement(ut.a,{className:"col-form-label text-right col-3"},"Title"),c.a.createElement("div",{className:"col-9"},c.a.createElement(dt.a,{className:"font-weight-bold",value:s.title,placeholder:"No name",onChange:function(e){var t=e.target.value;i(Object(x.a)({},s,{title:t}))},onBlur:function(){t({type:"update-collection",status:"pending",collection:s})}}))),c.a.createElement(vt.a,{row:!0,inline:!0},c.a.createElement(ut.a,{className:"col-form-label text-right col-3"},"Cards"),c.a.createElement("div",{className:"col-9"},c.a.createElement(Ze.a,null,(s.items||[]).map((function(e){return c.a.createElement(et.a,{key:e.id,className:"pt-1 pb-1 pr-0"},c.a.createElement(He.a,{className:"float-right",size:"sm",color:"default",onClick:function(){w(e),I(!0)}},"\u2026"),c.a.createElement(He.a,{className:"float-right",size:"sm",color:"link",onClick:function(){w(e),O(!0)}},"View"),e.front)})))))),c.a.createElement(Ge.a,{className:"pt-3 justify-content-center"},c.a.createElement(He.a,{color:"primary",onClick:function(){return f(!0)}},"Add new Card")))),m&&c.a.createElement(jt,{mediaContext:"card",onClose:function(){return f(!1)},onSave:function(e){t({type:"create-card-in-collection",status:"pending",collection:s,card:e})}}),E&&g&&c.a.createElement(jt,{mediaContext:"card",card:g,onClose:function(){return O(!1)},onSave:function(e){t({type:"update-card-in-collection",status:"pending",collection:s,card:e})}}),N&&g&&c.a.createElement(kt,{card:g,onClose:function(){return I(!1)},onAccept:function(e){var a=e.action,c=e.cardId,r=e.collectionId;"MOVE"===a?t({type:"move-card",status:"pending",cardId:c,fromCollectionId:n.id,toCollectionId:r}):"COPY"===a?t({type:"copy-card",status:"pending",cardId:c,toCollectionId:r}):"CLONE"===a&&t({type:"clone-card",status:"pending",cardId:c,toCollectionId:n.id})}}))):c.a.createElement("div",{className:"text-center"},"Loading...")})),wt=n(106),yt=Object(m.b)((function(e){return{collection:e.review.reviewCollection||{items:[]},cardIndex:e.review.cardIndex||0,lastScorecard:e.review.scorecards.length?e.review.scorecards[e.review.scorecards.length-1]:null,complete:e.review.complete,scorecards:e.review.scorecards}}),(function(e){return{dispatch:e}}))((function(e){var t=e.dispatch,n=e.collection,r=e.cardIndex,o=void 0===r?0:r,l=e.lastScorecard,s=void 0===l?null:l,i=e.scorecards,u=void 0===i?null:i,d=e.complete,m=void 0!==d&&d,f=Object(p.e)().collectionId,b=Object(a.useState)({}),v=Object(it.a)(b,2),E=v[0],x=v[1];return Object(a.useEffect)((function(){f&&t({type:"review-collection",status:"pending",collectionId:f})}),[f]),Object(a.useEffect)((function(){n&&n.items&&x(n.items[0])}),[n]),Object(a.useEffect)((function(){x(n.items[o])}),[n,o]),n&&E&&E.choices?c.a.createElement(c.a.Fragment,null,c.a.createElement(Be.a,null,c.a.createElement(Ve.a,null,c.a.createElement(ze.a,null,c.a.createElement(ft.a,{href:"javascript: void 0",onClick:function(){return t(Object(h.replace)("/collections"))}},"\u2039 Collections")))),c.a.createElement("div",{className:"container"},c.a.createElement(Ge.a,{className:"justify-content-center"},c.a.createElement("div",{className:"col-12 col-sm-10"},c.a.createElement("h1",{className:"page-title"},"Review"),s&&!m&&c.a.createElement(Ge.a,null,c.a.createElement(ut.a,{className:"col-4"},"Last card"),c.a.createElement("div",{className:"col-4"},s.card.front),c.a.createElement("div",{className:"col-4"},s.correct?c.a.createElement("span",null,"Correct!"):c.a.createElement("span",null,"Wrong!!!"))),!m&&c.a.createElement("div",{className:"w-100 p-3 p-sm-5 karteikarten-card"},c.a.createElement("h3",{className:"display-4 text-center font-weight-bold ".concat(!(E.media&&E.media.url)&&"mb-5")},E.front),E.media&&E.media.url&&c.a.createElement(Ge.a,{className:"justify-content-center mb-5"},c.a.createElement("img",{src:E.media.url})),c.a.createElement(Ge.a,{key:E.id},E.choices.map((function(e){return c.a.createElement(He.a,{onClick:function(){return t({type:"answer-match",status:"pending",answer:{card:E,choice:e}})},key:"".concat(E.id,"-").concat(e.id),color:"link",className:"w-50"},e.back)})))),m&&u&&c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"w-100 p-3 p-sm-5 karteikarten-card"},c.a.createElement("h2",null,n.title),c.a.createElement(wt.a,{responsive:!0},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null),c.a.createElement("th",null,"Correct"),c.a.createElement("th",null,"Wrong"),c.a.createElement("th",null,"Skipped"))),c.a.createElement("tbody",null,u.map((function(e){var t=e.card,n=Object(A.a)(e,["card"]);return c.a.createElement("tr",null,c.a.createElement("td",null,t.front),c.a.createElement("td",null,n.corrects),c.a.createElement("td",null,n.wrongs),c.a.createElement("td",null,n.skippeds))}))))),c.a.createElement("div",{className:"w-100 text-center"},c.a.createElement(He.a,{color:"link",onClick:function(){return t(Object(h.replace)("/review/".concat(n.id)))}},"Retry the collection"))))))):c.a.createElement("div",{className:"text-center"},"Loading...")})),Ct=function(){var e=Object(v.e)(C,Te(Object(v.a)(Re,Ae)));return Re.run(Fe),e}(),Nt=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return c.a.createElement(m.a,{store:Ct},c.a.createElement(p.c,{history:b},c.a.createElement(c.a.Fragment,null,c.a.createElement(Ye,{className:"karteikarten-topnav"}),c.a.createElement(p.d,null,c.a.createElement(p.b,{path:"/",exact:!0,component:st}),c.a.createElement(p.b,{path:"/login",exact:!0,component:Ke}),c.a.createElement(p.b,{path:"/create-collection",exact:!0,component:mt}),c.a.createElement(p.b,{path:"/create-collection/:step",exact:!0,component:mt}),c.a.createElement(p.b,{path:"/collections",exact:!0,component:pt}),c.a.createElement(p.b,{path:"/collections/:collectionId",exact:!0,component:gt}),c.a.createElement(p.b,{path:"/review/result",exact:!0,component:yt}),c.a.createElement(p.b,{path:"/review/:collectionId",exact:!0,component:yt}),c.a.createElement(p.a,{to:"/"})))))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(Nt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[62,1,2]]]);
//# sourceMappingURL=main.3395df3f.chunk.js.map