/**********************************************************************
 * 
 * Code generated automatically by DirectJNgine
 * Copyright (c) 2009, Pedro Agulló Soliveres
 * 
 * DO NOT MODIFY MANUALLY!!
 * 
 **********************************************************************/

Ext.namespace( 'Ext.app');

Ext.app.PROVIDER_BASE_URL=window.location.protocol + '//' + window.location.host + '/' + (window.location.pathname.split('/').length>2 ? window.location.pathname.split('/')[1]+ '/' : '')  + 'djn/directprovider';

Ext.app.POLLING_URLS = {
  message : Ext.app.PROVIDER_BASE_URL + '/poll/message' /* () => String -- calls com.softwarementors.extjs.djn.demo.Poll.handleMessagePoll */
}

Ext.app.REMOTING_API = {
  url: Ext.app.PROVIDER_BASE_URL,
  type: 'remoting',
  actions: {
    Poll: [
    ],
    TestAction: [
      {
        name: 'doEcho'/*(String) => String */,
        len: 1,
        formHandler: false
      },
      {
        name: 'showDetails'/*(com.softwarementors.extjs.djn.demo.TestAction$Data) => String */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getTree'/*(String) => java.util.List */,
        len: 1,
        formHandler: false
      },
      {
        name: 'multiply'/*(String) => double */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getGrid'/*(com.google.gson.JsonArray) => java.util.List */,
        len: 1,
        formHandler: false
      }
    ],
    DirectStoreDemo: [
      {
        name: 'loadExperienceData'/*() => java.util.List */,
        len: 0,
        formHandler: false
      }
    ],
    Profile: [
      {
        name: 'getLocationInfo'/*(Long) => com.softwarementors.extjs.djn.demo.Profile$LocationInfo */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getPhoneInfo'/*(Long) => com.softwarementors.extjs.djn.demo.Profile$PhoneInfo */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getBasicInfo'/*(Long, String) => com.softwarementors.extjs.djn.demo.Profile$BasicInfo */,
        len: 2,
        formHandler: false
      },
      {
        name: 'updateBasicInfo'/*() => com.softwarementors.extjs.djn.demo.Profile$SubmitResult -- FORM HANDLER */,
        len: 1,
        formHandler: true
      }
    ],
    FormPostDemo: [
      {
        name: 'handleSubmit'/*() => com.softwarementors.extjs.djn.demo.FormPostDemo$Result -- FORM HANDLER */,
        len: 1,
        formHandler: true
      }
    ]
  }
}

