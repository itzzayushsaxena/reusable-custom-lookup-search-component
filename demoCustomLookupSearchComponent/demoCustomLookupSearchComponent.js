/**
 * @author            : Ayush Saxena
 * @last modified on  : 12-01-2022
 * @last modified by  : Ayush Saxena 
**/
import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import ACCOUNT_FIELD from '@salesforce/schema/Contact.AccountId'

export default class DemoCustomLookupSearchComponent extends LightningElement {
    firstname;
    lastname;
    accountId;
    contactId;

    handleFirstNameChange(event){
        this.firstname = event.target.value;
    }

    handleLastNameChange(event){
        this.lastname = event.target.value;
    }

    handlelookupchange(event){        
        this.accountId = event.detail.data.id;
    }

    createContact() {
        const fields = {};
        fields[FIRSTNAME_FIELD.fieldApiName] = this.firstname;
        fields[LASTNAME_FIELD.fieldApiName] = this.lastname;
        fields[ACCOUNT_FIELD.fieldApiName] = this.accountId;

        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(contact => {
                this.contactId = contact.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact created successfully!',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
        
        this.firstname = '';
        this.lastname = '';
        this.accountId = '';
    }
}