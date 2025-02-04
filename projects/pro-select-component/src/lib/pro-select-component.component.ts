import { Component, Input, SimpleChanges, Output, EventEmitter, OnChanges, ViewEncapsulation } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

@Component({
    selector: 'app-pro-select',
    templateUrl: './pro-select-component.component.html',
    styleUrls: [
        './pro-select-component.component.css'
    ],
    standalone: false
})
export class ProSelectComponentComponent implements OnChanges {

  @Input() cbTag!: String;
  @Input() selectIcon!: IconDefinition;
  @Input() selectLabel!: String;
  @Input() selectItems!: any[];
  @Input() selection: any;
  @Input() cbValue!: Boolean;
  @Input() defaultSelection: any;
  @Input() id!: String;
  @Input() selectDisabled = false;
  @Input() flags!: number;
  @Input() flagMask!: number[];
  @Output() flagsChange = new EventEmitter<number>();
  @Output() selectionChange = new EventEmitter<any>();
  @Output() cbChange = new EventEmitter<Boolean>();
  
  rangeValue!: number;

  constructor() { 
    console.log('app-pro-select component loaded.');
  }

  ngOnChanges() {
    if (this.flags !== undefined && this.flagMask !== undefined) {
      this.selection = this.selectItems[0];
      for (let index = this.selectItems.length - 1; index > 0; index--) {
        // tslint:disable-next-line: no-bitwise
        if ((this.flags & this.flagMask[index]) === this.flagMask[index]) {
          this.selection = this.selectItems[index];
          break;
        }
      }
    }
    this.cbValue = this.selection !== this.defaultSelection;
    this.selectDisabled = !this.cbValue;
    // console.log('Selection: ' + this.selection + ' Flag: ' + this.flags);
  }

  selectionChanged(event: any): void {
    this.selection = event;
    this.cbValue = this.selection !== this.defaultSelection;
    this.selectDisabled = !this.cbValue;
    const selectionIndex = this.selectItems.indexOf(this.selection);
    if (this.flags !== undefined && this.flagMask !== undefined) {
      for (let index = this.selectItems.length - 1; index > 0; index--) {
        // tslint:disable-next-line: no-bitwise
        this.flags = this.flags & ~this.flagMask[index];
      }
      // tslint:disable-next-line: no-bitwise
      this.flags = this.flags | this.flagMask[selectionIndex];
      // console.log('Flag: ' + this.flags);
      this.flagsChange.emit(this.flags);
    }
    this.selectionChange.emit(this.selection);
  }

  toggleActive(event: any): void {
    this.cbValue = event.target.checked;
    this.selectDisabled = !this.cbValue;
    if (this.defaultSelection !== undefined) {
      if (!this.cbValue) {
        this.selection = this.defaultSelection;
      }
      this.selectionChange.emit(this.selection);
    }
    this.cbChange.emit(this.cbValue);
  }

}
