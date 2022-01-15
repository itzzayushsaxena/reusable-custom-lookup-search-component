/**
 * @author            : Ayush Saxena
 * @last modified on  : 12-01-2022
 * @last modified by  : Ayush Saxena 
**/
import { LightningElement,api,wire } from 'lwc';
import lookUpSearch from '@salesforce/apex/CustomLookupSearchController.lookUpSearch';

export default class CustomLookupSearchComponent extends LightningElement {
    @api objName;
    @api iconName;
    @api searchPlaceholder='Search';
    isValSelect;
    selectedValue;
    searchValue;
    optionsToDisplay;
    blurTimeout;
    Class = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';

    @wire(lookUpSearch, {searchValue : '$searchValue', objectLabel : '$objName'})
    wiredRecords({ error, data }) {
        if (data) {
            this.error = undefined;
            this.optionsToDisplay = data;
        } else if (error) {
            this.error = error;
            this.optionsToDisplay = undefined;
        }
    }

    blurtime(){
        this.blurTimeout = setTimeout(() =>  {this.Class = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus'}, 400);
    }

    optionsClickHandler(event){
        let Id = event.currentTarget.dataset.id;
        let Name = event.currentTarget.dataset.name;
        const selectedEvent = new CustomEvent('lookup', { 
            detail: {
                data : {
                    id          : Id,
                    name        : Name,
                }
            }
        });
        this.dispatchEvent(selectedEvent);
        this.selectedValue = Name;
        this.isValSelect = true;   
        if(this.blurTimeout) {
            clearTimeout(this.blurTimeout);
        }     
        this.Class = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    }

    handleOnChange(event){
        this.searchValue = event.target.value;
    }

    handleOnClick(){
        this.searchValue = '';
        this.Class = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }

    handleRemove(){
        this.isValSelect = false;
    }
}