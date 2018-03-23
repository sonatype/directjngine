/**********************************************************************
 * 
 * Code generated automatically by DirectJNgine
 * Copyright (c) 2009, Pedro Agulló Soliveres
 * 
 * DO NOT MODIFY MANUALLY!!
 * 
 **********************************************************************/

Ext.namespace( 'Djn.programmaticNamespace');
Ext.namespace( 'Djn.programmaticNamespace');

Djn.programmaticNamespace.PROVIDER_BASE_URL=window.location.protocol + '//' + window.location.host + '/' + (window.location.pathname.split('/').length>2 ? window.location.pathname.split('/')[1]+ '/' : '')  + 'djn/directprovider';

Djn.programmaticNamespace.POLLING_URLS = {
  myProgrammaticPollMethod : Djn.programmaticNamespace.PROVIDER_BASE_URL + '/poll/myProgrammaticPollMethod' /* () => String -- calls com.softwarementors.extjs.djn.test.config.CustomRegistryConfiguratorHandlingTest.test_programmaticPollMethod */
}

Djn.programmaticNamespace.REMOTING_API = {
  url: Djn.programmaticNamespace.PROVIDER_BASE_URL,
  type: 'remoting',
  namespace: Djn.programmaticNamespace,
  actions: {
    MyCustomRegistryConfiguratorHandlingTest: [
      {
        name: 'myProgrammaticMethod'/*(String) => String */,
        len: 1,
        formHandler: false
      }
    ]
  }
}

