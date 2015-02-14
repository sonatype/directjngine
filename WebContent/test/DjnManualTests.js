/*
 * Copyright © 2008, 2012 Pedro Agulló Soliveres.
 * 
 * This file is part of DirectJNgine.
 *
 * DirectJNgine is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License.
 *
 * Commercial use is permitted to the extent that the code/component(s)
 * do NOT become part of another Open Source or Commercially developed
 * licensed development library or toolkit without explicit permission.
 *
 * DirectJNgine is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with DirectJNgine.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * This software uses the ExtJs library (http://extjs.com), which is 
 * distributed under the GPL v3 license (see http://extjs.com/license).
 */

Ext.onReady( function() {
  // Register provider
  Djn.test.REMOTING_API.enableBuffer = 0;
  var remotingProvider = Ext.Direct.addProvider( Djn.test.REMOTING_API);
  // VERY IMPORTANT: this is for debugging purposes, set validateCalls to false if this causes problems
  Djn.RemoteCallSupport.addCallValidation(remotingProvider);
  Djn.RemoteCallSupport.validateCalls = true;

  var input1;
  var fileUpload1;
  var buttonOkPost;
  var serverExceptionPostButton;
  var form = new Ext.FormPanel({
    url: Djn.test.PROVIDER_BASE_URL,
    frame: true,
    fileUpload : true,
    width: 950,
    defaults: {
      width: 770
    },
    defaultType: 'textfield',   
    api : {
    	submit : ManualFormUploadSupportTest.test_sendFilesManually
    },
    items: [  
      fileUpload1 = new Ext.form.FileUploadField({
        buttonOnly: false,
        id: 'form-file',
        fieldLabel: 'File 1 (MUST be a text file)',
        name: 'fileUpload1',
        buttonCfg: {
          text: '...'
        }
      }),
      textArea1 = new Ext.form.TextArea( {
        name: 'textArea1', 
        fieldLabel: "File 1 contents" 
      }),
      fileUpload2 = new Ext.form.FileUploadField({
        buttonOnly: false,
        id: 'form-file2',
        fieldLabel: 'File 2 (MUST be a text file)',
        name: 'fileUpload2',
        buttonCfg: {
          text: '...'
        }          
      }),
      textArea2 = new Ext.form.TextArea( {
        name: 'textArea2', 
        fieldLabel: "File 2 contents" 
      })
    ],
    buttons: [ 
      {
        text: "Test file downloads",
        handler: function(){
    	  form.getForm().submit({
    	    success: function(form, response) {
    		  var result = response.result;
              Ext.MessageBox.alert("Information", "Please, check that text areas have the content of the file you choose, if any!");
              textArea1.setValue( "Field: " + result.file1Field + ", file name='" + result.file1Name + "'\n\n" + result.file1Text);
              textArea2.setValue( "Field: " + result.file2Field + ", file name='" + result.file2Name + "'\n\n" + result.file2Text);
    	    },
    	    failure: function(form, response) {
              Ext.MessageBox.alert("Unexpected server error", "Error" );
    	    }
    	  });
        }
      },
      {
        text: "'Text WebContext' usage",  
        handler: function(){
          WebContextManagerTest.test_webContext( function(result, e){
            Ext.MessageBox.alert(
              "WebContextInfo", "Session ID: " + result.sessionId + ", Times called in session: " + result.callsInSession + ", Times called in app: " + result.callsInApplication +
              '<br><br>' +
              "<b>To finish the test, open a different browser</b> and check that the counter for number of calls to session and application scoped actions really works"
            );
            return;
          });
        }
      },
      {
        text: "Test Session & Application scoped actions",  
        handler: function() {
          var callCount = 0;
          var sessionResult = 0;
          var applicationResult = 0;
          ApplicationStatefulActionTest.test_getApplicationCallCount( function(result, e){
            callCount++;
            applicationResult = result;
            if( callCount === 2 ) {
              Ext.MessageBox.alert("Session & Application scoped actions", 
                "Times 'ApplicationStatefulActionTest.test_getApplicationCallCount' has been called: " + applicationResult + '<br>' +  
                "Times 'SessionStatefulActionTest.test_getSessionCallCount' has been called: " + sessionResult + '<br><br>' +
                "<b>To finish the test, open a different browser</b> and check that the counter for number of calls to session and application scoped actions really works"
              );
            }
            return;
          });
          SessionStatefulActionTest.test_getSessionCallCount( function(result, e){
            callCount++;
            sessionResult = result;
            if( callCount === 2 ) {
              Ext.MessageBox.alert("Session & Application scoped actions", 
                "Times 'ApplicationStatefulActionTest.test_getApplicationCallCount' has been called: " + applicationResult + '<br>' +  
                "Times 'SessionStatefulActionTest.test_getSessionCallCount' has been called: " + sessionResult + '<br><br>' +
                "<b>To finish the test, open a different browser</b> and check that the counter for number of calls to session and application scoped actions really works"
              );
            }
            return;
          });
        }
      }
    ]
  });
  
  form.render("uploadForm");
 

});
