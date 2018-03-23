/*
 * Copyright © 2008, 2015 Pedro Agulló Soliveres.
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

Ext.require( ['Ext.*']);

Ext.onReady( function() {
  // Register provider
  Ext.app.REMOTING_API.enableBuffer = 0;
  var remotingProvider = Ext.Direct.addProvider( Ext.app.REMOTING_API);
    // VERY IMPORTANT: this is for debugging purposes, set validateCalls to false if this causes problems
    Djn.RemoteCallSupport.addCallValidation(remotingProvider);
    Djn.RemoteCallSupport.validateCalls = true;

  var languagesStore = new Ext.data.SimpleStore( {
    fields: ['name'],
    data: [['Java'], ['Javascript'], ['C++'], ['Perl'], ['Python']]
  }) 

  var form = new Ext.FormPanel({
    url: Ext.app.PROVIDER_BASE_URL,
    frame: true,
    fileUpload : true,
    width: 500,
    labelWidth: 180,
    defaults: {
      width: 300
    },
    defaultType: 'textfield',      
    items: [
      {
        xtype: 'datefield',
        fieldLabel: 'Pick a date',
        name: 'datefield'
      },
      {
        xtype: 'combo',
        name: 'combo',
        fieldLabel: 'Favourite language',
        mode: 'local',
        store: languagesStore,
        displayField: 'name',
        forceSelection: true,
        triggerAction: 'all',
        valueField: 'name'
      },
      new Ext.form.FileUploadField({
        buttonOnly: false,
        id: 'form-file',
        fieldLabel: 'File (MUST be a text file)',
        name: 'fileUpload',
        buttonCfg: {
          text: '...'
        }
      }),
      textArea1 = new Ext.form.TextArea( {
        name: 'textArea', 
        fieldLabel: "File contents",
        height: 100,
        disabled: true
      }),
      {
        xtype: 'checkbox',
        fieldLabel: 'Check if you like DirectJNgine!',
        name : 'checkbox',
        width: 15 
      }
    ],
    buttons: [ 
              {
                text: "Submit",
                handler: function() {
                  form.submit({
                    success: function(form, action) {
                      Ext.MessageBox.alert("Posted values", action.result.fieldNamesAndValues);
                      textArea1.setValue( action.result.fileContents);
                    },
                    failure: function(form, action) {
                      Ext.Msg.alert('Failed', action.result);
                    }
                  });
                }
              },
              {
                text: "Reset",
                handler: function() {
                  form.getForm().reset();
                }
              }
            ],
            api: {
              submit: FormPostDemo.handleSubmit
            }
  });
  
  form.render("form");
});
