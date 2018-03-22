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

package com.softwarementors.extjs.djn.test;

import java.math.BigDecimal;
import java.math.BigInteger;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;
import com.softwarementors.extjs.djn.test.helper.ComplexObject;
import com.softwarementors.extjs.djn.test.helper.VeryComplexObject;

public class ServerMethodParametersReceptionTest {

  public ServerMethodParametersReceptionTest() {
    // Do nothing
  }
  
  @DirectMethod
  public boolean test_serverMethodWithJsonArrayParameterReceivingOneParameter( JsonArray data ) {
    assert data != null;
    
    if( data.size() != 1) {
      throw new DirectTestFailedException( "We expected a json array with just one element");
    }
    
    JsonElement element = data.get(0);
    if( !element.isJsonPrimitive()) {
      throw new DirectTestFailedException( "We expected the first json item to be a json primitive");
    }
   
    JsonPrimitive primitive = (JsonPrimitive)element;
    if( !primitive.isBoolean()) {
      throw new DirectTestFailedException( "We expected a primitive json boolean element");
    }
    if( primitive.getAsBoolean()) {
      throw new DirectTestFailedException( "We expected a false value");
    }
    
    return primitive.getAsBoolean();
  }
  
  @DirectMethod
  public int test_serverMethodWithJsonArrayParameterReceivingMultipleParameters( JsonArray data) {
    assert data != null;
    
    if( data.size() != 1) {
      throw new DirectTestFailedException( "We expected a json array with one element");
    }
    
    JsonElement element = data.get(0);
    if( !element.isJsonArray()) {
      throw new DirectTestFailedException( "We expected the first json item to be a json array");
    }
    
    JsonArray parameters = element.getAsJsonArray();
    if( parameters.size() != 3) {
      throw new DirectTestFailedException( "We expected a json array with three element");
    }
    
    element = parameters.get(0);
    if( !element.isJsonPrimitive()) {
      throw new DirectTestFailedException( "We expected the first json item to be a json primitive");
    }
    JsonPrimitive primitive = (JsonPrimitive)element;
    if( !primitive.isBoolean()) {
      throw new DirectTestFailedException( "We expected a primitive json boolean element");
    }
    if( primitive.getAsBoolean()) {
      throw new DirectTestFailedException( "We expected a false value");
    }

    element = parameters.get(1);
    if( !element.isJsonPrimitive()) {
      throw new DirectTestFailedException( "We expected the first json item to be a json primitive");
    }
    primitive = (JsonPrimitive)element;
    if( !primitive.isString()) {
      throw new DirectTestFailedException( "We expected a primitive json string element");
    }
    if( !primitive.getAsString().equals("param2")) {
      throw new DirectTestFailedException( "We expected a 'param2' value");
    }
    
    element = parameters.get(2);
    if( !element.isJsonPrimitive()) {
      throw new DirectTestFailedException( "We expected the first json item to be a json primitive");
    }
    primitive = (JsonPrimitive)element;
    if( !primitive.isNumber()) {
      throw new DirectTestFailedException( "We expected a primitive json number element");
    }
    if( primitive.getAsInt() != 3) {
      throw new DirectTestFailedException( "We expected a '3' value");
    }
    
    return 100;
  }
  
  @SuppressWarnings("unused") // Even though private, we call this via introspection!
  @edu.umd.cs.findbugs.annotations.SuppressWarnings(value="UPM_UNCALLED_PRIVATE_METHOD",
     justification="This method is indeed called via introspection to test that DJN can call private methods" )  
  @DirectMethod
  private static boolean djn_test_privateMethodCall() {
    return true;
  }
  
  @SuppressWarnings("unused") // Even though private, we call this via introspection!
  @edu.umd.cs.findbugs.annotations.SuppressWarnings(value="UPM_UNCALLED_PRIVATE_METHOD",
     justification="This method is indeed called via introspection to test that DJN can call private methods" )  
  @DirectMethod
  private static boolean djn_test_privateStaticMethodCall() {
    return true;
  }
  
  @DirectMethod
  public String djn_test_serverReceivingNoArguments() {
    return "noArgumentsMethod called";
  }
  
  @DirectMethod
  public int djn_test_serverReceivingOneParameter( int value ) {
    return value + 1;
  }
  
  @DirectMethod
  public String test_serverReceivingManyParameters( int arg1, String arg2 ) {
    return arg2 + "&&" + arg1;
  }
  
  public String djn_test_serverMethodWithNoAnnotation( int arg1, String arg2 ) {
    String result = arg2 + "&&" + arg1;
    return result;
  }
  
  @DirectMethod
  public String test_serverReceivingJsonStringWithNewLineCharacters( String arg ) {
    if( !arg.equals("\r\n" ) ) {
      throw new DirectTestFailedException( "We expected the method to have have the \\n and \\r characters");
    }
    
    return arg;
  }
  
  @DirectMethod
  public String test_serverReceivingJsonStringWithSpecialCharacters( String arg ) {
    if( !arg.equals("\"\\/\b\f\n\r\t" ) ) {
      throw new DirectTestFailedException( "We expected the method to have have all special characters");
    }
    
    return arg;
  }
  
  @DirectMethod
  public String test_serverReceivingJsonStringWithEscapedCharacters( String arg ) {
    if( !arg.equals("\u0050" ) ) {
      throw new DirectTestFailedException( "We expected the method to have the \u0050 encoded character");
    }
    
    return arg;
  }
  
  @DirectMethod
  public boolean djn_test_serverReceivingJsonNullInString( String arg) {
    return arg == null;
  }

  @DirectMethod
  public boolean djn_test_serverReceivingJavascriptFunction( String arg ) {
    assert arg != null;
    
    throw new DirectTestFailedException( "We expected that method should not have been called, we are sending an Javascript 'function'");
  }
  
  @DirectMethod
  public String djn_test_serverReceivingUniqueParameterUndefined( String arg) {
    assert arg != null;
    
    throw new DirectTestFailedException( "We expected that method should not have been called, we are sending an 'undefined'");
  }
  
  @DirectMethod
  public String djn_test_serverReceivingSeveralParametersWithTheLastOneUndefined( String arg1, String arg2, String arg3) {
    assert arg1 != null;
    assert arg2 != null;
    assert arg3 != null;
    
    throw new DirectTestFailedException( "We expected that method should not have been called, we are sending an 'undefined'");
  }
  
  @DirectMethod
  public String djn_test_serverReceivingSeveralParametersOneOfThemUndefined( String arg1, String arg2, String arg3) {
    assert arg1 != null;
    assert arg2 != null;
    assert arg3 != null;
    
    throw new DirectTestFailedException( "We expected that method should not have been called, we are sending an 'undefined'");
  }
  
  @DirectMethod
  public String djn_test_serverReceivingUniqueParameterNull( String arg) {
    if( arg != null )
      return "Expected arg==null";
    return "ok";
  }
  
  @DirectMethod
  public String djn_test_serverReceivingSeveralParametersWithTheLastOneNull( String arg1, String arg2, String arg3) {
    assert arg1 != null;
    assert arg2 != null;
    
    if( arg3 != null )
      return "Expected arg3==null";
    return "ok";
  }
  
  @DirectMethod
  public String djn_test_serverReceivingSeveralParametersOneOfThemNull( String arg1, String arg2, String arg3) {
    assert arg1 != null;
    assert arg3 != null;
    
    if( arg2 != null )
      return "Expected arg2==null";
    return "ok";
  }
  
  @DirectMethod
  public String djn_test_serverReceivingParametersOfAllPrimitiveAndWrapperTypesExceptLongCorrectly( byte b, short s, int i, float f, double d, boolean bo, char c, 
                                               Byte b2, Short s2, Integer i2, Float f2, Double d2, Boolean bo2, Character c2, Number n) {
    String result = "";
    if( b != Byte.MAX_VALUE )
      result += "byte, ";
    if( s != Short.MAX_VALUE )
      result += "short, ";
    if( i != Integer.MAX_VALUE )
      result += "int, ";
    if( f != Float.MAX_VALUE )
      result += "float, ";
    if( d != Double.MAX_VALUE )
      result += "double, ";
    if( bo != true )
      result += "boolean, ";
    if( c != 'a' )
      result += "char, ";    
    if( b2.byteValue() != Byte.MIN_VALUE )
      result += "Byte, ";
    if( s2.shortValue() != Short.MIN_VALUE )
      result += "Short, ";
    if( i2.intValue() != Integer.MIN_VALUE )
      result += "Integer, ";
    if( f2.floatValue() != Float.MIN_VALUE )
      result += "Float, ";
    if( d2.doubleValue() != Double.MIN_VALUE )
      result += "Double, ";
    if( bo2.booleanValue() != false )
      result += "Boolean, ";
    if( c2.charValue() != 'b' )
      result += "Character, ";
    if( n.doubleValue() != Double.MIN_VALUE )
      result += "Number, ";
    
    if( !result.equals(""))
      result = "Problems with types => " + result;
    else
      result = "ok";
    
    return result;
  }
  
  @DirectMethod
  public int djn_test_serverReceivingMoreParametersThanExpected( int value ) {
    return value;
  }
  
  @DirectMethod
  public int djn_test_serverReceivingLessParametersThanExpected( int arg1, String arg2, int arg3 ) {
    assert arg1 != Integer.MAX_VALUE; 
    assert arg2 != null;
    
    return arg3;
  }
  
  @DirectMethod
  public boolean djn_test_serverReceivingJsonArrayOfPrimitiveInPrimitiveArray( int[] values) {
    return values != null && values.length == 2 && values[0] == 5 && values[1] == 3;    
  }
  
  @DirectMethod
  public boolean djn_test_serverReceivingJsonArrayOfPrimitiveEmptyInPrimitiveArray( int[] values) {
    return values != null && values.length == 0;
  }

  @DirectMethod
  public boolean djn_test_serverReceivingJsonArrayNullInPrimitiveArray( int[] values) {
    return values == null;
  }

  @DirectMethod
  public boolean djn_test_serverReceivingJsonArrayInArray( String[] values) {
    return values != null && values.length == 2 && values[0].equals("value1") && values[1].equals("value2") ;    
  }
  
  @DirectMethod
  public boolean djn_test_serverReceivingJsonArrayInArrayHavingANullValue( String[] values) {
    return values != null && values.length == 3 && values[0].equals("value1") && values[1] == null && values[2].equals("value3") ;    
  }
  
  @DirectMethod
  public boolean djn_test_serverReceivingJsonArrayInArrayHavingAnUndefinedValue( String[] values) {
    assert values != null;
    throw new DirectTestFailedException( "We expected that method should not have been called, as it has 'undefined' values");
  }
  
  @DirectMethod
  public boolean djn_test_serverReceivingParametersWithObjectHavingArrayWithUndefinedValue( String fakeArgumentWeShouldNotArriveHere) {
    assert fakeArgumentWeShouldNotArriveHere != null; 
    throw new DirectTestFailedException( "We expected that method should not have been called, as it has 'undefined' values");
  }
  
  @DirectMethod
  public boolean djn_test_serverReceivingParametersWithArrayHavingArrayWithUndefinedValue( String fakeArgumentWeShouldNotArriveHere) {
    assert fakeArgumentWeShouldNotArriveHere != null; 
    throw new DirectTestFailedException( "We expected that method should not have been called, as it has 'undefined' values");
  }

  @DirectMethod // Test deep recursion!
  public boolean djn_test_serverReceivingParametersWithArrayHavingObjectHavingArrayWithUndefinedValue( String fakeArgumentWeShouldNotArriveHere) {
    assert fakeArgumentWeShouldNotArriveHere != null; 
    throw new DirectTestFailedException( "We expected that method should not have been called, as it has 'undefined' values");
  }
  
  @DirectMethod // Test deep recursion!
  public boolean djn_test_serverReceivingParametersWithObjectHavingObjectHavingArrayWithUndefinedValue( String fakeArgumentWeShouldNotArriveHere) {
    assert fakeArgumentWeShouldNotArriveHere != null; 
    throw new DirectTestFailedException( "We expected that method should not have been called, as it has 'undefined' values");
  }
  
  @DirectMethod
  public boolean djn_test_serverReceivingJsonArrayEmptyInStringArray( String[] values) {
    return values != null && values.length == 0;
  }

  @DirectMethod
  public boolean djn_test_serverReceivingNullStringArray( String[] values) {
    return values == null;
  }
  
  @DirectMethod
  public boolean djn_test_serverReceivingNullForAPrimitive( int arg ) {
    throw new DirectTestFailedException( "We expected that method should not have been called, we are sending a 'null', but can receive just one int. Value=" + arg);
  }

  @DirectMethod
  public boolean djn_test_serverReceivingNullValueForAValueInAPrimitiveArrayArgument( int[] arg ) {
    assert arg != null;
    throw new DirectTestFailedException( "We expected that method should not have been called, we are receiving a 'null' value for an array element");
  }

  @DirectMethod
  public boolean djn_test_serverReceivingUndefinedForAPrimitive( int arg ) {
    throw new DirectTestFailedException( "We expected that method should not have been called, we are sending an 'undefined', but can receive just one int. Value=" + arg);
  }

  @DirectMethod
  public boolean djn_test_serverReceivingStringInIntPrimitive( int arg ) {
    throw new DirectTestFailedException( "We expected that method should not have been called, we are sending an string, but can receive just one int. Value=" + arg);
  }

  @DirectMethod
  public boolean djn_test_serverReceivingStringRepresentingValidIntInIntPrimitive( int arg ) {
    throw new DirectTestFailedException( "We expected that method should not have been called, we are sending an string, but can receive just one int. Value=" + arg);
  }
  
  @DirectMethod
  public boolean djn_test_serverReceivingOneElementIntArrayInIntPrimitive( int arg ) {
    throw new DirectTestFailedException( "We expected that method should not have been called, we are sending an array with just one item, but can receive just one int. Value=" + arg);
  }
  
  @DirectMethod
  public boolean djn_test_serverReceivingMultiElementIntArrayInIntPrimitive( int arg ) {
    throw new DirectTestFailedException( "We expected that method should not have been called, we are sending an array of items, but can receive just one int. Value=" + arg);
  }
  
  @DirectMethod
  public char djn_test_serverReceivingJsonStringWithOneCharInCharPrimitive( char c ) {
    return c;   
  }
  
  @DirectMethod
  public char djn_test_serverReceivingJsonStringWithSeveralCharsInCharPrimitive( char c ) {
    throw new DirectTestFailedException( "We expected that method should not have been called, we are sending a string with two characters, but can receive just one char. Value=" + c);
  }
  
  @DirectMethod
  public char djn_test_serverReceivingJsonNumberInValidCharRangeInCharObject( Character c ) {
   return c.charValue(); 
  }
  
  @DirectMethod
  public char djn_test_serverReceivingCharFromNumberTooBig( Character c ) {
    throw new DirectTestFailedException( "We expected that method should not have been called, we are sending a number that's too big for a char. Value=" + c);
  }
  
  @DirectMethod
  public char djn_test_serverReceivingCharFromNumberTooSmall( Character c ) {
    throw new DirectTestFailedException( "We expected that method should not have been called, we are sending a number that's too small for a char. Value=" + c);
  }
  
  @DirectMethod
  public byte djn_test_serverReceivingByteFromANumberTooBig( Byte b ) {
    return b.byteValue();
  }

  @DirectMethod
  public Byte djn_test_serverReceivingByteFromANumberTooSmall( byte b ) {
    return Byte.valueOf(b);
  }
  
  /* 
  @DirectMethod
  public Calendar djn_test_serverReceivingJavascriptDate( Calendar date ) {
    return date;    
  }
  */

  @DirectMethod
  public boolean djn_test_serverReceivingJsonNumberInBigDecimal( BigDecimal arg) {
    return arg != null && arg.equals( new BigDecimal("3.2"));
  }

  @DirectMethod
  public boolean djn_test_serverReceivingJsonStringInBigDecimal( BigDecimal arg) {
    return arg != null && arg.equals( new BigDecimal("3.33"));
  }

  @DirectMethod
  public boolean djn_test_serverReceivingJsonNumberInBigInteger( BigInteger arg) {
    return arg != null && arg.equals( new BigInteger("92"));
  }

  @DirectMethod
  public boolean djn_test_serverReceivingJsonStringInBigInteger( BigInteger arg) {
    return arg != null && arg.equals( new BigInteger("88"));
  }

  @DirectMethod
  public boolean djn_test_serverReceivingJsonObjectInTypedObject( ComplexObject arg) {
    return arg != null && arg.name.equals( "MyPet") && arg.age == 2;
  }

  @DirectMethod
  public ComplexObject[] djn_test_serverReceivingJsonArrayOfObjectsInTypedArray( ComplexObject[] arg) {
    if( arg.length != 3)  {
      throw new DirectTestFailedException( "We expected an array with 3 elements");
    }
    
    if( !arg[0].name.equals("name1") || arg[0].age != 1 || !arg[1].name.equals("name2") || arg[1].age != 2 || arg[2] != null)  {
      throw new DirectTestFailedException( "Did not receive array correctly");
    }
    
    return arg;
  }

  @DirectMethod
  public boolean djn_test_serverReceivingVeryComplexObject( VeryComplexObject arg) {
    return arg != null && 
           arg.ints.length == 2 && arg.ints[0].equals(Integer.valueOf(33)) && arg.ints[1] == null &&
           arg.myComplexObject != null && arg.myComplexObject.name.equals("MyPet") && arg.myComplexObject.age == 0 &&
           arg.moreComplexObjects != null && arg.moreComplexObjects.length == 2 && 
             arg.moreComplexObjects[0] == null && 
             arg.moreComplexObjects[1] != null && arg.moreComplexObjects[1].name == null && arg.moreComplexObjects[1].age == 5 &&
           arg.notSetInJs == 19; 
  }
  
  @DirectMethod
  public double djn_test_serverReceivingDoubleArray( double[] values ) {
    if( values == null || values.length != 3)  {
      throw new DirectTestFailedException( "We expected a non null array with three doubles");
    }
    double result = 0.0;
    for( double v : values ) {
      result += v;
    }
    
    return result;
  }

  @DirectMethod
  public double djn_test_serverReceivingPrimitiveDoubleArray( Double[] values ) {
    if( values == null || values.length != 3)  {
      throw new DirectTestFailedException( "We expected a non null array with three doubles");
    }
    double result = 0.0;
    for( Double v : values ) {
      if( v != null) {
        result += v.doubleValue();
      }
    }
    
    return result;
  }
  
  @DirectMethod
  public boolean djn_test_serverReceivingCallCausingInfiniteRecursionIfParametersRecursivelyChecked( 
    @SuppressWarnings("unused") Object o) {
    
    return true;
  }
  
  private static String newString( char c, int length ) {
    StringBuilder str = new StringBuilder(length);
    for( int i = 0; i < length; i++ )  {
      str.append( c );
    }
    return str.toString();
  }
  
  @DirectMethod
  public String test_serverRecevingLongStringParameters( String param1, String param2 ) {
    String expectedParam1 = newString( 'a', 1000);
    String expectedParam2 = "\n\r\u0050" + newString( 'b', 10000);
    if( param1 == null || !param1.equals( expectedParam1)) {
      throw new DirectTestFailedException( "We expected an string with a length of 1000" );
    }
    if( param2 == null || !param2.equals( expectedParam2)) {
      throw new DirectTestFailedException( "We expected a different string" );
    }
    return param1 + param2;
  }

  @DirectMethod
  public String test_serverProblematicLongString2( String param1, String param2, int param3, int param4, String param5 ) {
    String expectedParam1 = "symphony";
    String expectedParam2 = " select * from `scrapbucketout` where parent='beb8596a-1dc0-4e61-9297-3267ab5d1528' and type='file'";
    int expectedParam3 = 5;
    int expectedParam4 = 5;
    String expectedParam5 = 
      "rO0ABXNyACdjb20uYW1hem9uLnNkcy5RdWVyeVByb2Nlc3Nvci5Nb3JlVG9rZW7racXLnINNqwMA C0kAFGluaXRpYWxDb25qdW5jdEluZGV4WgAOaXNQYWdlQm91bmRhcnlKAAxsYXN0RW50aXR5SURa AApscnFFbmFibGVkSQAPcXVlcnlDb21wbGV4aXR5SgATcXVlcnlTdHJpbmdDaGVja3N1bUkACnVu aW9uSW5kZXhaAA11c2VRdWVyeUluZGV4TAANY29uc2lzdGVudExTTnQAEkxqYXZhL2xhbmcvU3Ry aW5nO0wAEmxhc3RBdHRyaWJ1dGVWYWx1ZXEAfgABTAAJc29ydE9yZGVydAAvTGNvbS9hbWF6b24v c2RzL1F1ZXJ5UHJvY2Vzc29yL1F1ZXJ5JFNvcnRPcmRlcjt4cAAAAAQATw0PyGR0wAAAAAAAAQAA AACnEObjAAAAAAFwdAAkYmViODU5NmEtMWRjMC00ZTYxLTkyOTctMzI2N2FiNWQxNTI4fnIALWNv bS5hbWF6b24uc2RzLlF1ZXJ5UHJvY2Vzc29yLlF1ZXJ5JFNvcnRPcmRlcgAAAAAAAAAAEgAAeHIA DmphdmEubGFuZy5FbnVtAAAAAAAAAAASAAB4cHQACUFTQ0VORElOR3g=";
    
    if( param1 == null || !param1.equals( expectedParam1)) {
      throw new DirectTestFailedException( "We expected '" + expectedParam1 + "' as param1" );
    }
    if( param2 == null || !param2.equals( expectedParam2)) {
      throw new DirectTestFailedException( "We expected '" + expectedParam2 + "' as param2" );
    }
    if( param3 != expectedParam3) {
      throw new DirectTestFailedException( "We expected '" + expectedParam3 + "' as param3" );
    }
    if( param4 != expectedParam4) {
      throw new DirectTestFailedException( "We expected '" + expectedParam4 + "' as param4" );
    }
    if( param5 == null || !param5.equals( expectedParam5)) {
      throw new DirectTestFailedException( "We expected '" + expectedParam5 + "' as param5" );
    }
    return param1 + param2 + param5;
  }

  public static class MyConditionalLoadClass {
    public String[] s;
    public int i;
  }
  
}
