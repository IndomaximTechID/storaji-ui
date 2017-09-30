declare var global: any;
var Reflect = global['Reflect'];

import { Component } from '@angular/core';


export function StorajiComponent(annotation: any) {
    return function (target: Function) {
        var parentTarget = Object.getPrototypeOf(target.prototype).constructor;
        var parentAnnotations = Reflect.getMetadata('annotations', parentTarget);

        var parentAnnotation = parentAnnotations[0];
        Object.keys(parentAnnotation).forEach(key => {
            if (parentAnnotation[key] !== undefined && parentAnnotation[key] !== null) {
                // verify is annotation typeof function
                if(typeof annotation[key] === 'function'){
                    annotation[key] = annotation[key].call(this, parentAnnotation[key]);
                }
                else if(!(annotation[key] !== undefined && annotation[key] !== null)){
                    annotation[key] = parentAnnotation[key];
                }
            }
        });

        var metadata = new Component(annotation);

        Reflect.defineMetadata('annotations', [ metadata ], target);
    }
}
