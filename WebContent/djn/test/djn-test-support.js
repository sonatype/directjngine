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

Ext.namespace( "Djn.Test");

Djn.Test.allTestsResults = {
  started : 0,
  finished : 0,
  successful : 0,
  errors : 0,
  tests : [],
  timedOut : false,
  fatalError : ''
};

Djn.Test.allTestErrors = "";

var resultMessageBox;

Djn.Test.showTestsInfo = function(){
  if( Djn.Test.allTestsResults.fatalError !== '' ) {
    Ext.MessageBox.show({
      minWidth: 750,
      title: "Fatal error!",
      msg: Djn.Test.allTestsResults.fatalError
    });
    return;
  }
  
  var pendingTests = Djn.Test.allTestsResults.started - Djn.Test.allTestsResults.successful - Djn.Test.allTestsResults.errors;
  var resultSummary = "<b>Results</b>: started=" + Djn.Test.allTestsResults.started +
    ", <font color='green'>ok=" +
    Djn.Test.allTestsResults.successful +
    "</font>";
    
  if (Djn.Test.allTestsResults.errors > 0) {
    resultSummary += ", <font color='red'>errors=" + Djn.Test.allTestsResults.errors + "</font>";
  }
  
  var timeOutErrors = "";
  if (Djn.Test.allTestsResults.timedOut) {
    timeOutErrors = "<b>Timed out</b>:<br>";
    resultSummary += ", <font color='red'>timed out=" + pendingTests + "</font>";
    for( testName in Djn.Test.allTestsResults.tests ) {
      var test = Djn.Test.allTestsResults.tests[testName];
      if( test.finished === false) {
        timeOutErrors += "<br>� <font color='red'>" + test.name + "</font>";
      }      
    }
  }
  else {
    resultSummary += ", pending=" + pendingTests;
  }
  
  var statusText;
  var title;
  if (pendingTests == 0) {
    title = "Tests finished";
    statusText = title;
    if (Djn.Test.allTestsResults.errors > 0) {
      statusText += " with <font color='red'><b>errors</b></font>";
    }
    else {
      statusText += " with <font color='green'><b>success</b></font>";
    }
  }
  else {
    if (Djn.Test.allTestsResults.timedOut) {
      title = "Tests timed out";
      statusText = "Tests did not finish due to <font color='red'><b>execution timeouts</b></font>";
      if (Djn.Test.allTestsResults.errors > 0) {
        statusText += ". Found <font color='red'><b>errors</b></font> too";
      }
    }
    else {
      title = "Tests in progress...";
      statusText = "Tests in progress<b>";
      for (i = 0; i < Djn.Test.allTestsResults.finished; i++) {
        statusText += " .";
      }
      statusText += "</b>";
    }
  }
  
  var errorsText = "";
  if (Djn.Test.allTestsResults.errors > 0 ) {
    if( Djn.Test.allTestsResults.timedOut ) {
      timeOutErrors = "<br><br>" + timeOutErrors;
    }
    errorsText = "<b>Errors</b>: <br>" + Djn.Test.allTestErrors + timeOutErrors + "<br><br>";
  }
  else if( Djn.Test.allTestsResults.timedOut ) {
    errorsText = timeOutErrors + "<br><br>";
  }
  
  var text = errorsText + resultSummary + "<br><br>" + statusText 
  if (resultMessageBox === undefined) {
    resultMessageBox == Ext.MessageBox.show({
      minWidth: 750,
      title: title,
      msg: text
    });
  }
  else {
    resultMessageBox.updateText( text ); 
  }
}

/*
Djn.Test.markAsNotToBeExecuted = function( testFunctionName, message ) {
  Ejn.Assert.isTrue( testFunctionName !== undefined );

  message = message || "";
  Djn.Test.allTestsResults.tests[testFunctionName].notToBeExecuted = true;
}
*/

Djn.Test.check = function( testFunctionName, booleanExpression, errorMessage ) {
  Ejn.Assert.isTrue( testFunctionName !== undefined );
  Ejn.Assert.isTrue( booleanExpression !== undefined );
  errorMessage = errorMessage || "Error";
  
  if( !booleanExpression ) {
    Djn.Test.reportTestFailure( testFunctionName, errorMessage);
  }
  else {
    Djn.Test.reportTestSuccess( testFunctionName );
  }
}

Djn.Test.reportTestFailure = function(testFunctionName, errorMessage){
  Ejn.Assert.isTrue(testFunctionName !== undefined);
  Ejn.Assert.isTrue(errorMessage !== undefined);
  if (testResultAlreadyReported = Djn.Test.allTestsResults.tests[testFunctionName] === undefined) {
    alert( "Unexpected condition: tests['" + testFunctionName + "'] is undefined");
    debugger; 
  }
  var testResultAlreadyReported = Djn.Test.allTestsResults.tests[testFunctionName].finished === true;
  Ejn.Assert.isTrue( !testResultAlreadyReported );
  
  Djn.Test.allTestsResults.tests[testFunctionName].result = false;
  Djn.Test.allTestsResults.tests[testFunctionName].finished = true;

  Djn.Test.allTestsResults.errors++;  
  Djn.Test.allTestsResults.finished++;  
  
  var completeReport = "<font color='red'>" + testFunctionName + "</font>: " + errorMessage; 
  Djn.Test.allTestErrors += "<br>� " + completeReport;
  Djn.Test.showTestsInfo();
  Ext.log( "Djn.Test FAILED: " + testFunctionName + ", " + errorMessage );
}

Djn.Test.reportTestSuccess = function(testFunctionName ) {
  Ejn.Assert.isTrue( testFunctionName !== undefined );
  var testResultAlreadyReported = Djn.Test.allTestsResults.tests[testFunctionName].finished === true;
  Ejn.Assert.isTrue( !testResultAlreadyReported );

  Djn.Test.allTestsResults.tests[testFunctionName].result = true;
  Djn.Test.allTestsResults.tests[testFunctionName].finished = true;

  Djn.Test.allTestsResults.successful++;
  Djn.Test.allTestsResults.finished++;  

  Djn.Test.showTestsInfo();
  Ext.log( "Djn.Test OK: " + testFunctionName );
}

Djn.Test.fail = function ( testFunctionName, errorMessage ) {
  Ejn.Assert.isTrue( testFunctionName !== undefined );
  Ejn.Assert.isTrue( errorMessage !== undefined );
  
  Djn.Test.reportTestFailure( testFunctionName, errorMessage );
}

Djn.Test.checkClientCallError = function( testFunctionName, exception ) {
  Ejn.Assert.isTrue( exception !== undefined );
  Ejn.Assert.isTrue( exception !== null );
  Ejn.Assert.isTrue( testFunctionName !== undefined );
  
  if( exception !== undefined && exception !== null && exception.toString().indexOf( Djn.RemoteCallSupport.DIRECT_CALL_ERROR_PREFIX ) === 0 ) {
    Djn.Test.reportTestSuccess( testFunctionName ) 
  }
  else {
    Djn.Test.reportTestFailure( testFunctionName, "Expected an exception of type '" +  Djn.RemoteCallSupport.DIRECT_CALL_ERROR_PREFIX +"', but found '" + exception + "'");
  }
}

Djn.Test.checkServerErrorResponse = function( testFunctionName, response, expectedErrorType ) {
  Ejn.Assert.isTrue( response !== undefined );
  Ejn.Assert.isTrue( testFunctionName !== undefined );
  Ejn.Assert.isTrue( expectedErrorType !== undefined );

  if( response.status === true) {
    Djn.Test.reportTestFailure( testFunctionName, "Expected to receive a server error of type '" + expectedErrorType +"', but the response was not an error." )
    return;
  }
  if( response.type !== 'exception') {
    Djn.Test.reportTestFailure( testFunctionName, "Expected to receive a server error of type '" + expectedErrorType +"', but the response was an aplication error, not a server error." )
    return;
  }

  // Ext.log( "INFO: sever error message= " + response.message );
  if( response.message.indexOf( expectedErrorType ) !== 0) {
    Djn.Test.reportTestFailure( testFunctionName, "Expected to receive a server error of type '" + expectedErrorType +"', but the response was of a different type: " + response.message );
    return;            
  }
    
  Djn.Test.reportTestSuccess( testFunctionName );
}

Djn.Test.checkSuccessfulResponse = function( testFunctionName, response, booleanExpression, errorMessage ) {
  Ejn.Assert.isTrue( testFunctionName !== undefined );
  Ejn.Assert.isTrue( response !== undefined );
  
  if( response.result === undefined ) {
    if (response.type !== undefined && response.type === 'exception') {
      Djn.Test.reportTestFailure(testFunctionName, "Expected to receive a successful response, but got a server error: " + response.message );
      return;
    }
    else {
      Djn.Test.reportTestFailure(testFunctionName, "Expected to receive a successful response, but the response 'result' element was not present");
      return;
    }
    Djn.Test.reportTestFailure(testFunctionName, "Unknown error (response.result undefined)");
    return;
  }
  
  Ejn.Assert.isTrue( booleanExpression !== undefined );
  
  if( errorMessage === undefined ) {
    errorMessage = "";
  }
  
  if( response.status === false) {
    if (response.type === 'exception') {
      Djn.Test.reportTestFailure(testFunctionName, "Expected to receive a successful response, but received a server error: " + response.message );
      return;
    }
    else {
      Djn.Test.reportTestFailure(testFunctionName, "Expected to receive a successful response, but received a failed one (though not a server error)" );
      return;
    }
  }
  
  if( !booleanExpression ) {
    Djn.Test.reportTestFailure( testFunctionName, errorMessage);
    return;
  }
  
  Djn.Test.reportTestSuccess( testFunctionName );
}


GLOBAL_timesChecked = 0;
GLOBAL_testsExecutedInLastCheck = 0;
GLOBAL_secondsToCheckForTestFinalization = 10;

Djn.Test.runTestClasses = function() {
  Djn.Test.allTestsResults.fatalError = '';
  
  for (j = 0; j < arguments.length; j++) {
    var test = arguments[j];
    if( test === undefined ) {
    	debugger;    
      alert( "Arg " + j + " is undefined");
      continue;
    }
    
    function executeIfDefinedAndIsFunction(f){
      if (isDefinedAndMethod(f)) {
        f();
      }
    }
    
    function isDefinedAndMethod(f){
      return f !== undefined && typeof f === 'function';
    }

    try {
      executeIfDefinedAndIsFunction(test.beforeClass);
      for (memberName in test) {
        var member = test[memberName];
      
        // Ext.log( "Tipo de " + memberName + "=" + typeof memberName);
        var candidateToExecution = memberName.indexOf('test') === 0;
        if (candidateToExecution) {
          var type = typeof member;
          if (type === 'function') {
            Djn.Test.allTestsResults.started++;
          
            Djn.Test.allTestsResults.tests[memberName] = {
              name: memberName,
              result: true,
              finished: false,
              serverResponseExpected: true
            };
          
            try {
              executeIfDefinedAndIsFunction(test.beforeMethod);
              member();
              executeIfDefinedAndIsFunction(test.afterMethod);
            } 
            catch (e) {
              debugger;
              var error = "Unexpected error in test: '" + memberName + "'. " + e.toString() + "'";
              alert( error );
              // Djn.Test.fail( memberName, error );
              Ext.log(error);
              throw e;
            }
          }
        }
      }
      executeIfDefinedAndIsFunction(test.afterClass);
    }
    catch( e ) {
      debugger;
      /*
      var error = "Unable to run all tests due to an unexpected error.<br><br>" +
                  "Error: <b>" + e.toString() + "</b>";
      Djn.Test.allTestsResults.fatalError = error;
      Ext.log("FATAL ERROR: " + error);
      Djn.Test.showTestsInfo();
      */
      throw e;
    }
  }
  
  // Start testing test completion every second!
  var checkTestResultsRunner = new Ext.util.TaskRunner();
  var timeInterval = 1000; // 1 second
  var checkTestResults = {
    run: function() {
      var newTestsExecuted = GLOBAL_testsExecutedInLastCheck < Djn.Test.allTestsResults.finished;
      if( newTestsExecuted ) {
        GLOBAL_timesChecked = 0;
        GLOBAL_testsExecutedInLastCheck = Djn.Test.allTestsResults.finished;
      } 
      GLOBAL_timesChecked++;
      if( Djn.Test.allTestsResults.finished == Djn.Test.allTestsResults.started ) {
        checkTestResultsRunner.stop(checkTestResults);
        GLOBAL_timesChecked = 0;
        Djn.Test.showTestsInfo();
        Ext.log( "All tests finished!");
      }
      if( GLOBAL_timesChecked >= GLOBAL_secondsToCheckForTestFinalization ) {
        checkTestResultsRunner.stop(checkTestResults);
        Djn.Test.allTestsResults.timedOut = true;
        GLOBAL_timesChecked = 0;
        Djn.Test.showTestsInfo();
        Ext.log( "Some tests not finished yet...Tests finished forcefully!");
      }
      if( GLOBAL_timesChecked > 2 ) {
        Ext.log( "Waiting " + (GLOBAL_secondsToCheckForTestFinalization - GLOBAL_timesChecked) + " seconds for pending tests to finish...");
      }
    },
    interval: timeInterval
  }
  
  checkTestResultsRunner.start(checkTestResults);
  // Ext.log( "Checker started!")
}


