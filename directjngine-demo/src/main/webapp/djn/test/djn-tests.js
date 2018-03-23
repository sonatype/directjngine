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

var JAVA_MAX_BYTE = 127;
var JAVA_MIN_BYTE = -128;
var JAVA_MAX_SHORT = 32767;
var JAVA_MIN_SHORT = -32768;
var JAVA_MAX_INT = 2147483647;
var JAVA_MIN_INT = -2147483648;
var JAVA_MAX_LONG = 92233720368547775807;
var JAVA_MIN_LONG = -922337203685477758078;
var JAVA_MAX_FLOAT = 3.4028235e+38;
var JAVA_MIN_FLOAT = 1.4e-45;
var JAVA_MAX_DOUBLE = 1.7976931348623157e+308;
var JAVA_MIN_DOUBLE = 4.9e-324;

Djn.ClientCallErrorTest = {
  testClassName : 'ClientCallErrorTest',
  
  test_serverReceivingJavascriptFunction : function() {
    try {
      ServerMethodParametersReceptionTest.test_serverReceivingJavascriptFunction( function () {},
      function(provider, response) {
        Djn.Test.fail( "test_serverReceivingJavascriptFunction", "Expected a Client-side error" );
      });
      Djn.Test.fail( "test_serverReceivingJavascriptFunction", "Expected a Client-side error" );
    }
    catch( e ) {
      Djn.Test.checkClientCallError( "test_serverReceivingJavascriptFunction", e );    
    }
  },
  
  test_serverReceivingUniqueParameterUndefined : function() {
    try {
      ServerMethodParametersReceptionTest.test_serverReceivingUniqueParameterUndefined( undefined,
      function(provider, response) {
        Djn.Test.fail( "test_serverReceivingUniqueParameterUndefined", "Expected a Client-side error" );
      });
      Djn.Test.fail( "test_serverReceivingUniqueParameterUndefined", "Expected a Client-side error" );
    }
    catch( e ) {
      Djn.Test.checkClientCallError( "test_serverReceivingUniqueParameterUndefined", e );    
    }
  },

  test_serverReceivingSeveralParametersWithTheLastOneUndefined : function() {
    try {
      ServerMethodParametersReceptionTest.test_serverReceivingSeveralParametersWithTheLastOneUndefined('a', 'b', undefined, function(provider, response){
        Djn.Test.fail("test_serverReceivingSeveralParametersWithTheLastOneUndefined", "Expected a Client-side error");
      });
      Djn.Test.fail( "test_serverReceivingSeveralParametersWithTheLastOneUndefined", "Expected a Client-side error" );
    }
    catch( e ) {
      Djn.Test.checkClientCallError( "test_serverReceivingSeveralParametersWithTheLastOneUndefined", e );    
    }
  },

  test_serverReceivingSeveralParametersOneOfThemUndefined : function() {
    try {
      ServerMethodParametersReceptionTest.test_serverReceivingSeveralParametersOneOfThemUndefined( 'a', undefined, 'b',
        function(provider, response) {
          Djn.Test.fail( "test_serverReceivingSeveralParametersOneOfThemUndefined", "Expected a Client-side error" );
        }
      );
      Djn.Test.fail( "test_serverReceivingSeveralParametersOneOfThemUndefined", "Expected a Client-side error" );
    }
    catch( e ) {
      Djn.Test.checkClientCallError( "test_serverReceivingSeveralParametersOneOfThemUndefined", e );    
    }
  },

  test_serverReceivingMoreParametersThanExpected : function() {
    try {
      ServerMethodParametersReceptionTest.test_serverReceivingMoreParametersThanExpected(22, 10, function(provider, response){
        Djn.Test.fail( "test_serverReceivingMoreParametersThanExpected", "Expected a Client-side error" );
      });
      Djn.Test.fail( "test_serverReceivingMoreParametersThanExpected", "Expected a Client-side error" );
    }
    catch( e ) {
      // ExtJs >= 5.1
      if( e.message.indexOf( 'Callback argument is not a function') < 0 ) {
         Djn.Test.fail( "test_serverReceivingMoreParametersThanExpected", "Expected ExtJs debug to detect wrong argument type starting from ExtJs 5.1" );
      }
      else {
         Djn.Test.reportTestSuccess('test_serverReceivingMoreParametersThanExpected');
      }
      // Pre-ExtJs 5.1
      // Djn.Test.checkClientCallError( "test_serverReceivingMoreParametersThanExpected", e );
    }
  },

  test_serverReceivingLessParametersThanExpected : function() {
    try {
      ServerMethodParametersReceptionTest.test_serverReceivingLessParametersThanExpected(1, function(provider, response){
        Djn.Test.fail("test_serverReceivingLessParametersThanExpected", "Expected a Client-side error");
      });
      Djn.Test.fail("test_serverReceivingLessParametersThanExpected", "Expected a Client-side error");
    }
    catch( e ) {
      Djn.Test.checkClientCallError( "test_serverReceivingLessParametersThanExpected", e );    
    }
  },

  test_serverReceivingJsonArrayInArrayHavingAnUndefinedValue: function(){
    try {
      var values = ['value1', undefined, 'value3'];
      ServerMethodParametersReceptionTest.test_serverReceivingJsonArrayInArrayHavingAnUndefinedValue(values, function(provider, response){
        Djn.Test.fail("test_serverReceivingJsonArrayInArrayHavingAnUndefinedValue", "Expected a Client-level error");
      });
      Djn.Test.fail("test_serverReceivingJsonArrayInArrayHavingAnUndefinedValue", "Expected a Client-level error");
    } 
    catch (e) {
      Djn.Test.checkClientCallError("test_serverReceivingJsonArrayInArrayHavingAnUndefinedValue", e);
    }
  },
  
  test_serverReceivingParametersWithObjectHavingArrayWithUndefinedValue: function(){
    try {
      ServerMethodParametersReceptionTest.test_serverReceivingParametersWithObjectHavingArrayWithUndefinedValue({
        v1: 1,
        v2: ["3", undefined]
      }, function(provider, response){
        Djn.Test.fail("test_serverReceivingParametersWithObjectHavingArrayWithUndefinedValue", "Expected a Client-level error");
      });
      Djn.Test.fail("test_serverReceivingParametersWithObjectHavingArrayWithUndefinedValue", "Expected a Client-level error");
    } 
    catch (e) {
      Djn.Test.checkClientCallError("test_serverReceivingParametersWithObjectHavingArrayWithUndefinedValue", e);
    }
  },
   
  test_serverReceivingParametersWithArrayHavingArrayWithUndefinedValue: function(){
    try {
      ServerMethodParametersReceptionTest.test_serverReceivingParametersWithArrayHavingArrayWithUndefinedValue([1, ["2", undefined, 3], 2], function(provider, response){
        Djn.Test.fail("test_serverReceivingParametersWithArrayHavingArrayWithUndefinedValue", "Expected a Client-level error");
      });
      Djn.Test.fail("test_serverReceivingParametersWithArrayHavingArrayWithUndefinedValue", "Expected a Client-level error");
    } 
    catch (e) {
      Djn.Test.checkClientCallError("test_serverReceivingParametersWithArrayHavingArrayWithUndefinedValue", e);
    }
  },
   
  test_serverReceivingParametersWithArrayHavingObjectHavingArrayWithUndefinedValue: function(){
    try {
      ServerMethodParametersReceptionTest.test_serverReceivingParametersWithArrayHavingObjectHavingArrayWithUndefinedValue([1, {
        v1: '2',
        v2: [5, undefined, 55]
      }, 2], function(provider, response){
        Djn.Test.fail("test_serverReceivingParametersWithArrayHavingObjectHavingArrayWithUndefinedValue", "Expected a Client-level error");
      });
      Djn.Test.fail("test_serverReceivingParametersWithArrayHavingObjectHavingArrayWithUndefinedValue", "Expected a Client-level error");
    } 
    catch (e) {
      Djn.Test.checkClientCallError("test_serverReceivingParametersWithArrayHavingObjectHavingArrayWithUndefinedValue", e);
    }
  },
    
  test_serverReceivingParametersWithObjectHavingObjectHavingArrayWithUndefinedValue: function(){
    try {
      ServerMethodParametersReceptionTest.test_serverReceivingParametersWithObjectHavingObjectHavingArrayWithUndefinedValue({
        v1: '2',
        v2: {
          v3: 88,
          v4: [5, undefined, 55]
        }
      }, function(provider, response){
        Djn.Test.fail("test_serverReceivingParametersWithObjectHavingObjectHavingArrayWithUndefinedValue", "Expected a Client-level error");
      });
      Djn.Test.fail("test_serverReceivingParametersWithObjectHavingObjectHavingArrayWithUndefinedValue", "Expected a Client-level error");
    } 
    catch (e) {
      Djn.Test.checkClientCallError("test_serverReceivingParametersWithObjectHavingObjectHavingArrayWithUndefinedValue", e);
    }
  },

  test_serverReceivingUndefinedForAPrimitive : function() {
    try {
      ServerMethodParametersReceptionTest.test_serverReceivingUndefinedForAPrimitive(undefined, function(provider, response){
        Djn.Test.fail( "test_serverReceivingUndefinedForAPrimitive" );
      });
      Djn.Test.fail( "test_serverReceivingUndefinedForAPrimitive" );
    }
    catch( e ) {    
      Djn.Test.checkClientCallError( "test_serverReceivingUndefinedForAPrimitive", e );    
    }
  },
  
  test_serverRecevingLongStringParameters : function() {
    try {
      var param1 = '';
      for( i = 0; i < 1000; i++ ) {
        param1 += 'a';
      }
      var param2 = "\n\r\u0050";
      for( i = 0; i < 10000; i++ ) {
        param2 += 'b';
      }
      ServerMethodParametersReceptionTest.test_serverRecevingLongStringParameters(param1, param2, function(provider, response){
        Djn.Test.checkSuccessfulResponse( "test_serverRecevingLongStringParameters", response, response.result === param1 + param2, response.result);
      });
    }
    catch( e ) {    
      Djn.Test.checkClientCallError( "test_serverReceivingUndefinedForAPrimitive", e );    
    }
  },
  
  test_serverProblematicLongString2 : function() {
    try {
      var param1 = "symphony";
      var param2 = " select * from `scrapbucketout` where parent='beb8596a-1dc0-4e61-9297-3267ab5d1528' and type='file'";
      var param3 = 5;
      var param4 = 5;
      var param5 = "rO0ABXNyACdjb20uYW1hem9uLnNkcy5RdWVyeVByb2Nlc3Nvci5Nb3JlVG9rZW7racXLnINNqwMA C0kAFGluaXRpYWxDb25qdW5jdEluZGV4WgAOaXNQYWdlQm91bmRhcnlKAAxsYXN0RW50aXR5SURa AApscnFFbmFibGVkSQAPcXVlcnlDb21wbGV4aXR5SgATcXVlcnlTdHJpbmdDaGVja3N1bUkACnVu aW9uSW5kZXhaAA11c2VRdWVyeUluZGV4TAANY29uc2lzdGVudExTTnQAEkxqYXZhL2xhbmcvU3Ry aW5nO0wAEmxhc3RBdHRyaWJ1dGVWYWx1ZXEAfgABTAAJc29ydE9yZGVydAAvTGNvbS9hbWF6b24v c2RzL1F1ZXJ5UHJvY2Vzc29yL1F1ZXJ5JFNvcnRPcmRlcjt4cAAAAAQATw0PyGR0wAAAAAAAAQAA AACnEObjAAAAAAFwdAAkYmViODU5NmEtMWRjMC00ZTYxLTkyOTctMzI2N2FiNWQxNTI4fnIALWNv bS5hbWF6b24uc2RzLlF1ZXJ5UHJvY2Vzc29yLlF1ZXJ5JFNvcnRPcmRlcgAAAAAAAAAAEgAAeHIA DmphdmEubGFuZy5FbnVtAAAAAAAAAAASAAB4cHQACUFTQ0VORElOR3g=";
      ServerMethodParametersReceptionTest.test_serverProblematicLongString2(param1, param2, param3, param4, param5, function(provider, response){
        var expectedResult = param1 + param2 + param5;
        Djn.Test.checkSuccessfulResponse( "test_serverProblematicLongString2", response, response.result === expectedResult, response.result);
      });
    }
    catch( e ) {    
      Djn.Test.checkClientCallError( "test_serverProblematicLongString2", e );    
    }
  }
  
  

//  test_serverReceivingCallCausingInfiniteRecursionIfParametersRecursivelyChecked :function() {
//    try {
//      var param1 = {};
//      var param2 = {
//        other : param1
//      };
//      param1.other = param2;
//      
//      ServerMethodParametersReceptionTest.test_serverReceivingCallCausingInfiniteRecursionIfParametersRecursivelyChecked(param1, function(provider, response){
//        Djn.Test.fail( "test_serverReceivingCallCausingInfiniteRecursionIfParametersRecursivelyChecked" );
//      });
//      Djn.Test.fail( "test_serverReceivingCallCausingInfiniteRecursionIfParametersRecursivelyChecked" );
//    }
//    catch( e ) {    
//      Djn.Test.checkClientCallError( "test_serverReceivingCallCausingInfiniteRecursionIfParametersRecursivelyChecked", e );    
//    }
//  }
  
}

Djn.ServerMethodReturnTest = {
  testClassName : 'ServerMethodReturnTest',
  
  test_chineseStringsWorkCorrectly : function() {
    ServerMethodReturnTest.test_chineseStringsWorkCorrectly( '界世界',
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_chineseStringsWorkCorrectly", response, response.result === '世界', 'Expected: ' + response.result);
      }
    );
  },
  
  test_serverReturningMap : function() {
    ServerMethodReturnTest.test_serverReturningMap(
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReturningMap", response, response.result.key1 === 'value1' && response.result.key2 === null, response.result);
      }
    );    
  },
  
  test_serverReturningPolymorphicValues : function() {
    ServerMethodReturnTest.test_serverReturningPolymorphicValues(
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReturningPolymorphicValues", response, 
        		response.result[0].v1 === 'a' && 
        		response.result[1].v1 === 'b' &&
        		response.result[1].v2 === 5);
      }
    );    
  },
  
  test_serverReturningNothing : function() {
    ServerMethodReturnTest.test_serverReturningNothing(
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReturningNothing", response, response.result === null, response.result);
      }
    );
  },
  
  test_serverReturningNull : function() {
    // A method that returns nothing in Java (void), returns 'null', not 'undefined' in ExtJs Direct
    ServerMethodReturnTest.test_serverReturningNull(
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReturningNull", response, response.result === null, response.result);
      }
    );
  },  
  
  test_serverReturningByte : function() {
    ServerMethodReturnTest.test_serverReturningByte(
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReturningByte", response, response.result === JAVA_MAX_BYTE, response.result);
      }
    );
  },  

  test_serverReturningByteObject : function() {
    ServerMethodReturnTest.test_serverReturningByteObject(
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReturningByteObject", response, response.result === JAVA_MIN_BYTE, response.result);
      }
    );
  },  
  
  test_serverReturningShort : function() {
    ServerMethodReturnTest.test_serverReturningShort(
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReturningShort", response, response.result === JAVA_MAX_SHORT, response.result);
      }
    );
  },  
  
  test_serverReturningShortObject : function() {
    ServerMethodReturnTest.test_serverReturningShortObject(
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReturningShortObject", response, response.result === JAVA_MIN_SHORT, response.result);
      }
    );
  },  
  
  test_serverReturningInt : function() {
    ServerMethodReturnTest.test_serverReturningInt(
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReturningInt", response, response.result === JAVA_MAX_INT, response.result);
      }
    );
  },  
  
  test_serverReturningIntegerObject : function() {
    ServerMethodReturnTest.test_serverReturningIntegerObject(
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReturningIntegerObject", response, response.result === JAVA_MIN_INT, response.result);
      }
    );
  },  
  
  test_serverReturningLong : function() {
    ServerMethodReturnTest.test_serverReturningLong(
      function(provider, response) {
        var value = response.result;
        var expectedValue = JAVA_MAX_LONG;
        // A javascript number is precise up to 15 digits, but Java's Long.MAX_VALUE has many more digits, and therefore JavaScript can't represent it adequately
        Djn.Test.checkSuccessfulResponse( "test_serverReturningLong", response, response.result !== JAVA_MAX_LONG, "Received " + value + ", expected " + expectedValue);
      }
    );
  },  
  
  test_serverReturningLongObject : function() {
    ServerMethodReturnTest.test_serverReturningLongObject(
      function(provider, response) {
        var value = response.result;
        var expectedValue = JAVA_MIN_LONG; 
        // A javascript number is precise up to 15 digits, but Java's Long.MIN_VALUE has many more digits, and therefore JavaScript can't represent it adequately
        Djn.Test.checkSuccessfulResponse( "test_serverReturningLongObject", response, response.result !== JAVA_MIN_LONG, "Received " + value + ", expected " + expectedValue);
      }
    );
  },  
  
  test_serverReturningFloat : function() {
    ServerMethodReturnTest.test_serverReturningFloat(
      function(provider, response) {
        var value = response.result;
        var expectedValue = JAVA_MAX_FLOAT; 
        Djn.Test.checkSuccessfulResponse( "test_serverReturningFloat", response, response.result === JAVA_MAX_FLOAT, "Received " + value + ", expected " + expectedValue);
      }
    );
  },  
  
  test_serverReturningFloatObject : function() {
    ServerMethodReturnTest.test_serverReturningFloatObject(
      function(provider, response) {
        var value = response.result;
        var expectedValue = JAVA_MIN_FLOAT; 
        Djn.Test.checkSuccessfulResponse( "test_serverReturningFloatObject", response, response.result === JAVA_MIN_FLOAT, "Received " + value + ", expected " + expectedValue);
      }
    );
  },  
  
  test_serverReturningDouble : function() {
    ServerMethodReturnTest.test_serverReturningDouble(
      function(provider, response) {
        var value = response.result;
        var expectedValue = JAVA_MAX_DOUBLE; 
        Djn.Test.checkSuccessfulResponse( "test_serverReturningDouble", response, response.result === JAVA_MAX_DOUBLE, "Received " + value + ", expected " + expectedValue);
      }
    );
  },  
  
  test_serverReturningDoubleObject : function() {
    ServerMethodReturnTest.test_serverReturningDoubleObject(
      function(provider, response) {
        var value = response.result;
        var expectedValue = JAVA_MIN_DOUBLE; 
        Djn.Test.checkSuccessfulResponse( "test_serverReturningDoubleObject", response, response.result === JAVA_MIN_DOUBLE, "Received " + value + ", expected " + expectedValue);
      }
    );
  },  
  
  test_serverReturningString : function() {
    ServerMethodReturnTest.test_serverReturningString(
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReturningString", response, response.result === 'abC', response.result);
      }
    );
  },  
  
  test_serverReturningEmptyString : function() {
    ServerMethodReturnTest.test_serverReturningEmptyString(
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReturningEmptyString", response, response.result === '', response.result);
      }
    );
  },

  test_serverReturningVeryComplexObject : function() {
    ServerMethodReturnTest.test_serverReturningVeryComplexObject(function(provider, response){
      var obj = response.result;
      var ok = obj != null && 
           obj.ints.length == 2 && obj.ints[0] === 33 && obj.ints[1] == null &&
           obj.myComplexObject != null && obj.myComplexObject.name === "MyPet" && obj.myComplexObject.age == 0 &&
           obj.moreComplexObjects != null && obj.moreComplexObjects.length == 2 && 
             obj.moreComplexObjects[0] == null && 
             obj.moreComplexObjects[1] != null && obj.moreComplexObjects[1].name == null && obj.moreComplexObjects[1].age == 5 &&
           obj.notSetInJs == 19; 
      Djn.Test.checkSuccessfulResponse("test_serverReturningVeryComplexObject", response, ok);
    });
  },
  
  test_serverReturningPrimitiveDoubleArray : function() {
    ServerMethodReturnTest.test_serverReturningPrimitiveDoubleArray( 2.5, 2,
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReturningPrimitiveDoubleArray", response, response.result.length === 2 && response.result[0] == 2.5 && response.result[1] == 2.5, response.result === '');
      }
    );
  }
}

Djn.DateHandlingTest = {
  testClassName : 'DateHandlingTest'
			  
  ,test_dateHandling : function() {
	var obj = new Date(1980, 11, 20, 1, 2, 3, 4);
	obj.set
	DateHandlingTest.test_dateHandling( obj,
	    function(provider, response) {
	      Djn.Test.checkSuccessfulResponse( "test_dateHandling", response,
	    		// Remember, we receive milliseconds
	       		response.result === obj.getTime()
          );
	    }
	);
  }
}

Djn.DeserializationFieldExclusionTest = {
  testClassName : 'DeserializationFieldExclusionTest'
  
  ,test_primitiveFieldExclusion : function() {
	var obj = {i:1, s:'a', t: {i:2, s: 'b'}};	
	DeserializationFieldExclusionTest.test_primitiveFieldExclusion( obj,
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_primitiveFieldExclusion", response,
        		response.result.i === undefined &&
        		response.result.s === 'a' &&
        		response.result.t.i === 2 &&
        		response.result.t.s === 'b' &&
        		response.result.t.t === null
        );
      }
    );
  }
  ,test_objectFieldExclusion : function() {
	var obj = {i:1, s:'a', t: {i:2, s: 'b'}};
	DeserializationFieldExclusionTest.test_objectFieldExclusion( obj,
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_objectFieldExclusion", response,
        		response.result.i === 1 &&
        		response.result.s === 'a' &&
        		response.result.t === undefined
        );
      }
    );
  }
  ,test_arrayFieldExclusion : function() {
	var obj = {i:1, a:[2,3]};
	DeserializationFieldExclusionTest.test_arrayFieldExclusion( obj,
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_arrayFieldExclusion", response,
        		response.result.i === 1 &&
        		response.result.a === undefined
        );
      }
    );
  }
  ,test_fieldInDerivedClassFieldExclusion : function() {
	DeserializationFieldExclusionTest.test_fieldInDerivedClassFieldExclusion(
	    function(provider, response) {
	       Djn.Test.checkSuccessfulResponse( "test_fieldInDerivedClassFieldExclusion", response,
        		response.result.v1 === 'b' &&
        		response.result.v2 === undefined
        );
      }
    );
  }
  ,test_nullFieldExclusion : function() {
	var obj = {i:1, s:null, t: {i:2, s: 'b'}};	
	DeserializationFieldExclusionTest.test_nullFieldExclusion( obj,
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_nullFieldExclusion", response,
        		response.result.i === 1 &&
        		response.result.s === undefined &&
        		response.result.t.i === 2 &&
        		response.result.t.s === 'b' &&
        		response.result.t.t === null
        );
      }
    );
  }
  ,test_multipleFieldExclusion : function() {
	var obj = {i:1, s:'hi', t: {i:2, s: 'b'}};	
	DeserializationFieldExclusionTest.test_multipleFieldExclusion( obj,
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_multipleFieldExclusion", response,
        		response.result.i === undefined &&
        		response.result.s === undefined &&
        		response.result.t === undefined
        );
      }
    );
  }
  ,test_nestedFieldExclusion : function() {
	var obj = {i:1, s:'hi', t: {i:2, s: 'b'}};	
	DeserializationFieldExclusionTest.test_nestedFieldExclusion( obj,
	  function(provider, response) {
	    Djn.Test.checkSuccessfulResponse( "test_nestedFieldExclusion", response,
	      		response.result.i === undefined &&
	       		response.result.s === undefined &&
	       		response.result.t.i === undefined &&
	       		response.result.t.s === undefined &&
	       		response.result.t.t === null
	    );
	  }
	);
  }
  ,test_allFieldsExclusion : function() {
	var obj = {i:1, s:'hi', t: {i:2, s: 'b'}};	
	DeserializationFieldExclusionTest.test_allFieldsExclusion( obj,
	  function(provider, response) {
	    Djn.Test.checkSuccessfulResponse( "test_allFieldsExclusion", response,
	      		response.result.i === undefined &&
	       		response.result.s === undefined &&
	       		response.result.t.i === undefined &&
	       		response.result.t.s === undefined &&
	       		response.result.t.t === undefined
	    );
	  }
	);
  }
  ,test_veryDeepFieldExclusion : function() {
	var obj = {i:1, s:'hi', t: {i:2, s: 'b', t:{i:3,s:'c',t:{i:4, s:'d',t:null}}}};	
	DeserializationFieldExclusionTest.test_veryDeepFieldExclusion( obj,
	  function(provider, response) {
	    Djn.Test.checkSuccessfulResponse( "test_veryDeepFieldExclusion", response,
	      		response.result.t.t.t.i === 4 &&
	       		response.result.t.t.t.s === undefined &&
	       		response.result.t.t.t.t === null
        );
	  }
	);
  }
  ,test_manyValuedFieldsExclusion : function() {
	var obj = { i:1, 
			    a: null, 
			    c: ['c1', 'c2'], 
			    l: ['l1', 'l2'],
			    m: { 
		             i:2,
		             a: null,
		             c: ['c1_1', 'c1_2'],
		             l: null,
		             m: null
		        }
	          };
	DeserializationFieldExclusionTest.test_manyValuedFieldsExclusion( obj,
	  function(provider, response) {
	    Djn.Test.checkSuccessfulResponse( "test_manyValuedFieldsExclusion", response,
	      		response.result.i === 1 &&
	       		response.result.a === undefined &&
	       		response.result.c === undefined &&
	       		response.result.l === undefined &&
	       		response.result.m.i === 2 &&
	       		response.result.m.a === null &&
	       		response.result.m.c[0] === 'c1_1' &&
	       		response.result.m.c[1] === 'c1_2' &&
	       		response.result.m.l === null &&
	       		response.result.m.m === null
	    );
	  }
	);
  }
  /*  
  ,test_fieldExclusionForNestedObject : function() {
	var obj = {i:1, s:'hi', t: {i:2, s: 'b'}};	
	DeserializationFieldExclusionTest.test_fieldExclusionForNestedObject( obj,
	  function(provider, response) {
	    Djn.Test.checkSuccessfulResponse( "test_fieldExclusionForNestedObject", response,
	      		response.result.i === 1 &&
	       		response.result.s === undefined &&
	       		response.result.t.i === undefined &&
	       		response.result.t.s === 'b' &&
	       		response.result.t.t === null
	    );
	  }
	);
  }
*/  
}

Djn.DeserializationToUntypedObjectsTest = {
  testClassName : 'DeserializationToUntypedObjectsTest'
  
  ,test_JsonObjectInObjectField : function() {
	var obj = {i:33, obj:{a:1,b:'anStr'}};
	DeserializationToUntypedObjectsTest.test_JsonObjectInObjectField(obj, function(provider, response){
	  Djn.Test.checkSuccessfulResponse("test_JsonObjectInObjectField", response, 
	     response.result.i === 33 &&
	     response.result.obj.a === 1 &&
	     response.result.obj.b === 'anStr'
	     );
	});
  }
  ,test_JsonArrayInObjectArrayField : function() {
	var obj = {i:33, obj:[1,"anStr"]};
	DeserializationToUntypedObjectsTest.test_JsonArrayInObjectArrayField(obj, function(provider, response){
	  Djn.Test.checkSuccessfulResponse("test_JsonArrayInObjectArrayField", response, 
	     response.result.i === 33 &&
	     response.result.obj[0] === 1 &&
	     response.result.obj[1] === "anStr"
	     );
	});
  }
  ,test_JsonArrayInObjectListField : function() {
	var obj = {i:33, obj:[1,"anStr"]};
	DeserializationToUntypedObjectsTest.test_JsonArrayInObjectListField(obj, function(provider, response){
	  Djn.Test.checkSuccessfulResponse("test_JsonArrayInObjectListField", response, 
	     response.result.i === 33 &&
	     response.result.obj[0] === 1 &&
	     response.result.obj[1] === "anStr"
	     );
	});
  }
  ,test_JsonArrayInStringMapField : function() {
	var obj = {i:33, obj:{a: 1,b: "anStr"}};
	DeserializationToUntypedObjectsTest.test_JsonArrayInStringMapField(obj, function(provider, response){
	  Djn.Test.checkSuccessfulResponse("test_JsonArrayInStringMapField", response, 
	     response.result.i === 33 &&
	     response.result.obj.a === 1 &&
	     response.result.obj.b === "anStr"
	     );
	});
  }
  ,test_JsonPrimitiveNumberInObject : function() {
    DeserializationToUntypedObjectsTest.test_JsonPrimitiveNumberInObject(3, function(provider, response){
	  Djn.Test.checkSuccessfulResponse("test_JsonPrimitiveNumberInObject", response, response.result === 3);
	});
  }
  ,test_JsonPrimitiveStringInObject : function() {
    DeserializationToUntypedObjectsTest.test_JsonPrimitiveStringInObject("str", function(provider, response){
  	  Djn.Test.checkSuccessfulResponse("test_JsonPrimitiveStringInObject", response, response.result === "str");
  	});
  }
  ,test_JsonNullInObject : function() {
    DeserializationToUntypedObjectsTest.test_JsonNullInObject(null, function(provider, response){
   	  Djn.Test.checkSuccessfulResponse("test_JsonNullInObject", response, response.result === null);
   	});
  }
  ,test_JsonBooleanInObject : function() {
    DeserializationToUntypedObjectsTest.test_JsonBooleanInObject(true, function(provider, response){
   	  Djn.Test.checkSuccessfulResponse("test_JsonBooleanInObject", response, response.result === true);
   	});
  }
  ,test_JsonObjectInObject : function() {
    DeserializationToUntypedObjectsTest.test_JsonObjectInObject({a:1, b:"hello"}, function(provider, response){
   	  Djn.Test.checkSuccessfulResponse("test_JsonObjectInObject", response, 
   			response.result.a === 1 && 
   			response, response.result.b === "hello"
   			);
   	});
  }
  ,test_JsonArrayInObject : function() {
    DeserializationToUntypedObjectsTest.test_JsonArrayInObject([3.5,null, "hello", true], function(provider, response){
   	  Djn.Test.checkSuccessfulResponse("test_JsonArrayInObject", response, 
   			response.result[0] === 3.5 &&
   			response, response.result[1] === null &&
   			response.result[2] === "hello" && 
   			response.result[3] === true
   			);
   	});
  }
  ,test_JsonArrayWithDifferentJsonTypesInObject : function() {
	DeserializationToUntypedObjectsTest.test_JsonArrayWithDifferentJsonTypesInObject(
	  	[3.5,null, "hello",
	  	   { a:1,b:true,
	  		 c:[5,"h"]
	  	   }, 
	  	   [20,
	  	    {j:"jj"}
	  	   ],
	  	   true
	  	], 
	    function(provider, response){
	       Djn.Test.checkSuccessfulResponse("test_JsonArrayWithDifferentJsonTypesInObject", response, 
	   			response.result[0] === 3.5 &&
	   			response.result[1] === null &&
	   			response.result[2] === "hello" && 
	   			response.result[3].a === 1 &&
	   			response.result[3].b === true &&
	   			response.result[3].c[0] === 5 &&
	   			response.result[3].c[1] === "h" &&
	   			response.result[4][0] === 20 &&
	   			response.result[4][1].j === "jj" &&
	   			response.result[5] === true
	   			);
	});  
  }
  
  ,test_JsonArrayInObjectArray : function() {
	  DeserializationToUntypedObjectsTest.test_JsonArrayInObjectArray( ["abc", 33, {b:true}], function(provider, response){
	    Djn.Test.checkSuccessfulResponse("test_JsonArrayInObjectArray", response, 
	  			response.result[0] === "abc" &&
	  			response.result[1] === 33 &&
	  			response.result[2].b === true);
	});
  }
  ,test_JsonObjectInObjectArray : function() {
	  DeserializationToUntypedObjectsTest.test_JsonObjectInObjectArray( {a:1, b:2}, function(provider, response){
	    Djn.Test.checkSuccessfulResponse("test_JsonObjectInObjectArray", response, 
	  			response.result[0].a == 1 &&
	  			response.result[0].b === 2);
	});
  }
  ,test_JsonNullInObjectArray : function() {
	  DeserializationToUntypedObjectsTest.test_JsonNullInObjectArray( null, function(provider, response){
    	  Djn.Test.checkSuccessfulResponse("test_JsonNullInObjectArray", response, 
	  			response.result === null );
	});
  }
  ,test_JsonObjectPrimitiveNumberInObjectArray : function() {
	  DeserializationToUntypedObjectsTest.test_JsonObjectPrimitiveNumberInObjectArray( 3.5, function(provider, response){
     	  Djn.Test.checkSuccessfulResponse("test_JsonObjectPrimitiveNumberInObjectArray", response, 
		  			response.result[0] === 3.5);
	});
  }
  
  ,test_JsonObjectInStringMap : function() {
	  DeserializationToUntypedObjectsTest.test_JsonObjectInStringMap( {aKey:"aValue", key2:5, key3:{a:[true]}}, function(provider, response){
     	  Djn.Test.checkSuccessfulResponse("test_JsonObjectInStringMap", response, 
		  			response.result.aKey === "aValue" &&
		  			response.result.key2 === 5 &&
		  			response.result.key3.a[0] === true);
	});
  }
  ,test_JsonPrimitiveNumberInStringMap_fails : function() {
	  DeserializationToUntypedObjectsTest.test_JsonPrimitiveNumberInStringMap_fails( 5.5, function(provider, response){
		  Djn.Test.checkServerErrorResponse("test_JsonPrimitiveNumberInStringMap_fails", response, 'JsonException');
	}); 
  }
  ,test_JsonNullInStringMap : function() {
	  DeserializationToUntypedObjectsTest.test_JsonNullInStringMap( null, function(provider, response){
     	  Djn.Test.checkSuccessfulResponse("test_JsonNullInStringMap", response, 
		  			response.result == null);
	});
  }
  ,test_JsonArrayInListUntyped : function() {
	  DeserializationToUntypedObjectsTest.test_JsonArrayInListUntyped( ['a','b'], function(provider, response){
     	  Djn.Test.checkSuccessfulResponse("test_JsonArrayInListUntyped", response, 
		  			response.result[0] === 'a' &&
		  			response.result[1] === 'b' );
	});
  }
  ,test_JsonObjectInListUntyped : function() {
	  DeserializationToUntypedObjectsTest.test_JsonObjectInListUntyped( 'a', function(provider, response){
     	  Djn.Test.checkSuccessfulResponse("test_JsonObjectInListUntyped", response, 
		  			response.result[0] === 'a' );
	});
  }
}

Djn.DeserializationOfSingleItemToSingleItemArrayTest = {
  testClassName : 'DeserializationOfSingleItemToSingleItemArrayTest'
  
  ,test_serverReceivingJsonNumberInIntArrayCreatesSingleItemArray : function() {
	DeserializationOfSingleItemToSingleItemArrayTest.test_serverReceivingJsonNumberInIntArrayCreatesSingleItemArray(837, function(provider, response){
   	  Djn.Test.checkSuccessfulResponse("test_serverReceivingJsonNumberInIntArrayCreatesSingleItemArray", response, 
	  			response.result === 1 );
	});
  }
  ,test_serverReceivingJsonObjectInArrayCreatesSingleItemArray : function() {
	DeserializationOfSingleItemToSingleItemArrayTest.test_serverReceivingJsonObjectInArrayCreatesSingleItemArray( {value:43}, function(provider, response){
   	  Djn.Test.checkSuccessfulResponse("test_serverReceivingJsonObjectInArrayCreatesSingleItemArray", response, 
		  			response.result === 1 );
	});
  }
  ,test_serverReceivingJsonStringInArrayCreatesSingleItemArray : function() {
	DeserializationOfSingleItemToSingleItemArrayTest.test_serverReceivingJsonStringInArrayCreatesSingleItemArray( "str", function(provider, response){
   	  Djn.Test.checkSuccessfulResponse("test_serverReceivingJsonStringInArrayCreatesSingleItemArray", response, 
		  			response.result === 1 );
	});
  }
  ,test_serverReceivingJsonStringInCharArrayCreatesSingleItemArray : function() {
    DeserializationOfSingleItemToSingleItemArrayTest.test_serverReceivingJsonStringInCharArrayCreatesSingleItemArray( "c", function(provider, response){
   	  Djn.Test.checkSuccessfulResponse("test_serverReceivingJsonStringInCharArrayCreatesSingleItemArray", response, 
		  			response.result === 1 );
	});
  }
  
}


Djn.DeserializationToGenericTypesTest = {
  testClassName : 'DeserializationToGenericTypes'
  
  ,test_GenericObject : function() {
	var obj1 = {value:"hello"};
	var obj2 = {value: {a:17,b:'bye'}};
	DeserializationToGenericTypesTest.test_GenericObject( obj1, obj2, function(provider, response){
		Djn.Test.checkSuccessfulResponse("test_GenericObject", response,
				response.result.value.a === 17 &&
				response.result.value.b === 'bye'
		);
	});
  }
  ,test_GenericComplexObject : function() {
	var obj = [{value: [{value:'hello'}, null]}, null];
	DeserializationToGenericTypesTest.test_GenericComplexObject( obj, function(provider, response){
		Djn.Test.checkSuccessfulResponse("test_GenericComplexObject", response,
				response.result[0].value[0].value === 'hello' &&
				response.result[0].value[1] === null &&
				response.result[1] === null
		);
	});
  }
  ,test_MapWithGenericValue : function() {
	var obj = {a: {value:'hello'}, b: {value:'bye'}};
	DeserializationToGenericTypesTest.test_MapWithGenericValue( obj, function(provider, response){
		Djn.Test.checkSuccessfulResponse("test_MapWithGenericValue", response,
				response.result.a.value === 'hello' &&
				response.result.b.value === 'bye'
		);
	});
  }
  ,test_GenericCollections : function() {
	var obj1 = ["a", "b"];
	var obj2 = [ {a:1, b:'a'}, {a:2, b:'b'} ];
	DeserializationToGenericTypesTest.test_GenericCollections( obj1, obj2, function(provider, response){
		Djn.Test.checkSuccessfulResponse("test_GenericCollections", response,
				response.result[0].a === 1 &&
				response.result[0].b === 'a' &&
				response.result[1].a === 2 &&
				response.result[1].b === 'b'
		);
	});
  }
  ,test_JsonObjectInObjectContainingGenerics : function() {
	var obj = {i:84,list: ["hi", "bye"]};
	DeserializationToGenericTypesTest.test_JsonObjectInObjectContainingGenerics( obj, function(provider, response){
		Djn.Test.checkSuccessfulResponse("test_JsonObjectInObjectContainingGenerics", response,
				response.result.i === 84 &&
				response.result.list[0] === 'hi' &&
				response.result.list[1] === 'bye'
		);
	});
  }
  ,test_genericListReceivingSingleJsonObjectGeneratesSingleItemList : function() {
	var obj = {a:1,b:"a"};
	DeserializationToGenericTypesTest.test_genericListReceivingSingleJsonObjectGeneratesSingleItemList( obj, function(provider, response){
    	Djn.Test.checkSuccessfulResponse("test_genericListReceivingSingleJsonObjectGeneratesSingleItemList", response,
	    response.result[0].a === 1 &&
		response.result[0].b === 'a'
      );
	});
  }
  ,test_genericListReceivingSinglePrimitiveStringGeneratesSingleItemList : function() {
	var obj = "hi";
	DeserializationToGenericTypesTest.test_genericListReceivingSinglePrimitiveStringGeneratesSingleItemList( obj, function(provider, response){
		Djn.Test.checkSuccessfulResponse("test_genericListReceivingSinglePrimitiveStringGeneratesSingleItemList", response,
    		response.result[0] === 'hi'
		);
	});
  }
}

Djn.ServerMethodParametersReceptionTest = {
  testClassName : 'ServerMethodParametersReceptionTest',
  
/* */
//  test_serverReceivingJavascriptDateAsJavaDate : function() {
//    var date = new Date();
//    date.setYear( 1915 );
//    date.setMonth( 5 );
//    date.setDate( 25 );
//    date.setHours(13);
//    date.setMinutes( 55 );
//    date.setSeconds( 28 );
//    ServerMethodParametersReceptionTest.test_serverReceivingJavascriptDateAsJavaDate(date, function(provider, response) {
//      debugger;
//      Djn.Test.checkSuccessfulResponse( "test_serverReceivingJavascriptDateAsJavaDate", response, response.result === true, "Attempt to pass Javascript date to Java Date failed");
//    });
//  },
   
  test_privateMethodCall : function() {
    ServerMethodParametersReceptionTest.test_privateMethodCall(function(provider, response) {
      Djn.Test.checkSuccessfulResponse( "test_privateMethodCall", response, response.result, response.result);
    });
  },
   
  test_privateStaticMethodCall : function() {
    ServerMethodParametersReceptionTest.test_privateStaticMethodCall(function(provider, response) {
      Djn.Test.checkSuccessfulResponse( "test_privateStaticMethodCall", response, response.result, response.result);
    });
  },
   
  test_serverReceivingNoArguments : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingNoArguments(function(provider, response) {
      Djn.Test.checkSuccessfulResponse( "test_serverReceivingNoArguments", response, response.result === 'noArgumentsMethod called', response.result);
    });
  },

  test_serverReceivingOneParameter : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingOneParameter( 99,
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReceivingOneParameter", response, response.result === (99+1), response.result);
      }
    );
  },

  test_serverReceivingManyParameters : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingManyParameters( 33, 'a_value',
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReceivingManyParameters", response, response.result === 'a_value&&33', response.result);
      }
    );
  },


  test_serverMethodWithNoAnnotation : function() {
    ServerMethodParametersReceptionTest.test_serverMethodWithNoAnnotation( 33, 'a_value',
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverMethodWithNoAnnotation", response, response.result === 'a_value&&33', response.result);
      }
    );
  },

  test_serverReceivingParametersOfAllPrimitiveAndWrapperTypesExceptLongCorrectly : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingParametersOfAllPrimitiveAndWrapperTypesExceptLongCorrectly(
        JAVA_MAX_BYTE, JAVA_MAX_SHORT, JAVA_MAX_INT, JAVA_MAX_FLOAT, JAVA_MAX_DOUBLE, true, 'a',
        JAVA_MIN_BYTE, JAVA_MIN_SHORT, JAVA_MIN_INT, JAVA_MIN_FLOAT, JAVA_MIN_DOUBLE, false, 'b', JAVA_MIN_DOUBLE,
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReceivingParametersOfAllPrimitiveAndWrapperTypesExceptLongCorrectly", response, response.result === 'ok', response.result);
      }
    );    
  }, 
  
  test_serverReceivingJsonNullInString : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingJsonNullInString( null,
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReceivingJsonNullInString", response, response.result);
      }
    );
  },

  test_serverReceivingUniqueParameterNull : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingUniqueParameterNull( null,
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReceivingUniqueParameterNull", response, response.result === 'ok', response.result);
      }
    );
  },
  
  test_serverReceivingSeveralParametersWithTheLastOneNull : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingSeveralParametersWithTheLastOneNull( 'a', 'b', null,
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReceivingSeveralParametersWithTheLastOneNull", response, response.result === 'ok', response.result);
      }
    );
  },

  test_serverReceivingJsonStringWithNewLineCharacters : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingJsonStringWithNewLineCharacters( '\r\n',
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReceivingJsonStringWithNewLineCharacters", response, response.result === '\r\n', response.result);
      }
    );
  },

  test_serverReceivingJsonStringWithSpecialCharacters : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingJsonStringWithSpecialCharacters( '"\\/\b\f\n\r\t', //'a\nb\rc\r\nd',
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReceivingJsonStringWithSpecialCharacters", response, response.result === '"\\/\b\f\n\r\t', response.result);
      }
    );
  },

  test_serverReceivingJsonStringWithEscapedCharacters : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingJsonStringWithEscapedCharacters( '\u0050',
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReceivingJsonStringWithEscapedCharacters", response, response.result === '\u0050', response.result);
      }
    );
  },

  test_serverReceivingSeveralParametersOneOfThemNull : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingSeveralParametersOneOfThemNull( 'a', null, 'b',
      function(provider, response) {
        Djn.Test.checkSuccessfulResponse( "test_serverReceivingSeveralParametersOneOfThemNull", response, response.result === 'ok', response.result);
      }
    );
  },

  test_serverReceivingJsonArrayOfPrimitiveEmptyInPrimitiveArray : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingJsonArrayOfPrimitiveEmptyInPrimitiveArray([], function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingJsonArrayOfPrimitiveEmptyInPrimitiveArray", response, response.result, response.result);
    });
  },
  
  test_serverReceivingJsonArrayNullInPrimitiveArray : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingJsonArrayNullInPrimitiveArray(null, function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingJsonArrayNullInPrimitiveArray", response, response.result, response.result);
    });
  },
  
  test_serverReceivingJsonArrayEmptyInStringArray : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingJsonArrayEmptyInStringArray([], function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingJsonArrayEmptyInStringArray", response, response.result, response.result);
    });
  },

  test_serverReceivingNullStringArray : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingNullStringArray(null, function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingNullStringArray", response, response.result, response.result);
    });
  },

  test_serverReceivingNullForAPrimitive : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingNullForAPrimitive(null, function(provider, response){
      Djn.Test.checkServerErrorResponse("test_serverReceivingNullForAPrimitive", response, 'IllegalArgumentException');
    });
  },
  
  test_serverReceivingNullValueForAValueInAPrimitiveArrayArgument : function() {
	ServerMethodParametersReceptionTest.test_serverReceivingNullValueForAValueInAPrimitiveArrayArgument([1,null], function(provider, response){
	  Djn.Test.checkServerErrorResponse("test_serverReceivingNullValueForAValueInAPrimitiveArrayArgument", response, 'IllegalArgumentException');
	});
  },
	  
  test_serverReceivingStringInIntPrimitive : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingStringInIntPrimitive('a string', function(provider, response){
      Djn.Test.checkServerErrorResponse("test_serverReceivingStringInIntPrimitive", response, "IllegalArgumentException");
    });
  },
  
  test_serverReceivingStringRepresentingValidIntInIntPrimitive : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingStringRepresentingValidIntInIntPrimitive('999', function(provider, response){
      Djn.Test.checkServerErrorResponse("test_serverReceivingStringRepresentingValidIntInIntPrimitive", response, "IllegalArgumentException");
    });
  },
  
  test_serverReceivingJsonStringWithOneCharInCharPrimitive : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingJsonStringWithOneCharInCharPrimitive('a', function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingJsonStringWithOneCharInCharPrimitive", response, response.result === 'a', "Expected to receive 'a', received '" + response.result + "'");
    });
  },

  test_serverReceivingJsonStringWithSeveralCharsInCharPrimitive : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingJsonStringWithSeveralCharsInCharPrimitive('ab', function(provider, response){
      Djn.Test.checkServerErrorResponse("test_serverReceivingJsonStringWithSeveralCharsInCharPrimitive", response, 'IllegalArgumentException');
    });
  },

  test_serverReceivingJsonNumberInValidCharRangeInCharObject : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingJsonNumberInValidCharRangeInCharObject(532, function(provider, response){
      Djn.Test.checkServerErrorResponse("test_serverReceivingJsonNumberInValidCharRangeInCharObject", response, 'IllegalArgumentException');
    });
  },

  test_serverReceivingCharFromNumberTooBig : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingCharFromNumberTooBig(55555, function(provider, response){
      Djn.Test.checkServerErrorResponse("test_serverReceivingCharFromNumberTooBig", response, 'IllegalArgumentException');
    });
  },

  test_serverReceivingCharFromNumberTooSmall : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingCharFromNumberTooSmall(-55555, function(provider, response){
      Djn.Test.checkServerErrorResponse("test_serverReceivingCharFromNumberTooSmall", response, 'IllegalArgumentException');
    });
  },

  test_serverReceivingByteFromANumberTooBig : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingByteFromANumberTooBig(JAVA_MAX_BYTE+1, function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingByteFromANumberTooBig", response, response.result !== JAVA_MAX_BYTE+1, "We expected to receive something different from what we sent, but received '" + response.result + "'");
    });
  },

  test_serverReceivingByteFromANumberTooSmall : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingByteFromANumberTooSmall(JAVA_MIN_BYTE-1, function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingByteFromANumberTooSmall", response, response.result !== JAVA_MIN_BYTE-1, "We expected to receive something different from what we sent, but received '" + response.result + "'");
    });
  },

  test_serverReceivingJsonNumberInBigDecimal : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingJsonNumberInBigDecimal(3.2, function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingJsonNumberInBigDecimal", response, response.result, "We expected to receive something different from what we sent, but received '" + response.result + "'");
    });
  },

  test_serverReceivingJsonStringInBigDecimal : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingJsonStringInBigDecimal("3.33", function(provider, response){
      Djn.Test.checkServerErrorResponse("test_serverReceivingJsonStringInBigDecimal", response, 'IllegalArgumentException' );
    });
  },

  test_serverReceivingJsonNumberInBigInteger : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingJsonNumberInBigInteger(92, function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingJsonNumberInBigInteger", response, response.result, "We expected to receive something different from what we sent, but received '" + response.result + "'");
    });
  },

  test_serverReceivingJsonStringInBigInteger : function() {
    ServerMethodParametersReceptionTest.test_serverReceivingJsonStringInBigInteger("88", function(provider, response){
      Djn.Test.checkServerErrorResponse("test_serverReceivingJsonStringInBigInteger", response, 'IllegalArgumentException' );
    });
  },

/*  
  test_serverReceivingJavascriptDate : function() {
    var date = new Date();
    date.setYear( 1991 );
    date.setMonth( 5 );
    date.setDate( 15 );
    date.setMinutes( 22 );
    date.setHours( 12 );
    date.setSeconds( 18 );
    date.setMilliseconds( 999 );
    ServerMethodParametersReceptionTest.test_serverReceivingJavascriptDate( date, function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingJavascriptDate", response, response.result === date, "We expected to receive something different from what we sent, but received '" + response.result + "'");
    });
  },
*/
 
  test_serverReceivingJsonObjectInTypedObject : function() {
    var obj = { name: 'MyPet', age : 2, fieldThatDoesNotExistsInJavaClass : 'will not be copied to Java object' };
    ServerMethodParametersReceptionTest.test_serverReceivingJsonObjectInTypedObject(obj, function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingJsonObjectInTypedObject", response, response.result);
    });
  },

  test_serverReceivingJsonArrayOfObjectsInTypedArray : function() {
    var obj = [{ name: 'name1', age : 1}, {name: 'name2', age : 2}, null];
    ServerMethodParametersReceptionTest.test_serverReceivingJsonArrayOfObjectsInTypedArray(obj, function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingJsonArrayOfObjectsInTypedArray", response, 
    		  response.result[0].name === 'name1' && 
    		  response.result[0].age === 1 &&
    		  response.result[1].name === 'name2' && 
    		  response.result[1].age === 2 &&
    		  response.result[2] === null );
    });
  },

  test_serverReceivingJsonArrayOfPrimitiveInPrimitiveArray: function(){
    ServerMethodParametersReceptionTest.test_serverReceivingJsonArrayOfPrimitiveInPrimitiveArray([5, 3], function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingJsonArrayOfPrimitiveInPrimitiveArray", response, response.result, response.result);
    });
  },
  
  test_serverReceivingJsonArrayInArray: function(){
    ServerMethodParametersReceptionTest.test_serverReceivingJsonArrayInArray(['value1', 'value2'], function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingJsonArrayInArray", response, response.result, response.result);
    });
  },
    
  test_serverReceivingJsonArrayInArrayHavingANullValue: function(){
    ServerMethodParametersReceptionTest.test_serverReceivingJsonArrayInArrayHavingANullValue(['value1', null, 'value3'], function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingJsonArrayInArrayHavingANullValue", response, response.result, response.result);
    });
  },
    
  test_serverReceivingOneElementIntArrayInIntPrimitive: function(){
    ServerMethodParametersReceptionTest.test_serverReceivingOneElementIntArrayInIntPrimitive([999], function(provider, response){
      Djn.Test.checkServerErrorResponse("test_serverReceivingOneElementIntArrayInIntPrimitive", response, "IllegalArgumentException");
    });
  },
    
  test_serverReceivingMultiElementIntArrayInIntPrimitive: function(){
    ServerMethodParametersReceptionTest.test_serverReceivingMultiElementIntArrayInIntPrimitive([30, 40], function(provider, response){
      Djn.Test.checkServerErrorResponse("test_serverReceivingMultiElementIntArrayInIntPrimitive", response, 'IllegalArgumentException');
    });
  },
    
  test_serverReceivingDoubleArray: function(){
    var values = [3.2, 4.5, 6.0];
    ServerMethodParametersReceptionTest.test_serverReceivingDoubleArray(values, function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingDoubleArray", response, response.result === 13.7);
    });
  },
    
  test_serverReceivingPrimitiveDoubleArray: function(){
    var values = [3.2, null, 6.0];
    ServerMethodParametersReceptionTest.test_serverReceivingPrimitiveDoubleArray(values, function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingPrimitiveDoubleArray", response, response.result === 9.2);
    });
  },

  test_serverReceivingVeryComplexObject: function(){
    var obj = {
      ints: [33, null],
      myComplexObject: {
        name: 'MyPet',
        age: undefined // We expect 'undefined' to be ignored!
      },
      moreComplexObjects: [null, {
        name: null,
        age: 5
      }]
    };
    ServerMethodParametersReceptionTest.test_serverReceivingVeryComplexObject(obj, function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverReceivingVeryComplexObject", response, response.result);
    });
  },
  
  test_serverMethodWithJsonArrayParameterReceivingOneParameter : function() {
    var param = false;
    ServerMethodParametersReceptionTest.test_serverMethodWithJsonArrayParameterReceivingOneParameter(param, function(provider, response){
      Djn.Test.checkSuccessfulResponse("test_serverMethodWithJsonArrayParameterReceivingOneParameter", response, response.result === param);
    });
  }
  ,

  test_serverMethodWithJsonArrayParameterReceivingMultipleParameters : function() {
	var param = false;
	var param2 = "param2";
	var param3 = 3;
	ServerMethodParametersReceptionTest.test_serverMethodWithJsonArrayParameterReceivingMultipleParameters([param, param2, param3], function(provider, response){
	  Djn.Test.checkSuccessfulResponse("test_serverMethodWithJsonArrayParameterReceivingMultipleParameters", response, response.result === 100);
    });
  }
};


Djn.DirectStoreTest = {
  testClassName : 'DirectStoreTest',
  
  test_load : function() {
    var myStore = new Ext.data.DirectStore( {
      paramsAsHash:false,
      root:'',
      directFn: DirectStoreTest.test_load,
      
      root:'items',
      paramOrder: [ 'extraParam'],
      idProperty:'id',
      remoteSort:true,
      fields: [
        {name: 'id' },
        {name: 'name'}
      ],
      listeners: {
        load: function(s, records){
          var error = false;
          if (records.length !== 2) 
            error = true;
          else {
            var v1 = records[0].data;
            var v2 = records[1].data;
          
            if (v1.id !== 99 || v1.name !== 'name1') {
              error = true
            }
            if (v2.id !== 100 || v2.name !== 'name2') {
              error = true
            }
          }
          
          Djn.Test.check( "test_load", !error, "Found errors" );
        }
      }
    });
    myStore.proxy.extraParams.extraParam = "aValue";
    myStore.load({
      params: {}
    });
  },
  
  
  test_load2 : function() {
    var myStore = new Ext.data.DirectStore( {
      paramsAsHash:false,
      root:'items',
      totalProperty : 'rowCount',
      directFn: DirectStoreTest.test_load2,
      
      idProperty:'id',
      remoteSort:true,
      fields: [
        {name: 'id' },
        {name: 'name'}
      ],
      listeners: {
        load: function(s, records){
          var error = false;
                    
          if (records.length !== 2) 
            error = true;
          else if ( myStore.getTotalCount() != 347 ) {
            error = true;
          }
          else {
            var v1 = records[0].data;
            var v2 = records[1].data;
          
            if (v1.id !== 99 || v1.name !== 'name1') {
              error = true
            }
            if (v2.id !== 100 || v2.name !== 'name2') {
              error = true
            }
          }
          
          Djn.Test.check( "test_load2", !error, "Found errors" );
        }
      }    
    });
    myStore.load({
    });
  },
  
  test_loadWithArguments : function() {
	    var myStore = new Ext.data.DirectStore( {
	      paramsAsHash:false,
	      root:'items',
	      paramOrder: [ 'argPassedInLoadCall', 'argPassedInBeforeLoadEvent', 'argFromExtraParams'],
	      totalProperty : 'rowCount',
	      directFn: DirectStoreTest.test_loadWithArguments,
	      
	      idProperty:'id',
	      fields: [
	        {name: 'id' },
	        {name: 'name'}
	      ],
	      listeners: {
	        beforeload : function(store, options) {
	          options._params.argPassedInBeforeLoadEvent = false
	        },
	        load: function(s, records){
	          Djn.Test.check( "test_loadWithArguments", records.length === 2, "If there is an error, this will never be called: a timeout should happen if there is some error!" );
	        }
	      }
	    });

	    myStore.proxy.extraParams = {argFromExtraParams:'arg3'}; 
	    myStore.load({
	      params: {
	        argPassedInLoadCall: 34
	      }
	    });
	  }
  ,  

  test_loadWithArgumentsUsingClass : function() {
	    var myStore = new Ext.data.DirectStore( {
	      paramsAsHash:true,
	      root:'items',
	      totalProperty : 'rowCount',
	      directFn: DirectStoreTest.test_loadWithArgumentsUsingClass,
	      
	      idProperty:'id',
	      fields: [
	        {name: 'id' },
	        {name: 'name'}
	      ],
	      listeners: {
	        beforeload : function(store, options) {
	          options._params.argPassedInBeforeLoadEvent = false
	        },
	        load: function(s, records){
	          Djn.Test.check( "test_loadWithArgumentsUsingClass", records.length === 2, "If there is an error, this will never be called: a timeout should happen if there is some error!" );
	        }
	      }
	    });

	    myStore.proxy.extraParams = {argFromExtraParams:'arg3'}; 
	    myStore.load({
	      params: {
	        argPassedInLoadCall: 34
	      }
	    });
	  }
, 
 
  test_loadWithArgumentsWithDirectJsonHandling : function() {
    var myStore = new Ext.data.DirectStore( {
      paramsAsHash:true,
      root:'items',
      // paramOrder: ['argPassedInLoadCall', 'argPassedInBeforeLoadEvent'], // Not needed when paramsAsHash:true
      totalProperty : 'rowCount',
      directFn: DirectStoreTest.test_loadWithArgumentsWithDirectJsonHandling,
      
      idProperty:'id',
      fields: [
        {name: 'id' },
        {name: 'name'}
      ],
      listeners: {
        beforeload : function(store, options) {
          options._params.argPassedInBeforeLoadEvent = false
        },
        load: function(s, records){
          Djn.Test.check( "test_loadWithArgumentsWithDirectJsonHandling", records.length === 2, "If there is an error, this will never be called: a timeout should happen if there is some error!" );
        }
      }
    });
    myStore.proxy.extraParams = {argFromBaseParams:'aValue'};
    myStore.load({
      params: {
        argPassedInLoadCall: 34
      }
    });
  }
  , 
  test_simulatePassingDynamicParams : function() {
    var myStore = new Ext.data.DirectStore( {
      paramsAsHash:false,
      root:'items',
      paramOrder: ['param2', 'dynamicParams'],
      totalProperty : 'rowCount',
      directFn: DirectStoreTest.test_simulatePassingDynamicParams,
      
      idProperty:'id',
      remoteSort:true,
      fields: [
        {name: 'id' },
        {name: 'name'}
      ],
      listeners: {
        load: function(s, records){
          Djn.Test.check( "test_simulatePassingDynamicParams", true, "If there is an error, this will never be called: a timeout should happen if there is some error!" );
        }
      }           
    });
    myStore.load({
      params: {
        param2: true, 
        dynamicParams : [
          {param:'dyn1', value:'55'}, 
          {param:'dyn2', value:'dyn2Value'}
          // ... 
        ]
      }
    });
  }
}


Djn.FormTest = {
  testClassName: 'FormTest',

  createForm : function(submitHandler) {
    var form = new Ext.FormPanel({      
      url: Djn.test.PROVIDER_BASE_URL,
      frame: true,
      width: 450,
      defaults: {
        width: 230
      },
      defaultType: 'textfield',
      api : {
    	  submit : submitHandler
      },
      items: [ input1 = new Ext.form.TextField(
        {
          fieldLabel: 'Value 1',
          name: 'input1'
        }),
        input2 = new Ext.form.TextField({
          fieldLabel: 'Value 2',
          name: 'input2'
        })
      ]
    });
  
    form.hide();
    form.render("simpleForm");
    form.input1 = input1;

    return form;
  },
  
  test_formPostForNonAnnotatedMethod : function() {
	var form = Djn.FormTest.createForm(FormTest.test_formPostForNonAnnotatedMethod);
	form.submit({
      success: function(form, response) {
        Djn.Test.checkSuccessfulResponse("test_formPostForNonAnnotatedMethod", response, response.result.message == 'ok');
      },
      failure: function(form, response) {
    	Djn.Test.fail("test_formPostForNonAnnotatedMethod", "Error!" );
      }
	}
   );
  }
  ,
  test_handleForm : function() {
    var form = Djn.FormTest.createForm(FormTest.test_handleForm);
    // Test potentially "evil" characters, "=" and "&"
    form.input1.setValue( "value=&1" );
    
	form.submit({
	      success: function(form, response) {
	        Djn.Test.checkSuccessfulResponse("test_handleForm", response, response.result.message == 'value=&1');
	      },
	      failure: function(form, response) {
	    	Djn.Test.fail("test_handleForm", "Error!" );
	      }
		}
	   );
  }
  ,
  test_handleFormWithBaseParams : function() {
	    var form = Djn.FormTest.createForm(FormTest.test_handleFormWithBaseParams);
	    form.getForm().baseParams = {baseParam:5};
	    // Test potentially "evil" characters, "=" and "&"
	    form.input1.setValue( "value=&1" );
	    
		form.submit({
		      success: function(form, response) {
		        Djn.Test.checkSuccessfulResponse("test_handleFormWithBaseParams", response, response.result.message == '5');
		      },
		      failure: function(form, response) {
		    	Djn.Test.fail("test_handleFormWithBaseParams", "Error!" );
		      }
			}
		   );
	  }
	  ,
  test_handleFormCausingServerException : function() {
    var form = Djn.FormTest.createForm(FormTest.test_handleFormCausingServerException);
	  // Test potentially "evil" characters, "=" and "&"
	  form.input1.setValue( "programmatic value" );

	  form.submit({
        success: function(form, response) {
           Djn.Test.fail("test_handleFormCausingServerException", "Expected server error!" );
	    },
	    failure: function(form, response) {
	      // var expectedFailureType = "exception"; // Before ExtJs 4.1.0
	      var expectedFailureType = "connect"; // Starting in ExtJs 4.1.0
		   Djn.Test.check( "test_handleFormCausingServerException", response.failureType == expectedFailureType, "Expected a server error" );
	    }
    });
  }
	  
}


Djn.PollTest = {
  testClassName: 'PollTest',
  
  test_pollForNonAnnotatedMethod : function() {
    var timesCalled = 0;
    var pollingProvider = Ext.Direct.addProvider({
      type: 'polling',
      interval: 100,
      url: Djn.test.POLLING_URLS.test_pollForNonAnnotatedMethod,
      listeners: {
        data: function(provider, event) {
          Ext.log( 'test_pollWithNoBaseParams');
          timesCalled++;
          if (timesCalled === 10) {
            pollingProvider.disconnect();
            Djn.Test.check('test_pollForNonAnnotatedMethod', event.data !== undefined && event.data.indexOf('Ok') === 0, "Expected to receive 'Ok' as event.data");
          }
        }
      }
    });
    pollingProvider.connect();
  },
  
  test_pollWithNoBaseParams: function(){
    var timesCalled = 0;
    var pollingProvider = Ext.Direct.addProvider({
      type: 'polling',
      interval: 100,
      url: Djn.test.POLLING_URLS.test_pollWithNoBaseParams,
      listeners: {
        data: function(provider, event) {
          Ext.log( 'test_pollWithNoBaseParams');
          timesCalled++;
          if (timesCalled === 10) {
            pollingProvider.disconnect();
            Djn.Test.check('test_pollWithNoBaseParams', event.data !== undefined && event.data.indexOf('Ok') === 0, "Expected to receive 'Ok' as event.data");
          }
        }
      }
    });
    pollingProvider.connect();
  },

  test_pollCausingServerError: function(){
    var timesCalled = 0;
    var pollingProvider = Ext.Direct.addProvider({
      type: 'polling',
      interval: 100,
      url: Djn.test.POLLING_URLS.test_pollCausingServerError,
      listeners: {
        data: function(provider, event) {
          Ext.log( 'test_pollCausingServerError (' + timesCalled + ')');
          timesCalled++;
          if (timesCalled === 2) {
            pollingProvider.disconnect();
            var e = event.serverException;
            Djn.Test.check('test_pollCausingServerError', 
            		event.data === undefined && 
            		event.message.indexOf('RuntimeException') === 0 &&
            		e.rootException.message === "root message, boy" &&
            		e.rootException.type === 'java.lang.NullPointerException' && 
            		e.exception.message === "An error text" &&
            		e.exception.type === 'java.lang.RuntimeException' && 
                    e.exceptions.length === 3 &&
            		e.exceptions[0].message === "An error text" &&
            		e.exceptions[0].type === 'java.lang.RuntimeException' &&
              		e.exceptions[1].message === null &&
               		e.exceptions[1].type === 'java.lang.Exception' &&
               		e.exceptions[2].message === "root message, boy" &&
               		e.exceptions[2].type === 'java.lang.NullPointerException'
            		,"Expected to receive an exception, but error message was " + event.message);
          }
        }
      }
    });
    pollingProvider.connect();
  },

  test_pollWithBaseParams: function(){
    var timesCalled = 0;
    var pollingProvider = Ext.Direct.addProvider({
      type: 'polling',
      interval: 100,
      url: Djn.test.POLLING_URLS.test_pollWithBaseParams,
      baseParams : {
        arg1 : 'value'
      },
      listeners: {
        data: function(provider, event) {
          Ext.log( 'test_pollWithBaseParams');
          timesCalled++;
          if (timesCalled === 10) {
            pollingProvider.disconnect();
            Djn.Test.check('test_pollWithBaseParams', event.data !== undefined && event.data === 'arg1=value', "Expected to receive 'arg1=value' as event.data");
          }
        }
      }
    });
    pollingProvider.connect();
  }
}

Djn.CustomGsonBuilderHandlingTest = {
  testClassName : "CustomGsonBuilderHandlingTest", 
  
  test_specialGregorianCalendarDeserialization : function() {
    var aDate = {year: 2005, month: 3, day: 20};
    CustomGsonBuilderHandlingTest.test_specialGregorianCalendarDeserialization(aDate, function(result, response){
      Djn.Test.checkSuccessfulResponse("test_specialGregorianCalendarDeserialization", response, response.result === true);
    });
  },

  test_specialGregorianCalendarSerialization : function() {
    CustomGsonBuilderHandlingTest.test_specialGregorianCalendarSerialization(function(result, response){
      Djn.Test.checkSuccessfulResponse("test_specialGregorianCalendarSerialization", response, result.year === 2007 && result.month === 5 && result.day === 29);
    });
  }
}

Djn.NamespaceTest = {
  testClassName: 'NamespaceTest',
  
  test_namespacedAction : function() {
    Djn.actionsNamespace.NamespaceTest.test_namespacedAction(function(result, response){
      Djn.Test.checkSuccessfulResponse("test_namespacedAction", response, result === true);
    });
  }
}

Djn.CustomRegistryConfiguratorHandlingTest = {
  testClassName : 'CustomRegistryConfiguratorHandlingTest',
  
  test_programmaticMethod :function() {
    Djn.programmaticNamespace.MyCustomRegistryConfiguratorHandlingTest.myProgrammaticMethod( 'programmatic', function(result, response) {
      Djn.Test.checkSuccessfulResponse("test_programmaticMethod", response, result === 'programmatic');
    });
  },

  test_programmaticPollMethod : function() {
    var timesCalled = 0;
    var pollingProvider = Ext.Direct.addProvider({
      type: 'polling',
      interval: 300,
      baseParams : {
        myParameter : 'myValue'
      },
      url: Djn.programmaticNamespace.POLLING_URLS.myProgrammaticPollMethod,
      listeners: {
        data: function(provider, event) {
          Ext.log( 'test_programmaticPollMethod');
          pollingProvider.disconnect();
          timesCalled++;
          if( timesCalled == 1 ) {
            Djn.Test.check('test_programmaticPollMethod', event.data === 'ok', "Expected to receive 'ok' as event.data");
          }
        }
      }
    });
    pollingProvider.connect();
  }
  
}

Djn.MethodsInBaseClassCorrectlyScannedTest = {
  testClassName : 'MethodsInBaseClassCorrectlyScannedTest',
  
  test_methodsInBaseClassCorrectlyScanned :function() {
    MethodsInBaseClassCorrectlyScannedTest.test_serverReturningNothing( function(result, response) {
        Djn.Test.checkSuccessfulResponse( "test_methodsInBaseClassCorrectlyScanned", response, response.result === null, response.result);
    });
  }
},

Djn.CdiApplicationScopedTest = {
   test_getCdiApplicationData : function() {
      CdiApplicationScopedActionTest.resetApplicationData( function(result,response) {
          var count = 0;
          var calls = 0;
          var found1, found2, found3;
          var expectedCount = 3;
          while( count < expectedCount ) {
             CdiApplicationScopedActionTest.test_getCdiApplicationData( function(result, response) {
              found1 = found1 || response.result == 1;
              found2 = found2 || response.result == 2;
              found3 = found3 || response.result == 3;
              calls++;
              if( calls == expectedCount ) {
                 Djn.Test.check( "test_getCdiApplicationData", found1 && found2 && found3, "The server did not return 1 & 2 & 3" );
              }
            });
            count++;
          }
      });   
    }
},

Djn.CdiSessionScopedTest = {
   test_getCdiSessionData : function() {
      CdiSessionScopedActionTest.resetSessionData( function(result,response) {
          var count = 0;
          var calls = 0;
          var found1, found2, found3;
          var expectedCount = 3;
          while( count < expectedCount ) {
             CdiSessionScopedActionTest.test_getCdiSessionData( function(result, response) {
              found1 = found1 || response.result == 1;
              found2 = found2 || response.result == 2;
              found3 = found3 || response.result == 3;
              calls++;
              if( calls == expectedCount ) {
                 Djn.Test.check( "test_getCdiSessionData", found1 && found2 && found3, "The server did not return 1 & 2 & 3" );
              }
            });
            count++;
          }
      });   
    }
},


Djn.SpringApplicationScopedTest = {
   test_getSpringApplicationData : function() {
      singletonBean.resetApplicationData( function(result,response) {
          var count = 0;
          var calls = 0;
          var found1, found2, found3;
          var expectedCount = 3;
          while( count < expectedCount ) {
            singletonBean.test_getSpringApplicationData( function(result, response) {
              found1 = found1 || response.result == 1;
              found2 = found2 || response.result == 2;
              found3 = found3 || response.result == 3;
              calls++;
              if( calls == expectedCount ) {
                 Djn.Test.check( "test_getSpringApplicationData", found1 && found2 && found3, "The server did not return 1 & 2 & 3" );
              }
            });
            count++;
          }
      });   
    }
},

Djn.SpringSessionScopedTest = {
   test_getSpringSessionData : function() {
      sessionBean.resetSessionData( function(result,response) {
          var count = 0;
          var calls = 0;
          var found1, found2, found3;
          var expectedCount = 3;
          while( count < expectedCount ) {
            sessionBean.test_getSpringSessionData( function(result, response) {
              found1 = found1 || response.result == 1;
              found2 = found2 || response.result == 2;
              found3 = found3 || response.result == 3;
              calls++;
              if( calls == expectedCount ) {
                 Djn.Test.check( "test_getSpringSessionData", found1 && found2 && found3, "The server did not return 1 & 2 & 3" );
              }
            });
            count++;
          }
      });   
    }
},


Djn.ApplicationStatefulActionTest = {
  testClassName : 'ApplicationStatefulActionTest',
  
  test_getApplicationData : function() {
	ApplicationStatefulActionTest.resetApplicationData( function(result,response) {
	    var count = 0;
	    var calls = 0;
	    var found1, found2, found3;
	    var expectedCount = 3;
	    while( count < expectedCount ) {
	      ApplicationStatefulActionTest.test_getApplicationData( function(result, response) {
	        found1 = found1 || response.result == 1;
	        found2 = found2 || response.result == 2;
	        found3 = found3 || response.result == 3;
	        calls++;
	        if( calls == expectedCount ) {
	           Djn.Test.check( "test_getApplicationData", found1 && found2 && found3, "The server did not return 1 & 2 & 3" );
	        }
	      });
	      count++;
	    }
	});	
  },
  test_pollForApplicationScopedAction: function(){
    var timesCalled = 0;
    var pollingProvider = Ext.Direct.addProvider({
      type: 'polling',
      interval: 300,
      url: Djn.test.POLLING_URLS.test_pollForApplicationScopedAction,
      listeners: {
        data: function(provider, event) {
          timesCalled++;
          var data = event.data;
          if (timesCalled === 10) {
            pollingProvider.disconnect();
            Djn.Test.check('test_pollForApplicationScopedAction', data > 1, data);
          }
        }
      }
    });
    pollingProvider.connect();
  }
  
},

Djn.SessionStatefulActionTest = {
  testClassName : 'SessionStatefulActionTest',
  
  test_getSessionData : function() {
	SessionStatefulActionTest.resetSessionData( function(result,response) {
	    var count = 0;
	    var calls = 0;
	    var found1, found2;
	    var expectedCount = 2;
	    while( count < expectedCount ) {
	      SessionStatefulActionTest.test_getSessionData( function(result, response) {
	        found1 = found1 || response.result == 1;
	        found2 = found2 || response.result == 2;
	        calls++;
	        if( calls == expectedCount ) {
	           Djn.Test.check( "test_getSessionData", found1 && found2, "The server did not return 1 & 2" );
	        }
	      });
	      count++;
	    }
	});	
  },
  test_pollForSessionScopedAction: function(){
    var timesCalled = 0;
    var pollingProvider = Ext.Direct.addProvider({
      type: 'polling',
      interval: 100,
      url: Djn.test.POLLING_URLS.test_pollForSessionScopedAction,
      listeners: {
        data: function(provider, event) {
          timesCalled++;
          var data = event.data;
          if (timesCalled === 10) {
            pollingProvider.disconnect();
            Djn.Test.check('test_pollForSessionScopedAction', data > 1, data);
          }
        }
      }
    });
    pollingProvider.connect();
  }
  
},


Djn.ClassWithMultipleActionsTest = {
  testClassName : 'ClassWithMultipleActionsTest',
  
  test_callDifferentActionsForSameJavaClass : function() {
    action1.getValue( function(result, response) {
      var value = result;
      action2.getValue( function(result, response) {
        Djn.Test.checkSuccessfulResponse( "test_callDifferentActionsForSameJavaClass", response, result == 25 && value == 25, response.result);
      });
    });
  }
},

Djn.ActionClassImplementingAnInterfaceTest = {
  testClassName: 'ActionClassImplementingAnInterfaceTest',
  
  test_callMethodInClassImplementingAnInterface : function() {
    ActionClassImplementingAnInterfaceTest.callMethodInClassImplementingAnInterface( "Peter", function( result, response) {
      Djn.Test.checkSuccessfulResponse( "test_callMethodInClassImplementingAnInterface", response, result == "Hello, Peter", response.result);
    });
  }
}

