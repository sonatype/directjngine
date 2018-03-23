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

  var experienceStore = new Ext.data.DirectStore( {
    paramsAsHash:false,
    root:'',
    directFn: DirectStoreDemo.loadExperienceData,
    idProperty:'description',
    fields: [
      {name: 'startDate' },
      {name: 'endDate'},
      {name: 'description'}
    ],
    listeners: {
      load: function(s, records){
        Ext.MessageBox.alert( "Information", "Loaded " + records.length + " records");
      }
    }
  });
  
/* Using paramAsHash: true + implementing loadExperienceData so that it
   receives a JsonArray
var experienceStore = new Ext.data.DirectStore( {
    paramsAsHash:true,
    root:'',
    directFn: DirectStoreDemo.loadExperienceData,
    idProperty:'description',
    fields: [
      {name: 'startDate'},
      {name: 'endDate'},
      {name: 'description'}
    ],
    listeners: {
      load: function(s, records){
        Ext.MessageBox.alert( "Information", "Loaded " + records.length + " records");
      }
    },
    baseParams : {
        start : 1,
        limit : 10,
        sort : "id",
        dir : "ASC"
    }  
  });
*/  
  experienceStore.load();
  
  var grid = new Ext.grid.GridPanel( {
    renderTo: "grid",
    frame: true,
    title: "Working Experience & Skills",
    height: 350,
    width: 750,
    store: experienceStore,
    stripeRows: true,
    columns: [
      {
        header: 'Start date',
        dataIndex: 'startDate',
        width: 65
      },
      {
        header: 'End date',
        dataIndex: 'endDate',
        width: 65
      },
      {
        header: 'Experience/Skill',
        dataIndex: 'description',
        width: 600
      }
    ]
  })
  
});
