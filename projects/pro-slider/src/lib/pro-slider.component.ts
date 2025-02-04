import { Component, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CalcType, DimmPipe } from 'pro-dimm-slider';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'app-pro-slider',
    templateUrl: './pro-slider.component.html',
    styleUrls: ['./pro-slider.component.css'],
    standalone: false
})
export class ProSliderComponent implements OnChanges {

  @Input() cbTag!: String;
  @Input() sliderIcon!: IconDefinition;
  @Input() sliderLabel!: String;
  @Input() value!: number;
  @Input() min!: number;
  @Input() max!: number;
  @Input() step!: number;
  @Input() cbValue!: Boolean;
  @Input() cbDisabled = false;
  @Input() defaultVal!: number;
  @Input() id!: String;
  @Input() sliderDisabled = false;
  @Input() sliderVisable = true;
  @Input() calcType: CalcType = CalcType.Arc;
  @Input() symbol: String = '%';
  @Output() valueChange = new EventEmitter<number>();
  @Output() cbChange = new EventEmitter<Boolean>();

  constructor(private calcPipe: DimmPipe) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.defaultVal !== undefined ) {
      this.sliderDisabled = this.value === this.defaultVal;
      this.cbValue = !this.sliderDisabled;
      this.cbChange.emit(this.cbValue);
    } else {
      this.sliderDisabled = !this.cbValue;
    }
  }

  setDimm(newDimm: number): void {
    this.value = this.calcPipe.transformBack(newDimm, this.calcType, this.min, this.max);
    if (this.defaultVal !== undefined) {
      if (this.value === this.defaultVal) {
        this.cbValue = false;
        this.sliderDisabled = true;
        this.cbChange.emit(this.cbValue);
      }
    }
    this.valueChange.emit(this.value);
  }

  toggleActive(event: any): void {
    this.cbValue = event.target.checked;
    this.sliderDisabled = !this.cbValue;
    if (this.defaultVal !== undefined) {
      if (!this.cbValue) {
        this.value = this.defaultVal;
      }
      this.valueChange.emit(this.value);
    }
    this.cbChange.emit(this.cbValue);
  }

  getEventTargetsValueAsNumber(e: Event): number {
    let eventTarget = e.target;
    if (eventTarget === null || eventTarget === undefined) return this.value;
    return (eventTarget as HTMLInputElement).valueAsNumber;
  }

}
