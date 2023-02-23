import { wire, api, LightningElement, track } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import STAGE from '@salesforce/schema/Opportunity.StageName';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import Opportunity_Object from '@salesforce/schema/Opportunity';
import createOpportunity from '@salesforce/apex/OpportunityHandler.createOpportunity'


export default class CreateOppFromAccPage extends LightningElement {
    @track oppName;
    @track oppCloseDate;
    @track oppStage;
    @track oppAmount;
    @api responseMsg;

    @wire(getObjectInfo,
        {
            objectApiName: Opportunity_Object
        }
    )
    oppRecords;

    @wire(getPicklistValues,
        {
            recordTypeId: '$oppRecords.data.defaultRecordTypeId',
            fieldApiName: STAGE
        }
    )
    stageNameValues;

    handleOppName(event){
        this.oppName = event.detail.value;
    }

    handleOppDate(event){
        this,this.oppCloseDate = event.detail.value;
    }

    handleOppStage(event){
        this.oppStage = event.detail.value;
    }

    handleOppAmount(event){
        this.oppAmount = event.detail.value;
    }

    handleSubmit(event){
        console.log('inside submit');
        let dataSet = {};
        dataSet.name = this.oppName;
        dataSet.cDate = this.oppCloseDate;
        dataSet.stage = this.oppStage;
        dataSet.amount = this.oppAmount;

        createOpportunity({
            payload : JSON.stringify(dataSet)
        })
        .then(result =>{
            const response = JSON.parse(result);
            this.responseMsg = response.message;
            this.template.querySelector('form').reset();
        })
    }
}