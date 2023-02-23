public with sharing class OpportunityHandler {
    @AuraEnabled
    public static String createOpportunity(String payload){
        system.debug('inside handler-->' + payload);
        List<Opportunity> oppList = new List<Opportunity>();
        Response resp;
        OpportunityWrapper oppWrap = (OpportunityWrapper)JSON.deserialize(payload,OpportunityWrapper.class);
        system.debug('oppWrapList-->' + oppWrap);
        Opportunity oppRec = new Opportunity();
        oppRec.Name = oppWrap.name;
        oppRec.CloseDate = oppWrap.cDate;
        oppRec.StageName = oppWrap.stage;
        oppRec.Amount = oppWrap.amount;
        oppList.add(oppRec);
        system.debug('allOppRecords--->' + oppList);
        try{
            if(!oppList.isEmpty()){
                insert oppList;
                resp = new Response('SUCCESS', 'Opportunity record created successfully!');
            }
        }
        catch(Exception ex){
            resp = new Response('ERROR', ex.getMessage());
        }

        return JSON.serialize(resp);
    }

    public class Response {
        public String status;
        public String message;
        public Response(String status, String message){
            this.status = status;
            this.message = message;
        }
    }

    public class OpportunityWrapper{
        public String name;
        public Date cDate;
        public String stage;
        public Integer amount;
    }

}