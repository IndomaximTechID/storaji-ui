import {NgModule,Component,ViewChild,ElementRef,AfterViewInit,AfterContentInit,DoCheck,AfterViewChecked,Input,Output,EventEmitter,ContentChildren,QueryList,TemplateRef,Renderer2,forwardRef,ChangeDetectorRef,IterableDiffers} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {ButtonModule} from 'primeng/components/button/button';
import {SharedModule,PrimeTemplate} from 'primeng/components/common/shared';
import {DomHandler} from 'primeng/components/dom/domhandler';
import {ObjectUtils} from 'primeng/components/utils/objectutils';
import {AUTOCOMPLETE_VALUE_ACCESSOR, AutoComplete} from 'primeng/components/autocomplete/autocomplete';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import { StorajiComponent } from '../decorators/storaji-component';

@StorajiComponent({
    selector:'storaji-autocomplete',
    template: `
        <span [ngClass]="{'ui-autocomplete ui-widget':true,'ui-autocomplete-dd':dropdown,'ui-autocomplete-multiple':multiple}" [ngStyle]="style" [class]="styleClass">
            <input *ngIf="!multiple" #in [attr.type]="type" [attr.id]="inputId" [ngStyle]="inputStyle" [class]="inputStyleClass" autocomplete="off" [attr.required]="required" [value]="inputFieldValue"
            (click)="onInputClick($event)" (input)="onInput($event)" (keydown)="onKeydown($event)" (keyup)="onKeyup($event)" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)"
            [attr.placeholder]="placeholder" [attr.size]="size" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [readonly]="readonly" [disabled]="disabled"
            ><ul *ngIf="multiple" #multiContainer class="ui-autocomplete-multiple-container ui-widget ui-inputtext ui-state-default ui-corner-all" [ngClass]="{'ui-state-disabled':disabled,'ui-state-focus':focus}" (click)="multiIn.focus()">
                <li #token *ngFor="let val of value" class="ui-autocomplete-token ui-state-highlight ui-corner-all">
                    <span class="ui-autocomplete-token-icon fa fa-fw fa-close" (click)="removeItem(token)" *ngIf="!disabled"></span>
                    <span *ngIf="!selectedItemTemplate" class="ui-autocomplete-token-label">{{field ? val[field] : val}}</span>
                    <ng-template *ngIf="selectedItemTemplate" [pTemplateWrapper]="selectedItemTemplate" [item]="val"></ng-template>
                </li>
                <li class="ui-autocomplete-input-token">
                    <input #multiIn [attr.type]="type" [attr.id]="inputId" [disabled]="disabled" [attr.placeholder]="(value&&value.length ? null : placeholder)" [attr.tabindex]="tabindex" (input)="onInput($event)"  (click)="onInputClick($event)"
                            (keydown)="onKeydown($event)" (keyup)="onKeyup($event)" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" autocomplete="off" [ngStyle]="inputStyle" [class]="inputStyleClass">
                </li>
            </ul
            ><i *ngIf="loading" class="ui-autocomplete-loader fa fa-circle-o-notch fa-spin fa-fw"></i>
            <button type="button" class="" [disabled]="disabled" [ngStyle]="buttonStyle" [class]="buttonStyleClass"
                (click)="handleDropdownClick($event)" *ngIf="dropdown"><span uk-icon="icon: chevron-down;ratio: 0.8;"></span></button>
            <div #panel class="ui-autocomplete-panel ui-widget-content ui-corner-all ui-shadow" [style.display]="panelVisible ? 'block' : 'none'" [style.width]="appendTo ? 'auto' : '100%'" [style.max-height]="scrollHeight">
                <ul class="ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset" *ngIf="panelVisible">
                    <li *ngFor="let option of suggestions; let idx = index" [ngClass]="{'ui-autocomplete-list-item ui-corner-all':true,'ui-state-highlight':(highlightOption==option)}"
                        (mouseenter)="highlightOption=option" (mouseleave)="highlightOption=null" (click)="selectItem(option)">
                        <span *ngIf="!itemTemplate">{{field ? option[field] : option}}</span>
                        <ng-template *ngIf="itemTemplate" [pTemplateWrapper]="itemTemplate" [item]="option" [index]="idx"></ng-template>
                    </li>
                    <li *ngIf="noResults && emptyMessage" class="ui-autocomplete-list-item ui-corner-all">{{emptyMessage}}</li>
                </ul>
            </div>
        </span>
    `,
    providers:[
               ObjectUtils,
               AUTOCOMPLETE_VALUE_ACCESSOR,
               {provide:AutoComplete, useExisting:StorajiAutocomplete}
    ],
})
export class StorajiAutocomplete extends AutoComplete {
  @Input() styleClass: string = 'uk-autocomplete';
  @Input() inputStyle: any = {'max-width': '81%', 'width': '100%'};
  @Input() inputStyleClass: string = 'uk-input';
  @Input() buttonStyle: any = {'max-width': '17.5%', 'width': '100%'};
  @Input() buttonStyleClass: string = 'uk-button uk-button-default uk-padding-small uk-padding-remove-top uk-padding-remove-bottom';

  constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, public objectUtils: ObjectUtils, public cd: ChangeDetectorRef, public differs: IterableDiffers) {

    super(el, domHandler, renderer, objectUtils, cd, differs);

  }

}

@NgModule({
    imports: [CommonModule,InputTextModule,ButtonModule,SharedModule],
    exports: [StorajiAutocomplete,SharedModule],
    declarations: [StorajiAutocomplete,AutoComplete],
    providers: [DomHandler]
})
export class StorajiAutocompleteModule { }
