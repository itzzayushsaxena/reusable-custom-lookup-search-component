/**
 * @author            : Ayush Saxena
 * @last modified on  : 12-01-2022
 * @last modified by  : Ayush Saxena
**/
public with sharing class CustomLookupSearchController {
    
    @AuraEnabled(cacheable=true)
    public static List<sObject> lookUpSearch(String searchValue, string objectLabel) {
        String queryString = null;
        if(searchValue == null || searchValue == ''){
            queryString = 'Select Id, Name from '+objectLabel+' ORDER BY LastViewedDate LIMIT 5';
        }
        else {
            queryString = 'Select Id, Name from '+objectLabel+' Where Name Like  \'%' + searchValue + '%\' LIMIT  5';
        }
        List<sObject> returnLookUpList = database.query(queryString);
        return returnLookUpList;
    }
}
