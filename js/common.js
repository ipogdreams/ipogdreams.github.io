/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var log = function ( msg, type ) {  
    var t;
    
    if( type ) t = (type.toString()).toUpperCase();
    
    switch (t) {
        case "C": // Controller
            console.log('[Ctrl]   : ' + msg.toString() );
            break;
        case "F": // Function
            console.log('[fn]     : ' + msg );
            break;
        case "N": // 
            console.log('[Nfn]    : ' + msg );
            break;
        case "H": // Highlight with [+] plus
            console.log( '[+]      : '+ msg );
            break;
        case "D": // Double Line Meddage
            console.log('==============================================================');
            console.log( msg );
            console.log('==============================================================');
            break;
        case "HR": // HRule
            console.log('--------------------------------------------------------------');
            break;
        default: // Default Log
            console.log( msg );
            break;
    }
};


