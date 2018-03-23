Ext.namespace("Djn.programmaticNamespace");
Ext.namespace("Djn.programmaticNamespace");
Djn.programmaticNamespace.PROVIDER_BASE_URL=window.location.protocol+"//"+window.location.host+"/"+(window.location.pathname.split("/").length>2?window.location.pathname.split("/")[1]+"/":"")+"djn/directprovider";
Djn.programmaticNamespace.POLLING_URLS={myProgrammaticPollMethod:Djn.programmaticNamespace.PROVIDER_BASE_URL+"/poll/myProgrammaticPollMethod"};
Djn.programmaticNamespace.REMOTING_API={url:Djn.programmaticNamespace.PROVIDER_BASE_URL,type:"remoting",namespace:Djn.programmaticNamespace,actions:{MyCustomRegistryConfiguratorHandlingTest:[{name:"myProgrammaticMethod",len:1,formHandler:false}]}};